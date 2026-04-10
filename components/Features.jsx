"use client";

import { Card, CardContent } from "./ui/card";
import { motion } from "framer-motion";
import {
  History,
  Zap,
  BrainCircuit,
  Target,
  Smartphone,
  Sparkles,
} from "lucide-react";

const features = [
  {
    title: "NEURAL ANALYSIS",
    description:
      "Deep learning models analyze tone, pacing, and sentiment in real-time.",
    icon: <History className="w-5 h-5 flex-shrink-0" />,
  },
  {
    title: "DYNAMIC ADAPTATION",
    description:
      "Difficulty scales dynamically based on your performance metrics.",
    icon: <Zap className="w-5 h-5 flex-shrink-0" />,
  },
  {
    title: "EXECUTIVE INSIGHTS",
    description:
      "Receive professional evaluation reports formatted for growth.",
    icon: <BrainCircuit className="w-5 h-5 flex-shrink-0" />,
  },
  {
    title: "LATENCY OPTIMIZED",
    description:
      "Zero-lag video and audio processing for realistic interaction.",
    icon: <Target className="w-5 h-5 flex-shrink-0" />,
  },
  {
    title: "ROLE PROTOCOLS",
    description: "Sector-specific frameworks for Tech, Finance, and Strategy.",
    icon: <Smartphone className="w-5 h-5 flex-shrink-0" />,
  },
  {
    title: "SECURE TUNNEL",
    description: "Enterprise-grade encryption for all preparation data.",
    icon: <Sparkles className="w-5 h-5 flex-shrink-0" />,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

function Features() {
  return (
    <section
      id="features"
      className="relative px-6 py-24 sm:py-32 overflow-hidden"
    >
      {/* Background Accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[300px] bg-primary/5 blur-[120px] rounded-[100%] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-24">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl space-y-4"
          >
            <span className="text-[10px] font-black tracking-[0.4em] uppercase text-primary">
              Capabilities Matrix
            </span>
            <h2 className="text-4xl md:text-7xl font-black tracking-tight text-foreground leading-[0.9]">
              TACTICAL
              <br />
              SPECIFICATIONS.
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-foreground/30 text-sm md:text-base max-w-sm font-medium leading-relaxed tracking-tight"
          >
            A comprehensive suite of intelligence modules engineered to decrypt
            the high-stakes interviewing process.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-foreground/[0.05] border border-foreground/[0.05]">
          {features.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group relative bg-card p-12 hover:bg-card/80 transition-all duration-500 overflow-hidden"
            >
              <div className="flex flex-col h-full space-y-10 relative z-10">
                <div className="w-12 h-12 rounded-sm bg-foreground/[0.03] border border-foreground/[0.05] flex items-center justify-center text-primary-foreground/40 transition-all duration-500 group-hover:bg-primary/10 group-hover:text-primary group-hover:border-primary/25">
                  {item.icon}
                </div>

                <div className="space-y-4">
                  <h3 className="text-xs font-black tracking-[0.25em] uppercase text-foreground group-hover:text-primary transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-foreground/20 text-[11px] font-medium leading-relaxed tracking-wider group-hover:text-foreground/40 transition-colors">
                    {item.description}
                  </p>
                </div>

                <div className="pt-6 mt-auto">
                  <div className="w-0 h-[1px] bg-primary transition-all duration-700 group-hover:w-full opacity-50" />
                </div>
              </div>

              {/* Tactical Corner Element */}
              <div className="absolute top-0 right-0 w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 overflow-hidden">
                <div className="absolute top-0 right-0 w-[1px] h-full bg-primary/40" />
                <div className="absolute top-0 right-0 h-[1px] w-full bg-primary/40" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;
