"use client";
import { MockInterview } from "@/utils/schema";
import React from "react";
import { useEffect, useState } from "react";
import { db } from "@/utils/db";
import { eq } from "drizzle-orm";
import Webcam from "react-webcam";
import { Lightbulb, WebcamIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const Interview = ({ params }) => {
  const { interviewData, setInterviewData } = useState();
  const [webCamEnabled, setWebCamEnabled] = useState(false);

  useEffect(() => {
    console.log(params.interviewId);
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
    console.log(result);
    setInterviewData(result[0]);
  };

  return (
    <div className="my-10">
      <h2 className="font-bold text-2xl">Let's Get Started</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="flex flex-col my-5 gap-5 ">
          <div className="flex flex-col p-5 rounded-lg border gap-5">
            <h2 className="text-lg">
              <strong>Job Role/ Job Position:</strong>
            </h2>
            <h2 className="text-lg">
              <strong>Job Description/ Tech Stack:</strong>
            </h2>
            <h2 className="text-lg">
              <strong>Years of Experience:</strong>
            </h2>
          </div>
          <div className="p-5 border rounded-lg border-yellow-300 bg-yellow-100">
            <h2 className="flex gap-2 items-center text-yellow-500">
              <Lightbulb /> <strong>Information</strong>
            </h2>
            <h2 className="mt-3 text-yellow-500">
              Enable Video Web Cam and Microphone to Start your AI Generated
              Mock Interview, It Has 5 questions which you can answer and at the
              last you will get the report on the basis of youe answer.NOTE:We
              never record your video, Web Cam access you can disable at any
              time of you want
            </h2>
          </div>
        </div>
        <div>
          {webCamEnabled ? (
            <Webcam
              onUserMedia={() => setWebCamEnabled(true)}
              onUserMediaError={() => setWebCamEnabled(false)}
              mirrored={true}
              style={{
                height: 300,
                width: 300,
              }}
            />
          ) : (
            <>
              <WebcamIcon className="h-72 w-full my-7 p-20 bg-secondary rounded-lg border" />
              <Button  onClick={() => setWebCamEnabled(true)} className="w-full">
                Enable Web Cam and Microphone
              </Button>
            </>
          )}
        </div>
      </div>
      <div className="flex justify-end items-end">
      <Button>Start Interview</Button>
      </div>
    </div>
  );
};

export default Interview;
