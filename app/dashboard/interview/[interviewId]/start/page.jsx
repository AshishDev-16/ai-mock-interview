"use client";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import QuestionSection from "./_components/QuestionSection";
import RecordAnsSection from "./_components/RecordAnsSection";

function StartInterview({ params }) {
  const [interviewData, setInterviewData] = useState();
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState();
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(3);
  useEffect(() => {
    GetInterviewDetails();
  }, []);

  /**
   * Used to Get Interview details by MockId/Interview Id
   */
  const GetInterviewDetails = async () => {
    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.mockId, params.interviewId));

    const jsonMockResp = JSON.parse(result[0].jsonMockResp);
    setMockInterviewQuestion(jsonMockResp);
    setInterviewData(result[0]);
  };
  return (
    <div>
      <div className="grid grid-col-1 md:grid-cols-2 gap-10">
        {/* Questions */}
        <QuestionSection mockInterviewQuestion={mockInterviewQuestion}
        activeQuestionIndex={activeQuestionIndex}
        />

        {/* Viddeo/Audio Recording */}
        <RecordAnsSection/>
      </div>
    </div>
  );
}

export default StartInterview;
