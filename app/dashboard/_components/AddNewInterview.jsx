"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";
import { v4 as uuid4 } from "uuid";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { toast } from "sonner";

function AddNewInterview({ atLimit }) {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [jobExperience, setJobExperience] = useState("");
  const [questionCount, setQuestionCount] = useState(7);
  const [difficulty, setDifficulty] = useState("Medium");
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const router = useRouter();

  const handleOpenDialog = () => {
    if (atLimit) {
      toast.error("You have reached the free tier limit. Upgrade for unlimited mock interviews.");
      return;
    }
    setOpenDialog(true);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    
    const count = parseInt(questionCount, 10);
    if (isNaN(count) || count < 7) {
      toast.error("Please specify a minimum of 7 questions.");
      return;
    }
    if (count > 15) {
      toast.error("Maximum allowed questions is 15.");
      return;
    }

    setLoading(true);

    try {
      const resp = await fetch("/api/generate-interview", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jobPosition,
          jobDesc,
          jobExperience,
          difficulty,
          questionCount,
        }),
      });

      const data = await resp.json();

      if (!resp.ok) {
        if (data.error === "LIMIT_REACHED") {
          toast.error("LIMIT REACHED: " + data.message);
          return;
        } else {
          throw new Error(data.error || "Failed to generate interview");
        }
      }

      if (data.mockId) {
        setOpenDialog(false);
        router.push("/dashboard/interview/" + data.mockId);
      }
    } catch (error) {
      console.error("Sequence Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative h-full">
      <div
        className={`group relative p-10 h-full min-h-[200px] flex flex-col items-center justify-center rounded-sm transition-all duration-500 overflow-hidden backdrop-blur-md ${
          atLimit 
            ? "border border-destructive/20 bg-destructive/5 opacity-70 cursor-not-allowed shadow-none" 
            : "border border-foreground/5 bg-foreground/[0.02] hover:bg-foreground/[0.04] hover:border-primary/40 cursor-pointer shadow-[0_0_80px_rgba(0,0,0,0.3)]"
        }`}
        onClick={handleOpenDialog}
      >
        {/* Animated Background Mesh */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.05] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700" />

        <div className="relative z-10 flex flex-col items-center gap-6">
          <div className="w-12 h-12 rounded-sm border border-primary/20 bg-primary/5 flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary/10 transition-all duration-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M12 4v16m8-8H4"
              />
            </svg>
          </div>
          <div className="text-center space-y-1">
            <h2 className="text-lg font-black tracking-widest text-foreground uppercase transition-all duration-500 group-hover:text-primary">
              Start New Interview
            </h2>
            <p className="text-xs font-bold text-foreground/40 uppercase transition-all duration-500">
              Create a custom mock session
            </p>
          </div>
        </div>
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-2xl bg-card border-foreground/10 text-foreground rounded-sm p-12 overflow-hidden shadow-[0_0_100px_rgba(0,0,0,1)]">
          {/* Glassmorphic Background Blur */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/[0.03] blur-[120px] rounded-full -mr-48 -mt-48 pointer-events-none" />

          <DialogHeader className="relative z-10 space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-px w-6 bg-primary/40" />
              <span className="text-[10px] font-black tracking-[0.4em] text-primary uppercase">
                Interview Setup
              </span>
            </div>
            <DialogTitle className="text-3xl font-black tracking-tighter uppercase leading-none">
              JOB <span className="text-foreground/20">DETAILS.</span>
            </DialogTitle>
            <DialogDescription className="text-foreground/50 text-xs font-medium tracking-tight uppercase">
              Provide your details to generate tailored interview questions.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={onSubmit} className="relative z-10 space-y-8 mt-4">
            <div className="space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-4">
                  <label className="text-xs font-bold tracking-widest text-foreground/60 uppercase">
                    Job Role / Position
                  </label>
                  <Input
                    placeholder="E.G. FRONTEND DEVELOPER"
                    required
                    value={jobPosition}
                    onChange={(e) => setJobPosition(e.target.value)}
                    className="bg-foreground/[0.02] border-foreground/5 focus:border-primary/40 text-foreground text-xs h-12 rounded-sm transition-all duration-300 placeholder:text-foreground/20 uppercase font-bold tracking-widest"
                  />
                </div>
                <div className="space-y-4">
                  <label className="text-xs font-bold tracking-widest text-foreground/60 uppercase">
                    Years of Experience
                  </label>
                  <Input
                    placeholder="E.G. 5"
                    type="number"
                    min="0"
                    max="50"
                    required
                    value={jobExperience}
                    onChange={(e) => setJobExperience(e.target.value)}
                    className="bg-foreground/5 border-foreground/10 focus:border-primary/50 text-foreground h-12"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-4">
                  <label className="text-xs font-bold tracking-widest text-foreground/60 uppercase">
                    Number of Questions
                  </label>
                  <Input
                    type="number"
                    min="7"
                    max="15"
                    required
                    value={questionCount}
                    onChange={(e) => setQuestionCount(e.target.value)}
                    className="bg-foreground/5 border-foreground/10 focus:border-primary/50 text-foreground h-12"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-bold tracking-widest text-foreground/60 uppercase block">
                    Difficulty Level
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {["Easy", "Medium", "Hard"].map((level) => (
                      <button
                        key={level}
                        type="button"
                        onClick={() => setDifficulty(level)}
                        className={`py-3 rounded-sm border font-bold text-[10px] uppercase tracking-widest transition-all duration-300 ${
                          difficulty === level
                            ? "bg-primary border-primary text-primary-foreground shadow-[0_0_20px_rgba(99,102,241,0.4)]"
                            : "bg-foreground/5 border-foreground/10 text-foreground/40 hover:border-foreground/20"
                        }`}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold tracking-widest text-foreground/40 uppercase">
                  Tech Stack / Key Skills
                </label>
                <Textarea
                  placeholder="Ex. React, Next.js, Neural Networks, Strategic Analysis"
                  required
                  value={jobDesc}
                  onChange={(e) => setJobDesc(e.target.value)}
                  className="bg-foreground/5 border-foreground/10 focus:border-primary/50 text-foreground min-h-[100px] resize-none"
                />
              </div>
            </div>

            <div className="flex gap-4 justify-end pt-4 border-t border-foreground/5">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setOpenDialog(false)}
                className="hover:bg-foreground/5 text-foreground/60 font-bold uppercase tracking-widest text-xs"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-black uppercase tracking-widest text-xs px-8 h-12 shadow-[0_0_30px_rgba(99,102,241,0.3)] transition-all duration-500 hover:scale-[1.02]"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <LoaderCircle className="animate-spin h-4 w-4" />
                    <span>Generating...</span>
                  </div>
                ) : (
                  "Create Interview"
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
export default AddNewInterview;
