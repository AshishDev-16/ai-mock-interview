import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

function InterviewItemCard({ interview, onRefresh }) {
  const router = useRouter();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const onStart = () => {
    router.push("/dashboard/interview/" + interview?.mockId);
  };
  const onFeedbackPress = () => {
    router.push("/dashboard/interview/" + interview?.mockId + "/feedback");
  };

  const executeDelete = async () => {
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/interview/${interview?.mockId}`, { method: "DELETE" });
      if (res.ok && onRefresh) {
        toast.success("Protocol successfully archived and deleted.");
        onRefresh();
      } else {
        toast.error("Failed to delete interview.");
      }
    } catch (e) {
      console.error(e);
      toast.error("System crash occurred.");
    } finally {
      setIsDeleting(false);
      setOpenDeleteDialog(false);
    }
  };

  return (
    <div className="group relative p-6 rounded-sm border border-foreground/5 bg-foreground/[0.02] hover:bg-foreground/[0.04] hover:border-primary/40 transition-all duration-500 overflow-hidden">
      {/* Background Precision Glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/[0.02] blur-3xl rounded-full -mr-16 -mt-16 pointer-events-none group-hover:bg-primary/[0.05] transition-all duration-500" />

      {/* Delete Button */}
      <button
        onClick={() => setOpenDeleteDialog(true)}
        className="absolute top-4 right-4 z-20 p-2 rounded-sm text-foreground/20 hover:text-destructive hover:bg-destructive/10 transition-all duration-300 opacity-0 group-hover:opacity-100"
        title="Delete Protocol"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
      </button>

      <div className="relative z-10 space-y-4">
        <div className="space-y-1 pr-8">
          <div className="flex items-center gap-2">
            <div className="h-px w-4 bg-primary/40" />
            <span className="text-[9px] font-black tracking-[0.3em] text-primary uppercase">
              Active Vector
            </span>
          </div>
          <h2 className="text-sm md:text-base font-black tracking-tight text-foreground uppercase truncate">
            {interview?.jobPosition}
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <span className="text-[9px] font-black tracking-[0.2em] text-foreground/20 uppercase">
              Experience Index
            </span>
            <p className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest">
              {interview?.jobExperience} YR
            </p>
          </div>
          <div className="space-y-1">
            <span className="text-[9px] font-black tracking-[0.2em] text-foreground/20 uppercase">
              Deployment Date
            </span>
            <p className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest">
              {interview?.createdAt}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 pt-4 border-t border-foreground/5">
          <button
            onClick={onFeedbackPress}
            className="flex-1 py-2 rounded-sm border border-foreground/5 text-[9px] font-black tracking-[0.2em] text-foreground/40 uppercase hover:bg-foreground/5 hover:text-foreground transition-all duration-300"
          >
            Analyze Feedback
          </button>
          <button
            onClick={onStart}
            className="flex-1 py-2 rounded-sm bg-primary/10 border border-primary/20 text-[9px] font-black tracking-[0.2em] text-primary uppercase hover:bg-primary/20 hover:border-primary/40 transition-all duration-300"
          >
            Resume Session
          </button>
        </div>
      </div>

      <Dialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
        <DialogContent className="sm:max-w-md bg-card border-foreground/10 text-foreground rounded-sm">
          <DialogHeader>
            <DialogTitle className="text-lg font-black tracking-tighter uppercase text-destructive">
              Confirm Deletion
            </DialogTitle>
            <DialogDescription className="text-foreground/40 text-xs tracking-wide">
              Are you sure you want to permanently erase this protocol and all associated neural data? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex gap-4 justify-end pt-4 border-t border-foreground/5 mt-4">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setOpenDeleteDialog(false)}
              className="text-xs font-bold tracking-widest uppercase hover:bg-foreground/5"
            >
              Abort
            </Button>
            <Button
              type="button"
              onClick={executeDelete}
              disabled={isDeleting}
              className="bg-destructive hover:bg-destructive/90 text-destructive-foreground text-xs font-black tracking-widest uppercase"
            >
              {isDeleting ? "Erasing..." : "Confirm Erase"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default InterviewItemCard;
