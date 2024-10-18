"use client";
import { Button } from "@/components/ui/button";
import { db } from "@/utils/db";
import { chatSession } from "@/utils/GeminiAIModel";
import { UserAnswer } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { CirclePause, Mic, Webcam } from "lucide-react";
import moment from "moment";
import { useRef } from "react";

import React, { useEffect, useState } from "react";
import useSpeechToText from "react-hook-speech-to-text";
import { toast } from "sonner";

function RecordAnsSection({
  mockInterviewQuestion,
  activeQuestionIndex,
  interviewData,
}) {
  const [userAnswer, setUserAnswer] = useState("");
  const { user } = useUser();
  const [loading, setLoading] = useState();
  const [isRecordingActive, setIsRecordingActive] = useState(false);
  const recordingTimeoutRef = useRef(null);

  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults,
  } = useSpeechToText({
    continuous: false,
    useLegacyResults: false,
  });

  useEffect(() => {
    results?.map((result) => (
      setUserAnswer(prevAns => prevAns + result?.transcript)
    ))
  }, [results]);

  useEffect(() => {
    if (!isRecording && isRecordingActive) {
      // Restart recording if it stops unexpectedly
      recordingTimeoutRef.current = setTimeout(() => {
        startSpeechToText();
      }, 1000);
    }
    return () => {
      if (recordingTimeoutRef.current) {
        clearTimeout(recordingTimeoutRef.current);
      }
    };
  }, [isRecording, isRecordingActive, startSpeechToText]);

  const StartStopRecording = async () => {
    if (isRecordingActive) {
      stopSpeechToText();
      setIsRecordingActive(false);
      if (userAnswer.length > 10) {
        await UpdateUserAnswer();
      }
    } else {
      setIsRecordingActive(true);
      startSpeechToText();
    }
  };

  const UpdateUserAnswer = async () => {
    console.log(userAnswer);
    setLoading(true);
    const feedbackPromopt =
      "Question:" +
      mockInterviewQuestion[activeQuestionIndex]?.question +
      ", User Answer" +
      userAnswer +
      "Depends on question and user answer for given interview question" +
      "please give us ratig for answer and feedback as area of improvment if any" +
      "in just 3 to 5 lines to improve it in JSON format with rating field and feedback field";

    const result = await chatSession.sendMessage(feedbackPromopt);

    const mockJsonResp = result.response
      .text()
      .replace("```json", "")
      .replace("```", "");

    console.log(mockJsonResp);

    const JsonFeedbackResp = JSON.parse(mockJsonResp);

    const resp = await db.insert(UserAnswer).values({
      mockIdRef: interviewData?.mockId,
      question: mockInterviewQuestion[activeQuestionIndex]?.question,
      correctAns: mockInterviewQuestion[activeQuestionIndex]?.answer,
      userAns: userAnswer,
      feedback: JsonFeedbackResp?.feedback,
      rating: JsonFeedbackResp?.rating,
      userEmail: user?.primaryEmailAddress?.emailAddress,
      createdAt: moment().format("DD-MM-YYYY"),
    });

    if (resp) {
      toast("User Answer recorded successfully");
      setUserAnswer("");
      setResults([]);
    }
    setResults([]);
    setLoading(false);
  };
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col mt-20 justify-center items-center bg-secondary  rounded-lg p-5">
        <Webcam
          style={{
            height: 300,
            width: "100%",
            zIndex: 10,
          }}
        />
      </div>
      <Button variant="outline" className="my-10" onClick={StartStopRecording}>
        {isRecordingActive ? (
          <h2 className="text-red-600 flex gap-2">
            <CirclePause />
            Stop Recording...
          </h2>
        ) : (
          <h2 className="flex gap-2 text-primary items-center">
            <Mic />
            Record Answer
          </h2>
        )}
      </Button>
    </div>
  );
}
export default RecordAnsSection;
