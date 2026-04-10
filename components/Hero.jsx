"use client";
import { SignInButton, useAuth } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "./ui/button";
import { DiGithubBadge } from "react-icons/di";
import React from "react";
import { motion } from "framer-motion";

function Hero() {
  const { isSignedIn } = useAuth();

  return (
    <section
      id="hero"
      className="relative min-h-[100vh] flex flex-col items-center justify-center pt-20 overflow-hidden bg-background"
    >
      {/* Surgical Background Glows */}
      <div className="absolute top-[20%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/5 blur-[160px] rounded-full z-0" />
      <div className="absolute bottom-[10%] right-[10%] w-[300px] h-[300px] bg-foreground/[0.02] blur-[100px] rounded-full z-0" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true }}
        className="relative z-10 text-center space-y-12 max-w-6xl px-6"
      >
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="inline-block px-4 py-1.5 rounded-full border border-foreground/5 bg-foreground/[0.02] backdrop-blur-md"
          >
            <span className="text-[10px] font-black tracking-[0.3em] uppercase text-primary">
              Intelligence Protocol v2.0
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-[120px] font-black tracking-tighter leading-[0.85] text-foreground"
          >
            MASTER THE
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-foreground via-foreground to-foreground/20">
              INTERVIEW.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-lg md:text-xl text-foreground/40 font-medium max-w-3xl mx-auto tracking-tight leading-relaxed"
          >
            Engineered for executive performance. Deploy tactical AI simulations
            that bridge the gap between preparation and perfection.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <Link href={isSignedIn ? "/dashboard" : "#"}>
            {isSignedIn ? (
              <Button className="h-16 px-12 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-black tracking-[0.2em] uppercase shadow-[0_0_40px_rgba(0,85,255,0.25)] transition-all duration-500 transform hover:scale-[1.02] hover:-translate-y-1">
                Initialize Dashboard
              </Button>
            ) : (
              <SignInButton mode="modal">
                <Button className="h-16 px-12 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-black tracking-[0.2em] uppercase shadow-[0_0_40px_rgba(0,85,255,0.25)] transition-all duration-500 transform hover:scale-[1.02] hover:-translate-y-1">
                  Begin Protocol
                </Button>
              </SignInButton>
            )}
          </Link>

          <Link
            href="https://github.com/AshishDev-16/ai-mock-interview"
            target="_blank"
          >
            <Button
              variant="outline"
              className="h-16 px-10 rounded-lg border-foreground/5 bg-foreground/[0.02] hover:bg-foreground/[0.05] backdrop-blur-xl text-xs font-black tracking-[0.2em] uppercase gap-3 transition-all"
            >
              <DiGithubBadge size={20} className="text-foreground/60" />
              Core Repository
            </Button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.8 }}
          className="pt-20 flex flex-wrap justify-center gap-12"
        >
          {["Neural Feedback", "Real-time Latency", "Executive Ready"].map(
            (text) => (
              <div key={text} className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-foreground/30">
                  {text}
                </span>
              </div>
            ),
          )}
        </motion.div>
      </motion.div>
    </section>
  );
}

export default Hero;
