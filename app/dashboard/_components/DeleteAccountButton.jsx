"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useClerk } from "@clerk/nextjs";

export default function DeleteAccountButton() {
  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { signOut } = useClerk();

  const executeDelete = async () => {
    setIsDeleting(true);
    try {
      const res = await fetch("/api/account/delete", { method: "DELETE" });
      if (res.ok) {
        toast.success("Your account and all data has been permanently deleted.");
        await signOut({ redirectUrl: "/" });
      } else {
        toast.error("Failed to delete account.");
        setIsDeleting(false);
      }
    } catch (e) {
      console.error(e);
      toast.error("System error occurred.");
      setIsDeleting(false);
    }
  };

  return (
    <>
      <button 
        onClick={() => setOpen(true)}
        className="bg-destructive text-destructive-foreground hover:bg-destructive/90 text-[10px] font-black tracking-widest uppercase py-2 px-6 rounded-sm flex items-center gap-2 whitespace-nowrap shadow-md focus:outline-none"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/><line x1="22" x2="16" y1="11" y2="11"/></svg>
        Permanently Delete Account
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md bg-card border-foreground/10 text-foreground rounded-sm">
          <DialogHeader>
            <DialogTitle className="text-lg font-black tracking-tighter uppercase text-destructive">
              Delete Account
            </DialogTitle>
            <DialogDescription className="text-foreground/40 text-xs tracking-wide">
              This action is permanent and cannot be undone. All your mock interview records, AI feedback, and profile data will be permanently erased. Please re-confirm this choice.
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex gap-4 justify-end pt-4 border-t border-foreground/5 mt-4">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setOpen(false)}
              className="text-xs font-bold tracking-widest uppercase hover:bg-foreground/5"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={executeDelete}
              disabled={isDeleting}
              className="bg-destructive hover:bg-destructive/90 text-destructive-foreground text-xs font-black tracking-widest uppercase"
            >
              {isDeleting ? "Deleting..." : "Confirm Delete"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
