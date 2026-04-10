import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/utils/db";
import { MockInterview, UserAnswer } from "@/utils/schema";
import { eq } from "drizzle-orm";

export async function DELETE(req) {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized. Please log in." }, { status: 401 });
    }
    const userEmail = user.primaryEmailAddress?.emailAddress;

    // Delete all answers from this user
    await db.delete(UserAnswer).where(eq(UserAnswer.userEmail, userEmail));

    // Delete all interviews from this user
    await db.delete(MockInterview).where(eq(MockInterview.createdBy, userEmail));

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("Reset Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
