import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/utils/db";
import { MockInterview, UserAnswer } from "@/utils/schema";
import { eq, and } from "drizzle-orm";

export async function GET(req, { params }) {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const userEmail = user.primaryEmailAddress?.emailAddress;
    const { mockId } = params;

    const interview = await db
      .select()
      .from(MockInterview)
      .where(and(eq(MockInterview.mockId, mockId), eq(MockInterview.createdBy, userEmail)));

    if (!interview || interview.length === 0) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(interview[0]);
  } catch (error) {
    console.error("Fetch Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized. Please log in." }, { status: 401 });
    }
    const userEmail = user.primaryEmailAddress?.emailAddress;
    const { mockId } = params;

    // Verify ownership
    const interview = await db
      .select()
      .from(MockInterview)
      .where(and(eq(MockInterview.mockId, mockId), eq(MockInterview.createdBy, userEmail)));

    if (!interview || interview.length === 0) {
      return NextResponse.json({ error: "Not found or unauthorized" }, { status: 404 });
    }

    // Delete User Answers associated with this interview
    await db.delete(UserAnswer).where(eq(UserAnswer.mockIdRef, mockId));

    // Delete Mock Interview
    await db.delete(MockInterview).where(eq(MockInterview.mockId, mockId));

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("Delete Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
