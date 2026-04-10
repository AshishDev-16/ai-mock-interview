import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";
import { GoogleGenAI } from "@google/genai";
import moment from "moment";

const rateLimit = new Map();

export async function POST(req) {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const userEmail = user.primaryEmailAddress?.emailAddress;

    // 1. Rate Limiting (In-Memory)
    const ip = req.headers.get("x-forwarded-for") || "unknown";
    const now = Date.now();
    const windowTime = 60 * 1000;
    const maxRequests = 20; // Allow more requests since there are multiple questions

    if (rateLimit.has(ip)) {
      const data = rateLimit.get(ip);
      if (now - data.startTime > windowTime) {
        rateLimit.set(ip, { count: 1, startTime: now });
      } else {
        if (data.count >= maxRequests) {
          return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });
        }
        data.count++;
      }
    } else {
      rateLimit.set(ip, { count: 1, startTime: now });
    }

    const { mockIdRef, question, correctAns, userAns } = await req.json();

    const feedbackPrompt =
      "Question:" +
      question +
      ", User Answer:" +
      userAns +
      " Depends on question and user answer for given interview question " +
      "please give us rating for answer and feedback as area of improvment if any " +
      "in just 3 to 5 lines to improve it in JSON format with rating field and feedback field";

    // 2. Trigger Gemini
    const apiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    const client = new GoogleGenAI({ apiKey: apiKey });

    const interaction = await client.interactions.create({
      model: 'gemini-3-flash-preview',
      input: feedbackPrompt,
    });
    
    let mockJsonResp = interaction.outputs[interaction.outputs.length - 1].text.trim();

    mockJsonResp = mockJsonResp.replace(/```json/g, "").replace(/```/g, "").trim();
    const jsonFeedbackResp = JSON.parse(mockJsonResp);

    // 3. Save to DB
    const resp = await db.insert(UserAnswer).values({
      mockIdRef: mockIdRef,
      question: question,
      correctAns: correctAns,
      userAns: userAns,
      feedback: jsonFeedbackResp?.feedback,
      rating: jsonFeedbackResp?.rating,
      userEmail: userEmail,
      createdAt: moment().format("DD-MM-YYYY"),
    });

    return NextResponse.json({ success: true, feedback: jsonFeedbackResp });

  } catch (error) {
    console.error("Evaluate Answer Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
