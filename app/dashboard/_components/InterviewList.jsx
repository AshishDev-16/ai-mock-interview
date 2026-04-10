"use client"
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import InterviewItemCard from "./InterviewItemCard";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

function InterviewList() {
  const { user } = useUser();
  const [interviewList, setInterviewList] = useState([]);
  const [openPurgeDialog, setOpenPurgeDialog] = useState(false);
  const [isPurging, setIsPurging] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    user && GetInterviewList();
  }, [user]);

  const GetInterviewList = async () => {
    setIsLoading(true);
    try {
      const resp = await fetch("/api/interview");
      const data = await resp.json();
      if (resp.ok) {
        setInterviewList(data);
      } else {
        toast.error("Failed to load interview records.");
      }
    } catch (e) {
      console.error(e);
      toast.error("Security handshake failed.");
    } finally {
      setIsLoading(false);
    }
  };

  const executePurge = async () => {
    setIsPurging(true);
    try {
      const res = await fetch("/api/interview/reset", { method: "DELETE" });
      if (res.ok) {
        GetInterviewList();
        toast.success("All your interview history has been deleted.");
      } else {
        toast.error("Failed to delete history.");
      }
    } catch (e) {
      console.error(e);
      toast.error("System error occurred.");
    } finally {
      setIsPurging(false);
      setOpenPurgeDialog(false);
    }
  };

  return (
    <div className="w-full space-y-6">
      {interviewList.length > 0 && (
        <div className="flex justify-end">
          <button 
            onClick={() => setOpenPurgeDialog(true)}
            className="text-[9px] font-black tracking-[0.2em] uppercase py-2 px-4 border border-destructive/20 text-destructive/80 hover:bg-destructive/10 hover:text-destructive transition-all duration-300 rounded-sm flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
            Delete All History
          </button>
        </div>
      )}

      {isLoading ? (
        <div className="flex flex-col items-center justify-center h-48 rounded-sm border border-foreground/5 bg-foreground/[0.01]">
          <div className="w-10 h-10 border-2 border-primary/20 border-t-primary rounded-full animate-spin mb-4" />
          <span className="text-[10px] font-black tracking-[0.4em] text-foreground/20 uppercase">
            Loading Interviews...
          </span>
        </div>
      ) : interviewList.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-48 rounded-sm border border-foreground/5 bg-foreground/[0.01]">
          <span className="text-xs font-bold tracking-widest text-foreground/40 uppercase">
            No Records Found
          </span>
          <span className="text-[10px] font-medium tracking-wide text-foreground/20 uppercase mt-2">
            Create an interview to get started.
          </span>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {interviewList.map((interview, index) => (
            <InterviewItemCard interview={interview} key={index} onRefresh={GetInterviewList} />
          ))}
        </div>
      )}

      <Dialog open={openPurgeDialog} onOpenChange={setOpenPurgeDialog}>
        <DialogContent className="sm:max-w-md bg-card border-foreground/10 text-foreground rounded-sm">
          <DialogHeader>
            <DialogTitle className="text-lg font-black tracking-tighter uppercase text-destructive">
              Confirm Deletion
            </DialogTitle>
            <DialogDescription className="text-foreground/40 text-xs tracking-wide">
              This will permanently delete your entire interview history and all feedback data. This is an irreversible action. Do you wish to proceed?
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex gap-4 justify-end pt-4 border-t border-foreground/5 mt-4">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setOpenPurgeDialog(false)}
              className="text-xs font-bold tracking-widest uppercase hover:bg-foreground/5"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={executePurge}
              disabled={isPurging}
              className="bg-destructive hover:bg-destructive/90 text-destructive-foreground text-xs font-black tracking-widest uppercase"
            >
              {isPurging ? "Deleting..." : "Confirm Delete"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default InterviewList;
