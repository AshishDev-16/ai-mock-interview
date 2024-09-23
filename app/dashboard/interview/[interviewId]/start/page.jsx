"use client";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import QuestionSection from "./_components/QuestionSection";
import RecordAnsSection from "./_components/RecordAnsSection";
import { Button } from "@/components/ui/button";
import Link from "next/link";;

function StartInterview({ params }) {
  const [interviewData, setInterviewData] = useState();
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState();
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  useEffect(() => {
    GetInterviewDetails();
  }, []);

  /**
   * Used to Get Interview details by MockId/Interview Id
   */
  const GetInterviewDetails = async () => {
    try{
    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.mockId, params.interviewId));



    const jsonMockResp = JSON.parse(result[0].jsonMockResp.trim());
    setMockInterviewQuestion(jsonMockResp);
    setInterviewData(result[0]);

    }catch (error){
      console.error("Error fetching or parsing interview data:", error);
    }
  };
  return (
    <div>
      <div className="grid grid-col-1 md:grid-cols-2 gap-10">
        {/* Questions */}
        <QuestionSection 
        mockInterviewQuestion={mockInterviewQuestion}
        activeQuestionIndex={activeQuestionIndex}
        />

        {/* Viddeo/Audio Recording */}
        <RecordAnsSection
         mockInterviewQuestion={mockInterviewQuestion}
        activeQuestionIndex={activeQuestionIndex}
        interviewData={interviewData}
        />
      </div>
       <div className="flex justify-end gap-6">
        {activeQuestionIndex>0&&
        <Button onClick={()=>setActiveQuestionIndex(activeQuestionIndex-1)}>Previous Question</Button>
        }
        {activeQuestionIndex!=mockInterviewQuestion?.length-1&&
        <Button onClick={()=>setActiveQuestionIndex(activeQuestionIndex+1)}>Next Question</Button>
        }

        {activeQuestionIndex==mockInterviewQuestion?.length-1&&
        <Link href={'/dashboard/interview/'+interviewData?.mockId+"/feedback"}>
        <Button >End Interview</Button>
        </Link>
        }
       </div>
    </div>
  );
}

export default StartInterview;
