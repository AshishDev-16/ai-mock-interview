"use client";
import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, Target, Zap } from "lucide-react";

const steps = [
  {
    title: "STRATEGIC ALIGNMENT",
    highlight: "PHASE 01: LOGICAL MAPPING",
    description:
      "Configure your session with precision. Our engine adapts its logic to the specific technical and behavioral benchmarks of your target role.",
    icon: <Target className="w-5 h-5 flex-shrink-0" />,
    image: "/image2.png",
  },
  {
    title: "REAL-TIME FEEDBACK",
    highlight: "PHASE 02: NEURAL FEEDBACK",
    description:
      "Experience zero-latency AI interaction. Every word is analyzed instantly, providing you with a high-fidelity feedback loop and improvement metrics.",
    icon: <Zap className="w-5 h-5 flex-shrink-0" />,
    image: "/image1.png",
  },
];

function How() {
  return (
    <section
      id="how"
      className="relative px-6 py-32 bg-background overflow-hidden"
    >
      <div className="max-w-7xl mx-auto space-y-40">
        <div className="flex flex-col items-center text-center space-y-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="px-3 py-1 rounded-sm border border-foreground/10 bg-foreground/[0.02]"
          >
            <span className="text-[10px] font-black tracking-[0.4em] uppercase text-primary">
              Deployment Protocol
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-7xl font-black tracking-tighter text-foreground uppercase"
          >
            OPERATIONAL <span className="text-foreground/20">WORKFLOW.</span>
          </motion.h2>
        </div>

        <div className="space-y-48">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true, margin: "-100px" }}
              className={`flex flex-col ${idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} items-center gap-16 md:gap-32`}
            >
              <div className="flex-1 space-y-10">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-sm bg-foreground/[0.03] border border-foreground/[0.08] flex items-center justify-center text-primary">
                      {step.icon}
                    </div>
                    <span className="text-[10px] font-black tracking-[0.3em] text-foreground/40 uppercase">
                      SYSTEM_SEQUENCE // L-0{idx + 1}
                    </span>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-3xl md:text-5xl font-black text-foreground leading-[0.9] tracking-tighter uppercase">
                      {step.highlight}
                    </h3>
                    <p className="text-sm md:text-base text-foreground/30 font-medium leading-relaxed max-w-xl tracking-tight">
                      {step.description}
                    </p>
                  </div>
                </div>

                <Link href="/dashboard">
                  <Button className="h-12 px-8 rounded-sm bg-foreground/[0.02] border border-foreground/10 text-primary-foreground/60 hover:text-primary hover:border-primary/50 hover:bg-primary/10 transition-all duration-500 text-[10px] font-black uppercase tracking-widest">
                    Initialize Phase <Sparkles className="w-3 h-3 ml-3" />
                  </Button>
                </Link>
              </div>

              <div className="flex-1 relative group w-full">
                {/* Precision Tactical Borders */}
                <div className="absolute -inset-4 border border-foreground/[0.03] rounded-sm group-hover:border-primary/10 transition-colors duration-700 pointer-events-none" />
                <div className="absolute -inset-8 border border-foreground/[0.02] rounded-sm group-hover:border-primary/5 transition-colors duration-700 pointer-events-none" />

                <div className="relative aspect-video rounded-sm overflow-hidden border border-foreground/[0.08] bg-card shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                  <Image
                    src={step.image}
                    fill
                    className="object-cover opacity-60 grayscale-[0.5] group-hover:grayscale-0 group-hover:scale-[1.03] group-hover:opacity-100 transition-all duration-700"
                    alt={step.highlight}
                  />
                  {/* Tactical Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020203] via-transparent to-transparent opacity-60" />
                  <div className="absolute bottom-4 left-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="w-1 h-1 rounded-full bg-primary animate-pulse" />
                    <span className="text-[8px] font-black tracking-widest text-foreground/40">
                      FEED_ESTABLISHED
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default How;
