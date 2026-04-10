"use client";
import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const faqData = [
  {
    question: "How are the interview vectors optimized per role?",
    answer:
      "Our engine uses specific industry benchmarks and job descriptions to generate high-fidelity technical and behavioral probes tailored to your target position.",
  },
  {
    question: "Which hardware is compatible with the protocol?",
    answer:
      "The platform is fully optimized for all modern environments including desktop workstations, tablets, and mobile devices.",
  },
  {
    question: "How does real-time analysis improve performance?",
    answer:
      "By providing instant feedback on metrics such as technical accuracy, sentiment, and delivery, users can iterate and refine their response patterns in a live simulated environment.",
  },
  {
    question: "Is there a trial phase available?",
    answer:
      "We currently provide a tiered access model, including a fully functional free session to test the core AI vectors.",
  },
  {
    question: "What is the latency of the feedback engine?",
    answer:
      "The AI processing cycle is sub-2 seconds, ensuring a seamless, high-velocity interaction that mimics real interview pressures.",
  },
];

export default function Questions() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section
      id="questions"
      className="relative px-6 py-32 bg-background overflow-hidden"
    >
      <div className="max-w-4xl mx-auto space-y-24">
        <div className="flex flex-col items-center text-center space-y-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="px-3 py-1 rounded-sm border border-foreground/10 bg-foreground/[0.02]"
          >
            <span className="text-[10px] font-black tracking-[0.4em] uppercase text-primary">
              Intelligence Base
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-7xl font-black tracking-tighter text-foreground uppercase"
          >
            PROTOCOL <span className="text-foreground/20">DOCUMENTATION.</span>
          </motion.h2>
        </div>

        <div className="space-y-4">
          {faqData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className={`w-full text-left p-8 rounded-sm border transition-all duration-500 cursor-pointer ${
                  openIndex === index
                    ? "bg-muted border-primary/40 shadow-[0_0_30px_rgba(0,85,255,0.1)]"
                    : "bg-background border-foreground/5 hover:border-foreground/20"
                }`}
              >
                <div className="flex justify-between items-center gap-6">
                  <div className="flex items-center gap-6">
                    <div
                      className={`w-8 h-8 rounded-sm border flex items-center justify-center transition-all duration-500 ${
                        openIndex === index
                          ? "border-primary/40 bg-primary/10 text-primary"
                          : "border-foreground/5 text-primary-foreground/20"
                      }`}
                    >
                      <HelpCircle className="w-4 h-4" />
                    </div>
                    <span
                      className={`text-sm md:text-base font-black tracking-tight uppercase transition-all duration-500 ${openIndex === index ? "text-foreground" : "text-foreground/40 group-hover:text-foreground/70"}`}
                    >
                      {item.question}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-500 ${openIndex === index ? "rotate-180 text-primary" : "text-foreground/20"}`}
                  />
                </div>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="pt-8 pl-14 text-foreground/30 text-xs md:text-sm leading-relaxed font-medium tracking-wide max-w-2xl">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
