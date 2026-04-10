import { NextResponse } from "next/server";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { db } from "@/utils/db";
import { MockInterview, UserAnswer } from "@/utils/schema";
import { eq } from "drizzle-orm";

export async function DELETE(req) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const client = typeof clerkClient === "function" ? await clerkClient() : clerkClient;
    const user = await client.users.getUser(userId);
    const userEmail = user?.primaryEmailAddress?.emailAddress || user?.emailAddresses?.[0]?.emailAddress;

    if (!userEmail) {
      return NextResponse.json({ error: "User email not found" }, { status: 400 });
    }

    // Erase User Data from Drizzle Database
    await db.delete(UserAnswer).where(eq(UserAnswer.userEmail, userEmail));
    await db.delete(MockInterview).where(eq(MockInterview.createdBy, userEmail));

    // Permanently Delete Clerk Account
    await client.users.deleteUser(userId);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Account deletion failed:", err);
    return NextResponse.json(
      { error: "Failed to delete account" },
      { status: 500 }
    );
  }
}
