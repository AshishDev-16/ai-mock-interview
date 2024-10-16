"use client"
import { useAuth } from "@clerk/nextjs";
import { RainbowButton } from '@/components/magicui/RainbowButton'
import Link from "next/link";
import TypewriterComponent from "typewriter-effect";
import { Button } from "./ui/button";
import { DiGithubBadge } from "react-icons/di";
import React from 'react'

function Hero() {
    const { isSignedIn } = useAuth();
    return (
        <div className="text-primary font-bold py-32 text-center space-y-5">
            <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-5 font-extrabold">
                <h1>
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
                <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
                    <Button className="rounded-full bg-gradient-to-r from-indigo-400 via-purple-400 to-primary">
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
    )
}

export default Hero