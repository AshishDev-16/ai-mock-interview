import React from "react";
import AddNewInterview from "./_components/AddNewInterview";
import InterviewList from "./_components/InterviewList";
import DeleteAccountButton from "./_components/DeleteAccountButton";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/utils/db";
import { MockInterview, UserUsage } from "@/utils/schema";
import { eq } from "drizzle-orm";

import { redirect } from "next/navigation";

export default async function Dashboard() {
  let user;
  try {
    user = await currentUser();
    if (!user) {
      return redirect("/");
    }
  } catch (err) {
    console.error("Auth Error:", err);
    return redirect("/");
  }

  const userEmail = user?.primaryEmailAddress?.emailAddress;
  if (!userEmail) {
    return redirect("/");
  }

  const userInterviews = await db
    .select()
    .from(MockInterview)
    .where(eq(MockInterview.createdBy, userEmail));

  const usageRecords = await db
    .select()
    .from(UserUsage)
    .where(eq(UserUsage.userEmail, userEmail));

  const totalInterviews = usageRecords[0]?.interviewCount || 0;
  const AT_LIMIT = totalInterviews >= 1;

  return (
    <div className="flex flex-col gap-12 max-w-7xl mx-auto">
      {/* Header Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch pt-8">
        {/* Main Title Area - spans 2 cols */}
        <div className="lg:col-span-2 flex flex-col justify-center p-8 border border-foreground/5 bg-foreground/[0.01] shadow-[inset_0_0_80px_rgba(0,0,0,0.2)] rounded-sm relative overflow-hidden group min-h-[220px]">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/[0.03] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700" />
          
          <div className="space-y-4 relative z-10">
            <div className="flex items-center gap-4">
              <div className="h-px w-8 bg-primary/40" />
              <span className="text-[10px] font-black tracking-[0.4em] text-primary uppercase">
                Dashboard Overview
              </span>
            </div>
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-foreground uppercase leading-[0.85]">
                Welcome, {user?.firstName || "User"}
              </h1>
              
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className={`px-4 py-2 w-max rounded-sm border text-xs font-bold uppercase tracking-widest flex items-center gap-3 ${AT_LIMIT ? 'bg-destructive/10 border-destructive/20 text-destructive' : 'bg-primary/10 border-primary/20 text-primary'}`}>
                  {AT_LIMIT ? (
                    <span className="relative flex h-2 w-2">
                       <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75"></span>
                       <span className="relative inline-flex rounded-full h-2 w-2 bg-destructive"></span>
                    </span>
                  ) : (
                    <span className="h-2 w-2 rounded-full bg-primary" />
                  )}
                  Usage Limit: {totalInterviews} / 1 Interviews
                </div>
                {AT_LIMIT && (
                  <span className="text-xs font-bold text-destructive/80 bg-destructive/10 px-3 py-2 rounded-sm uppercase tracking-wide">
                    Max Free Quota Reached.
                  </span>
                )}
              </div>

              <p className="text-foreground/50 text-base font-medium max-w-lg">
                Create AI-generated mock interviews based on real job descriptions, or review your historical performance and feedback.
              </p>
            </div>
          </div>
        </div>

        {/* Quick Action Area */}
        <div className="lg:col-span-1 h-full">
          <AddNewInterview atLimit={AT_LIMIT} />
        </div>
      </div>

      <div className="space-y-8 mt-4">
        <div className="flex items-center justify-between gap-6">
          <div className="flex items-center gap-6 flex-1">
            <h2 className="text-[10px] font-black tracking-[0.4em] text-foreground/40 uppercase whitespace-nowrap">
              Your Previous Interviews
            </h2>
            <div className="h-px flex-1 bg-foreground/[0.03]" />
          </div>
          <DeleteAccountButton />
        </div>
        <InterviewList />
      </div>
    </div>
  );
}
