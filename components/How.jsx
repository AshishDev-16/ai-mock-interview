"use client"
import React from 'react'
import { Button } from './ui/button'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Sparkles, Target, Zap } from 'lucide-react'

const steps = [
    {
        title: "STRATEGIC ALIGNMENT",
        highlight: "Choose Role & Position",
        description: "Configure your session with precision. Our engine adapts its logic to the specific technical and behavioral benchmarks of your target role.",
        icon: <Target className="w-5 h-5 text-primary" />,
        image: "/image2.png",
        color: "from-primary/20",
    },
    {
        title: "REAL-TIME FEEDBACK",
        highlight: "Kinetic Transcription",
        description: "Experience zero-latency AI interaction. Every word is analyzed instantly, providing you with a high-fidelity feedback loop and improvement metrics.",
        icon: <Zap className="w-5 h-5 text-secondary" />,
        image: "/image1.png",
        color: "from-secondary/20",
    }
];

function How() {
  return (
    <section id="how" className="relative px-6 py-24 sm:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-32">
        <div className="text-center space-y-4">
            <motion.span 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="text-secondary font-bold tracking-widest text-xs uppercase"
            >
                The Protocol
            </motion.span>
            <motion.h2 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-6xl font-black tracking-tight text-foreground"
            >
                HOW IT <span className="italic text-secondary">WORKS</span>.
            </motion.h2>
        </div>

        <div className="space-y-40">
          {steps.map((step, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
              className={`flex flex-col ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 md:gap-24`}
            >
              <div className="flex-1 space-y-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-white/5 border border-white/10 shrink-0">
                      {step.icon}
                    </div>
                    <span className="text-sm font-bold tracking-[0.2em] text-foreground/40 uppercase">
                      Step 0{idx + 1} // {step.title}
                    </span>
                  </div>
                  <h3 className="text-3xl md:text-5xl font-black text-foreground leading-tight">
                    {step.highlight}
                  </h3>
                  <p className="text-lg text-foreground/50 font-medium leading-relaxed max-w-xl">
                    {step.description}
                  </p>
                </div>
                
                <Link href="/dashboard">
                  <Button className="h-12 px-8 rounded-full bg-primary/10 border border-primary/20 text-primary hover:bg-primary hover:text-white transition-all duration-300">
                    Get Started <Sparkles className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>

              <div className="flex-1 relative group">
                {/* Ghost Border Effect */}
                <div className="absolute -inset-4 border border-white/5 rounded-2xl group-hover:border-primary/20 transition-colors duration-500 pointer-events-none" />
                <div className="absolute -inset-8 border border-white/5 rounded-[2rem] group-hover:border-secondary/10 transition-colors duration-500 pointer-events-none" />
                
                <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10 bg-white/5 shadow-2xl">
                  <div className={`absolute inset-0 bg-gradient-to-tr ${step.color} to-transparent opacity-40`} />
                  <Image 
                    src={step.image}
                    fill
                    className="object-cover opacity-80 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700"
                    alt={step.highlight}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default How
