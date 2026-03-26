"use client"
import { SignInButton, useAuth } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "./ui/button";
import { DiGithubBadge } from "react-icons/di";
import React from 'react'
import { motion } from "framer-motion";

function Hero() {
    const { isSignedIn } = useAuth();
    
    return (
        <section id="hero" className="relative min-h-[90vh] flex flex-col items-center justify-center pt-20 overflow-hidden">
            {/* Background Glows */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 blur-[120px] rounded-full z-0" />
            <div className="absolute bottom-1/4 left-1/3 -translate-x-1/2 w-[400px] h-[400px] bg-secondary/10 blur-[100px] rounded-full z-0" />

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true }}
                className="relative z-10 text-center space-y-8 max-w-5xl px-6"
            >
                <div className="space-y-4">
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.9] text-foreground"
                    >
                        PRACTICE <span className="text-primary italic">FASTER</span>.<br />
                        INTERVIEW <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">BETTER</span>.
                    </motion.h1>
                    
                    <motion.p 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.4 }}
                        className="text-lg md:text-2xl text-foreground/60 font-medium max-w-2xl mx-auto"
                    >
                        Elevate your professional journey with AI-driven mock interviews tailored precisely for your dream role.
                    </motion.p>
                </div>

                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <Link href={isSignedIn ? "/dashboard" : "#"}>
                      {isSignedIn ? (
                        <Button className="h-14 px-10 rounded-full bg-primary hover:bg-primary/90 text-white text-lg font-bold shadow-[0_0_40px_rgba(99,102,241,0.4)] transition-all duration-300 transform hover:scale-105">
                          Launch Dashboard
                        </Button>
                      ) : (
                        <SignInButton mode="modal">
                          <Button className="h-14 px-10 rounded-full bg-primary hover:bg-primary/90 text-white text-lg font-bold shadow-[0_0_40px_rgba(99,102,241,0.4)] transition-all duration-300 transform hover:scale-105">
                            Start Free Session
                          </Button>
                        </SignInButton>
                      )}
                    </Link>
                    
                    <Link href="https://github.com/AshishDev-16/ai-mock-interview" target="_blank">
                        <Button variant="outline" className="h-14 px-8 rounded-full border-white/10 bg-white/5 hover:bg-white/10 backdrop-blur-sm text-lg gap-2">
                            <DiGithubBadge size={24} />
                            View Source
                        </Button>
                    </Link>
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.8 }}
                    className="pt-12 flex flex-wrap justify-center gap-8 opacity-40 grayscale hover:grayscale-0 transition-all duration-500"
                >
                    <span className="text-sm font-bold tracking-widest uppercase">Powered by Gemini 1.5</span>
                    <span className="text-sm font-bold tracking-widest uppercase">Real-time Analytics</span>
                    <span className="text-sm font-bold tracking-widest uppercase">Expert Feedback</span>
                </motion.div>
            </motion.div>
        </section>
    )
}

export default Hero
    