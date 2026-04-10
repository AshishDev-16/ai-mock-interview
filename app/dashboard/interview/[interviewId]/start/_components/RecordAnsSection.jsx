"use client";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { CirclePause, Mic } from "lucide-react";
import Webcam from "react-webcam";
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
  const userAnswerRef = useRef("");

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
    const combinedTranscript = results.map((result) => result.transcript).join(" ");
    userAnswerRef.current = combinedTranscript;
    setUserAnswer(combinedTranscript);
  }, [results]);

  const StartStopRecording = async () => {
    if (isRecording) {
      stopSpeechToText();
      const currentAns = userAnswerRef.current;
      
      if (currentAns.length < 10) {
        toast("Answer is too short. Please speak louder and provide a complete answer.");
        setResults([]);
        setUserAnswer("");
        userAnswerRef.current = "";
        return;
      }

      await UpdateUserAnswer(currentAns);
    } else {
      setResults([]);
      setUserAnswer("");
      userAnswerRef.current = "";
      startSpeechToText();
    }
  };

  const UpdateUserAnswer = async (finalAnswer) => {
    setLoading(true);

    try {
      const resp = await fetch("/api/evaluate-answer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mockIdRef: interviewData?.mockId,
          question: mockInterviewQuestion[activeQuestionIndex]?.question,
          correctAns: mockInterviewQuestion[activeQuestionIndex]?.answer,
          userAns: finalAnswer,
        }),
      });

      const data = await resp.json();

      if (resp.ok && data.success) {
        toast("User Answer recorded successfully");
        setUserAnswer("");
        userAnswerRef.current = "";
        setResults([]);
      } else {
        toast("Error while saving answer. Please try again.");
        console.error("API Error: ", data.error);
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      toast("System error occurred. Feed disrupted.");
    } finally {
      setResults([]);
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center space-y-12">
      <div className="relative w-full aspect-video rounded-sm border border-foreground/10 bg-black overflow-hidden shadow-2xl">
        <Webcam
          mirrored={true}
          className="w-full h-full object-cover grayscale opacity-80"
          style={{
            zIndex: 10,
          }}
        />
        <div className="absolute top-6 left-6 flex items-center gap-3 px-3 py-1.5 bg-black/60 border border-foreground/10 rounded-sm backdrop-blur-md">
          <div
            className={`w-1.5 h-1.5 rounded-full ${isRecording ? "bg-red-500 animate-pulse" : "bg-primary"}`}
          />
          <span className="text-[9px] font-black tracking-[0.2em] text-foreground/60 uppercase">
            {isRecording
              ? "UPLINK_ACTIVE // STREAMING"
              : "READY_TO_DEPLOY"}
          </span>
        </div>

        {isRecording && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-sm backdrop-blur-md">
            <span className="text-[10px] font-black tracking-[0.3em] text-red-500 uppercase">
              Input Buffer Recording...
            </span>
          </div>
        )}
        
        {/* Live Audio Transcription Display overlay */}
        {(userAnswer || interimResult) && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md flex flex-col justify-end p-8 z-20">
             <div className="bg-background/90 p-4 rounded-sm border border-foreground/10 h-1/2 overflow-y-auto">
               <span className="text-xs font-black tracking-widest uppercase text-primary mb-2 block">Voice Feed</span>
               <p className="text-sm font-medium leading-relaxed text-foreground whitespace-pre-wrap">
                 {userAnswer} <span className="text-foreground/50 italic">{interimResult}</span>
               </p>
             </div>
          </div>
        )}
      </div>

      <button
        onClick={StartStopRecording}
        disabled={loading}
        className={`w-full max-w-sm py-5 rounded-sm border transition-all duration-500 flex items-center justify-center gap-4 group disabled:opacity-50
            ${
              isRecording
                ? "bg-red-500/10 border-red-500/40 text-red-500 shadow-[0_0_40px_rgba(239,68,68,0.1)]"
                : "bg-primary/5 border-primary/20 text-primary hover:border-primary/40 hover:bg-primary/10"
            }`}
      >
        {isRecording ? (
          <>
            <CirclePause size={18} />
            <span className="text-[10px] font-black tracking-[0.4em] uppercase">
              Terminate Recording
            </span>
          </>
        ) : (
          <>
            <Mic size={18} />
            <span className="text-[10px] font-black tracking-[0.4em] uppercase">
              Initialize Input Archive
            </span>
          </>
        )}
      </button>
    </div>
  );
}
export default RecordAnsSection;
