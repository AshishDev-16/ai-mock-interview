"use client";
import React, { useEffect, useState } from "react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronsUpDown, Home, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

function Feedback({ params }) {
  const [feedbackList, setFeedbackList] = useState([]);
  const router = useRouter();
  const [totalRating, setTotalRating] = useState(0);

  useEffect(() => {
    getFeedback();
  }, []);

  const getFeedback = async () => {
    try {
      const resp = await fetch("/api/feedback/" + params.interviewId);
      const result = await resp.json();
      
      if (resp.ok) {
        setFeedbackList(result);

        if (result.length > 0) {
          const total = result.reduce((sum, item) => sum + Number(item.rating), 0);
          setTotalRating(total);
        }
      } else {
        toast.error("Failed to retrieve feedback index.");
      }
    } catch (e) {
      console.error(e);
      toast.error("Archive retrieval failed.");
    }
  };

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-4xl mx-auto p-8 pt-32">
        {feedbackList?.length == 0 ? (
          <div className="flex flex-col items-center justify-center py-32 rounded-sm border border-foreground/5 bg-foreground/[0.01]">
            <span className="text-[10px] font-black tracking-[0.4em] text-foreground/20 uppercase">
              Intelligence Not Found // 404
            </span>
            <p className="mt-4 text-xs font-medium text-foreground/10 uppercase tracking-widest">
              No archival data available for this operation.
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="h-px w-8 bg-primary/40" />
                <span className="text-[10px] font-black tracking-[0.4em] text-primary uppercase">
                  Operation Complete // Matrix_Analysis
                </span>
              </div>
              <h1 className="text-4xl md:text-7xl font-black tracking-tighter text-foreground uppercase leading-none">
                NEURAL <span className="text-foreground/20">FEEDBACK.</span>
              </h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-foreground/[0.02] border border-foreground/5 rounded-sm p-8 space-y-6">
                <h3 className="text-[10px] font-black tracking-[0.4em] text-foreground/20 uppercase">
                  Core Performance Index
                </h3>
                <div className="flex items-baseline gap-2">
                  <span
                    className={`text-6xl font-black tracking-tighter ${totalRating < 15 ? "text-red-500/80" : "text-primary"}`}
                  >
                    {totalRating}
                  </span>
                  <span className="text-2xl font-black text-foreground/10">
                    /25
                  </span>
                </div>
              </div>

              <div className="bg-foreground/[0.02] border border-foreground/5 rounded-sm p-8 space-y-6">
                <h3 className="text-[10px] font-black tracking-[0.4em] text-foreground/20 uppercase">
                  Vector Accuracy
                </h3>
                <div className="flex gap-2">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className={`h-1.5 flex-1 rounded-full ${i < Math.round(totalRating / 5) ? "bg-primary shadow-[0_0_10px_rgba(0,85,255,0.4)]" : "bg-foreground/5"}`}
                    />
                  ))}
                </div>
                <p className="text-[9px] font-bold text-foreground/20 tracking-[0.2em] uppercase">
                  High Precision Targeting: Active
                </p>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <h2 className="text-[10px] font-black tracking-[0.4em] text-foreground/10 uppercase whitespace-nowrap">
                Vector Analysis // Details
              </h2>
              <div className="h-px flex-1 bg-foreground/[0.03]" />
            </div>

            {feedbackList &&
              feedbackList.map((item, index) => (
                <Collapsible
                  key={index}
                  className="bg-foreground/[0.02] border border-foreground/5 rounded-sm overflow-hidden group hover:border-foreground/10 transition-all duration-300"
                >
                  <CollapsibleTrigger className="p-6 flex justify-between items-center w-full text-left transition-all duration-300">
                    <div className="flex items-center gap-4">
                      <div className="text-[10px] font-black text-foreground/10 w-4">
                        0{index + 1}
                      </div>
                      <span className="text-xs font-black tracking-tight text-foreground/60 uppercase group-hover:text-foreground transition-colors">
                        {item.question}
                      </span>
                    </div>
                    <ChevronsUpDown className="h-4 w-4 text-foreground/20 group-hover:text-primary transition-colors" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="px-6 pb-8 bg-foreground/[0.01]">
                    <div className="space-y-6 pt-6 border-t border-foreground/[0.03]">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                          <span className="text-[9px] font-black tracking-[0.2em] text-foreground/20 uppercase">
                            Confidence Index
                          </span>
                          <div
                            className={`text-sm font-black ${item.rating < 5 ? "text-red-500/60" : "text-primary"}`}
                          >
                            {item.rating}{" "}
                            <span className="text-[10px] text-foreground/10">
                              / 05
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <div className="w-1 h-1 bg-red-500/40 rounded-full" />
                            <span className="text-[9px] font-black tracking-[0.2em] text-foreground/20 uppercase">
                              Transmitted Data
                            </span>
                          </div>
                          <p className="text-xs font-medium text-foreground/40 leading-relaxed uppercase bg-foreground/[0.01] p-4 border border-foreground/5 rounded-sm">
                            {item.userAns}
                          </p>
                        </div>
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <div className="w-1 h-1 bg-primary/40 rounded-full" />
                            <span className="text-[9px] font-black tracking-[0.2em] text-foreground/20 uppercase">
                              Optimal Vector
                            </span>
                          </div>
                          <p className="text-xs font-medium text-foreground/40 leading-relaxed uppercase bg-foreground/[0.01] p-4 border border-foreground/5 rounded-sm">
                            {item.correctAns}
                          </p>
                        </div>
                      </div>

                      <div className="p-6 bg-primary/[0.03] border border-primary/10 rounded-sm space-y-3">
                        <div className="flex items-center gap-2">
                          <div className="w-1 h-1 bg-primary rounded-full animate-pulse" />
                          <span className="text-[9px] font-black tracking-[0.2em] text-primary uppercase">
                            Core Analysis // Improvement Paths
                          </span>
                        </div>
                        <p className="text-[11px] font-medium text-foreground/60 leading-relaxed tracking-wide uppercase">
                          {item.feedback}
                        </p>
                      </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              ))}

            <div className="mt-16 border-t border-foreground/5 pt-12">
              <button
                onClick={() => router.replace("/dashboard")}
                className="w-full py-5 rounded-sm bg-primary text-[10px] font-black tracking-[0.4em] text-primary-foreground uppercase hover:bg-primary/80 transition-all duration-500 shadow-[0_0_30px_rgba(0,85,255,0.2)] flex items-center justify-center gap-4"
              >
                <Home size={18} />
                <span>Return to Command Center</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Feedback;
