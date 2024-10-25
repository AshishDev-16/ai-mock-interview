import Features from '@/components/Features'
import Footer from '@/components/Footer'
import Hero from '@/components/Hero'
import How from '@/components/How'
import GridPattern from '@/components/magicui/GridPattern'
import Questions from '@/components/Questions'
import { cn } from '@/lib/utils'
import React from 'react'


function LandingPage() {
  return (
      <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-lg border bg-background p-20 md:shadow-xl">
        <GridPattern
          numSquares={30}
          maxOpacity={0.5}
          duration={1}
          repeatDelay={1}
          className={cn(
            "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
            "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12",
          )}
        />
      <div className="">
        <Hero />
        <How />
        <Features />
        <Questions />
        <Footer />
      </div>
    </div>
  )
}
export default LandingPage
