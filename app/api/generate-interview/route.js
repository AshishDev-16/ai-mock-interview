import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/utils/db";
import { MockInterview, UserUsage } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { GoogleGenAI } from "@google/genai";
import { v4 as uuid4 } from "uuid";
import moment from "moment";

const rateLimit = new Map();

export async function POST(req) {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized. Please log in." }, { status: 401 });
    }
    const userEmail = user.primaryEmailAddress?.emailAddress;

    // 1. Rate Limiting (In-Memory per instance)
    const ip = req.headers.get("x-forwarded-for") || "unknown";
    const now = Date.now();
    const windowTime = 60 * 1000;
    const maxRequests = 5;

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

    // 2. Check 1-Interview Limit against UserUsage
    const usageRecords = await db
      .select()
      .from(UserUsage)
      .where(eq(UserUsage.userEmail, userEmail));

    const userCount = usageRecords[0]?.interviewCount || 0;

    if (userCount >= 1) {
      return NextResponse.json(
        { error: "LIMIT_REACHED", message: "Only one mock interview is allowed safely. Upgrade your account." },
        { status: 403 }
      );
    }

    // Parse Body
    const body = await req.json();
    let { jobPosition, jobDesc, jobExperience, difficulty, questionCount } = body;

    let finalCount = parseInt(questionCount, 10);
    if (isNaN(finalCount) || finalCount < 7) finalCount = 7;
    if (finalCount > 15) finalCount = 15;

    const InputPrompt = `Generate ${finalCount} interview questions and answers for the following job in ${difficulty} difficulty:

    Job Position: ${jobPosition}
    Job Description: ${jobDesc}
    Years of Experience: ${jobExperience}
    Difficulty Level: ${difficulty}
    
    Please provide the output as a valid JSON array of objects. Each object should have 'question' and 'answer' fields. Do not include any markdown formatting, code blocks, or additional explanations. The JSON should be directly parseable.
    
    Ensure that:
    1. All quotes are properly escaped.
    2. There are no trailing commas.
    3. Newlines within answers use \\n for line breaks.
    4. The questions match the ${difficulty} difficulty level.
    5. The output is a single, valid JSON array.`;

    // 3. Trigger Gemini securely on the backend
    const apiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    const client = new GoogleGenAI({ apiKey: apiKey });

    const interaction = await client.interactions.create({
      model: 'gemini-3-flash-preview',
      input: InputPrompt,
    });
    
    let MockJsonResp = interaction.outputs[interaction.outputs.length - 1].text.trim();

    // Clean potential markdown artifacts
    MockJsonResp = MockJsonResp.replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    // Validate JSON
    const parsedJson = JSON.parse(MockJsonResp);
    const sanitizedJson = JSON.stringify(parsedJson);

    // 4. Save to DB
    const resp = await db
      .insert(MockInterview)
      .values({
        mockId: uuid4(),
        jsonMockResp: sanitizedJson,
        jobPosition: jobPosition,
        jobDesc: jobDesc,
        jobExperience: jobExperience,
        difficulty: difficulty,
        questionCount: questionCount.toString(),
        createdBy: userEmail,
        createdAt: moment().format("DD-MM-YYYY"),
      })
      .returning({ mockId: MockInterview.mockId });

    // 5. Track Usage in database
    await db.insert(UserUsage)
      .values({
        userEmail: userEmail,
        interviewCount: 1,
        createdAt: new Date().toISOString()
      })
      .onConflictDoUpdate({
        target: UserUsage.userEmail,
        set: { interviewCount: userCount + 1 }
      });

    return NextResponse.json({ mockId: resp[0]?.mockId });

  } catch (error) {
    console.error("API Route Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
