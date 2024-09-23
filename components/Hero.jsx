"use client"
import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import TypewriterComponent from "typewriter-effect";
import { Button } from "./ui/button";
import React from 'react'

function Hero() {
  const { isSignedIn } =useAuth();
  return (
<div className="text-primary font-bold py-36 text-center space-y-5">
            <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-5 font-extrabold">
                <h1>
                    The Best AI Tool for
                </h1>
                <div className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                     <TypewriterComponent 
                     options={{
                        strings: [
                            "Preparation",
                            "Practice",
                            "Learning",
                        ],
                        autoStart: true,
                        loop:true
                     }}
                     />
                </div>
            </div>
            <div className="text-sm md:text-xl font-light text-zinc-400">
                Practice Better using Ai
            </div>
            <div className="">
                <Link href={isSignedIn? "/dashboard" : "/sign-up"}>
                <Button variant="premium" className="rounded-full">
                    Get Started
                </Button>
                </Link>
            </div>
            <div className="text-zinc-400 text-xs md:text-sm font-normal">
                No credit card required
            </div>
        </div>
  )
}

export default Hero