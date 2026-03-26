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
import { chatSession } from "@/utils/GeminiAIModel";
import {v4 as uuid4} from 'uuid';
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { MockInterview } from "@/utils/schema";
import { db } from "@/utils/db";

function AddNewInterview() {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [jobExperience, setJobExperience] = useState("");
  const [difficulty, setDifficulty] = useState("Medium");
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const router = useRouter();

  const onSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    const InputPrompt = `Generate 5 interview questions and answers for the following job in ${difficulty} difficulty:

    Job Position: ${jobPosition}
    Job Description: ${jobDesc}
    Years of Experience: ${jobExperience}
    Difficulty Level: ${difficulty}
    
    Please provide the output as a valid JSON array of objects. Each object should have 'question' and 'answer' fields. Do not include any markdown formatting, code blocks, or additional explanations. The JSON should be directly parseable.
    
    Ensure that:
    1. All quotes are properly escaped.
    2. There are no trailing commas.
    3. Newlines within answers use \\n for line breaks.
    4. The questions match the ${difficulty} difficulty level.
    5. The output is a single, valid JSON array.`;

    try {
      const result = await chatSession.sendMessage(InputPrompt);
      let MockJsonResp = result.response.text().trim();
      
      // Clean potential markdown artifacts
      MockJsonResp = MockJsonResp.replace(/```json/g, "").replace(/```/g, "").trim();

      // Validate JSON
      const parsedJson = JSON.parse(MockJsonResp);
      const sanitizedJson = JSON.stringify(parsedJson);

      const resp = await db.insert(MockInterview)
        .values({
          mockId: uuid4(),
          jsonMockResp: sanitizedJson,
          jobPosition: jobPosition,
          jobDesc: jobDesc,
          jobExperience: jobExperience,
          difficulty: difficulty,
          createdBy: user?.primaryEmailAddress?.emailAddress,
          createdAt: moment().format('DD-MM-YYYY')
        }).returning({ mockId: MockInterview.mockId });

      if (resp) {
        setOpenDialog(false);
        router.push('/dashboard/interview/' + resp[0]?.mockId);
      }
    } catch (error) {
      console.error("Sequence Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      <div
        className="group relative p-8 h-full min-h-[160px] flex flex-col items-center justify-center rounded-2xl border border-white/5 bg-white/5 hover:bg-white/10 hover:border-primary/50 transition-all duration-500 cursor-pointer overflow-hidden"
        onClick={() => setOpenDialog(true)}
      >
        {/* Animated Background Mesh */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="relative z-10 flex flex-col items-center gap-4">
          <div className="p-3 rounded-xl bg-primary/10 border border-primary/20 text-primary group-hover:scale-110 transition-transform duration-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <div className="text-center">
            <h2 className="text-lg font-bold text-foreground">Initiate Mock Session</h2>
            <p className="text-xs font-bold tracking-widest text-foreground/40 uppercase mt-1">New AI Protocol</p>
          </div>
        </div>
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-2xl bg-slate-950 border-white/10 text-foreground overflow-hidden">
          {/* Glassmorphic Background Blur */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[80px] rounded-full -mr-32 -mt-32 pointer-events-none" />
          
          <DialogHeader className="relative z-10">
            <DialogTitle className="text-3xl font-black tracking-tight uppercase">
              Configure <span className="text-primary italic">Vector</span>
            </DialogTitle>
            <DialogDescription className="text-foreground/50 font-medium">
              Define the parameters for your AI-driven interview simulation.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={onSubmit} className="relative z-10 space-y-8 mt-4">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold tracking-widest text-foreground/40 uppercase">Job Role / Position</label>
                  <Input 
                    placeholder="Ex. Senior Neural Architect" 
                    required 
                    value={jobPosition}
                    onChange={(e) => setJobPosition(e.target.value)}
                    className="bg-white/5 border-white/10 focus:border-primary/50 text-foreground h-12"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold tracking-widest text-foreground/40 uppercase">Years of Experience</label>
                  <Input
                    placeholder="Ex. 5"
                    type="number"
                    min="0"
                    max="50"
                    required
                    value={jobExperience}
                    onChange={(e) => setJobExperience(e.target.value)}
                    className="bg-white/5 border-white/10 focus:border-primary/50 text-foreground h-12"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold tracking-widest text-foreground/40 uppercase">Tech Stack / Key Skills</label>
                <Textarea 
                  placeholder="Ex. React, Next.js, Neural Networks, Strategic Analysis" 
                  required 
                  value={jobDesc}
                  onChange={(e) => setJobDesc(e.target.value)}
                  className="bg-white/5 border-white/10 focus:border-primary/50 text-foreground min-h-[100px] resize-none"
                />
              </div>

              <div className="space-y-3">
                <label className="text-xs font-bold tracking-widest text-foreground/40 uppercase block mb-2">Protocol Difficulty</label>
                <div className="grid grid-cols-3 gap-3">
                  {['Easy', 'Medium', 'Hard'].map((level) => (
                    <button
                      key={level}
                      type="button"
                      onClick={() => setDifficulty(level)}
                      className={`py-3 rounded-xl border font-bold text-xs uppercase tracking-widest transition-all duration-300 ${
                        difficulty === level 
                          ? "bg-primary border-primary text-white shadow-[0_0_20px_rgba(99,102,241,0.4)]" 
                          : "bg-white/5 border-white/10 text-foreground/40 hover:border-white/20"
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-4 justify-end pt-4 border-t border-white/5">
              <Button 
                type="button" 
                variant="ghost" 
                onClick={() => setOpenDialog(false)}
                className="hover:bg-white/5 text-foreground/60 font-bold uppercase tracking-widest text-xs"
              >
                Abort
              </Button>
              <Button 
                type="submit" 
                disabled={loading}
                className="bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest text-xs px-8 h-12 shadow-[0_0_30px_rgba(99,102,241,0.3)] transition-all duration-500 hover:scale-[1.02]"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <LoaderCircle className="animate-spin h-4 w-4"/>
                    <span>Synchronizing...</span>
                  </div>
                ) : 'Execute Sequence'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
export default AddNewInterview;
