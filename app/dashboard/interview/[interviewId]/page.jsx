"use client"
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import { Lightbulb, WebcamIcon, BriefcaseBusiness, CodeXml, CalendarClock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { toast } from "sonner";

const Interview = ({ params }) => {
  const [interviewData, setInterviewData] = useState();
  const [webCamEnabled, setWebCamEnabled] = useState(false);

  useEffect(() => {
    GetInterviewDetails();
  }, []);

  const GetInterviewDetails = async () => {
    try {
      const resp = await fetch("/api/interview/" + params.interviewId);
      const data = await resp.json();
      if (resp.ok) {
        setInterviewData(data);
      } else {
        toast.error("Failed to authenticate session data.");
      }
    } catch (e) {
      console.error(e);
      toast.error("Data stream corrupted.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto my-12 px-5 lg:px-0 flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h2 className="text-[10px] font-black tracking-[0.3em] text-primary uppercase">
          Preparation Phase
        </h2>
        <h1 className="font-extrabold text-4xl lg:text-5xl tracking-tight text-foreground">
          System Diagnostics
        </h1>
        <p className="text-sm font-medium text-foreground/60 max-w-xl">
          Review your target coordinates and grant system permissions to initialize the AI evaluator module.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Data Column */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border border-foreground/10 bg-foreground/5 rounded-sm flex flex-col gap-2">
              <div className="flex gap-2 items-center text-primary/80">
                <BriefcaseBusiness size={16} />
                <span className="text-[10px] font-black tracking-[0.2em] uppercase">Target Vector</span>
              </div>
              <p className="font-semibold text-foreground">{interviewData?.jobPosition}</p>
            </div>

            <div className="p-4 border border-foreground/10 bg-foreground/5 rounded-sm flex flex-col gap-2">
              <div className="flex gap-2 items-center text-primary/80">
                <CalendarClock size={16} />
                <span className="text-[10px] font-black tracking-[0.2em] uppercase">Experience Depth</span>
              </div>
              <p className="font-semibold text-foreground">{interviewData?.jobExperience} Years</p>
            </div>

            <div className="p-4 border border-foreground/10 bg-foreground/5 rounded-sm flex flex-col gap-2 md:col-span-2">
              <div className="flex gap-2 items-center text-primary/80">
                <CodeXml size={16} />
                <span className="text-[10px] font-black tracking-[0.2em] uppercase">Tech Stack Signature</span>
              </div>
              <p className="font-semibold text-foreground leading-relaxed">{interviewData?.jobDesc}</p>
            </div>
          </div>

          <div className="p-5 border rounded-sm border-primary/20 bg-primary/5 flex flex-col gap-3">
            <h2 className="flex gap-2 items-center text-[10px] font-black tracking-[0.2em] text-primary uppercase">
              <Lightbulb size={16} /> Information Protocol
            </h2>
            <p className="text-sm font-medium text-foreground/80 leading-relaxed">
              Enable Video Web Cam and Microphone access to commence your AI-Generated Mock Interview. 
              The evaluation stream consists of 5 multi-disciplinary technical vectors. At conclusion, you will receive a comprehensive diagnostic report identifying areas of growth.
              <br /><br />
              <span className="text-foreground/50 italic font-mono text-xs">
                NOTE: The video feed is processed locally and discarded. Only audio signatures are transmitted for NLP analysis. You retain full override capabilities.
              </span>
            </p>
          </div>

        </div>

        {/* Right Camera Column */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="w-full aspect-video rounded-sm overflow-hidden border border-foreground/10 bg-foreground/5 relative flex items-center justify-center p-4">
            {webCamEnabled ? (
              <Webcam
                onUserMedia={() => setWebCamEnabled(true)}
                onUserMediaError={() => setWebCamEnabled(false)}
                mirrored={true}
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                  <WebcamIcon size={32} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground">Awaiting Permissions</h3>
                  <p className="text-xs text-foreground/50 font-medium px-4">Hardware access is required to render the evaluation interface.</p>
                </div>
                <Button onClick={() => setWebCamEnabled(true)} variant="outline" className="mt-2 text-xs font-bold tracking-widest uppercase rounded-sm border-primary/20 hover:bg-primary/5">
                  Approve Hardware
                </Button>
              </div>
            )}
            
            {/* Status Indicator */}
            {webCamEnabled && (
              <div className="absolute top-4 left-4 flexItems-center gap-2 px-3 py-1 bg-black/60 border border-white/10 rounded-sm backdrop-blur-md">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse inline-block mr-2" />
                <span className="text-[9px] font-black tracking-[0.2em] text-white/80 uppercase">
                  Feed Established
                </span>
              </div>
            )}
          </div>

          <div className="flex justify-end mt-4">
            <Link href={'/dashboard/interview/'+params.interviewId+'/start'} className="w-full">
              <Button className="w-full py-6 rounded-sm bg-primary border border-primary/50 flex group items-center justify-center gap-3">
                <span className="text-xs font-black tracking-[0.2em] uppercase">Deploy Evaluation</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Interview;