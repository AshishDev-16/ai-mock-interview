"use client"
import { SignIn, SignInButton, useAuth } from "@clerk/nextjs";
import { RainbowButton } from '@/components/magicui/RainbowButton'
import Link from "next/link";
import TypewriterComponent from "typewriter-effect";
import { Button } from "./ui/button";
import { DiGithubBadge } from "react-icons/di";
import React from 'react'
import AnimateOnScroll from './AnimateOnScroll'

function Hero() {
    const { isSignedIn } = useAuth();
    return (
        <AnimateOnScroll>
            <div id="dashboard" className="text-primary font-bold py-32 text-center space-y-5 glassmorphism">
                <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-5 font-extrabold">
                    <h1 className="">
                        The Best AI Tool for
                    </h1>
                    <div className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-primary">
                        <TypewriterComponent
                            options={{
                                strings: [
                                    "Preparation",
                                    "Practice",
                                    "Learning",
                                ],
                                autoStart: true,
                                loop: true
                            }}
                        />
                    </div>
                </div>
                <div className="text-sm md:text-xl font-light text-zinc-400">
                Nail the Practice. 
                Ace the Interview.
                </div>
                <div className="">
                    <Link href={isSignedIn ? "/dashboard" : <SignInButton mode="modal"/>}>
                        <Button className="rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 transition-all duration-300 transform hover:scale-105">
                            Get Started
                        </Button>
                    </Link>
                </div>
                <div className="text-zinc-400 text-xs md:text-sm font-normal">
                    No credit card required
                </div>
                <RainbowButton>
                  <Link className="flex items-center gap-1 text-sm" href={"https://github.com/AshishDev-16/ai-mock-interview/tree/master"}>
                    <DiGithubBadge size={20} />
                    Star on Github
                  </Link>
                </RainbowButton>
            </div>
        </AnimateOnScroll>
    )
}

export default Hero
