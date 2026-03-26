"use client"
import React, { useState } from 'react'
import { ChevronDown, HelpCircle } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const faqData = [
  {
    question: "How are the interview vectors optimized per role?",
    answer: "Our engine uses specific industry benchmarks and job descriptions to generate high-fidelity technical and behavioral probes tailored to your target position."
  },
  {
    question: "Which hardware is compatible with the protocol?",
    answer: "The platform is fully optimized for all modern environments including desktop workstations, tablets, and mobile devices."
  },
  {
    question: "How does real-time analysis improve performance?",
    answer: "By providing instant feedback on metrics such as technical accuracy, sentiment, and delivery, users can iterate and refine their response patterns in a live simulated environment."
  },
  {
    question: "Is there a trial phase available?",
    answer: "We currently provide a tiered access model, including a fully functional free session to test the core AI vectors."
  },
  {
    question: "What is the latency of the feedback engine?",
    answer: "The AI processing cycle is sub-2 seconds, ensuring a seamless, high-velocity interaction that mimics real interview pressures."
  }
]

export default function Questions() {
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <section id="questions" className="relative px-6 py-24 sm:py-32 overflow-hidden">
      <div className="max-w-4xl mx-auto space-y-16">
        <div className="text-center space-y-4">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-primary font-bold tracking-widest text-xs uppercase"
          >
            Intelligence Base
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black tracking-tight text-foreground"
          >
            SUPPORT <span className="italic text-primary">VECTORS</span>.
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
                className={`w-full text-left p-6 rounded-2xl border transition-all duration-300 ${
                  openIndex === index 
                    ? "bg-white/10 border-primary/50" 
                    : "bg-white/5 border-white/10 hover:border-white/20"
                }`}
              >
                <div className="flex justify-between items-center gap-4">
                  <div className="flex items-center gap-4">
                    <HelpCircle className={`w-5 h-5 transition-colors ${openIndex === index ? "text-primary" : "text-foreground/40"}`} />
                    <span className={`text-lg font-bold transition-colors ${openIndex === index ? "text-foreground" : "text-foreground/70 group-hover:text-foreground"}`}>
                      {item.question}
                    </span>
                  </div>
                  <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${openIndex === index ? "rotate-180 text-primary" : "text-foreground/40"}`} />
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
                      <div className="pt-6 text-foreground/50 leading-relaxed font-medium">
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
  )
}
