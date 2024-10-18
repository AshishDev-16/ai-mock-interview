import { Video } from 'lucide-react'
import React from 'react'
import { Button } from './ui/button'
import Image from 'next/image'
import Link from 'next/link'

function How() {
  return (
    <div className="px-4 sm:px-6 md:px-10 pb-10 sm:pb-20 space-y-8 sm:space-y-12 md:space-y-16">
      <h2 className="text-center text-3xl sm:text-4xl md:text-5xl text-black font-serif font-extrabold mb-6 sm:mb-10">
        How it Works
      </h2>
      <div className="flex flex-col md:grid md:grid-cols-2 text-center gap-8 md:gap-12 lg:gap-24 mx-auto max-w-7xl my-8 sm:my-12 md:my-16">
        <div className="text-left font-serif order-2 md:order-1">
          <h2 className="py-2 text-black text-xl sm:text-2xl font-extrabold">Choose the Position & Role 🔎</h2>
          <h2 className="pb-4 text-base sm:text-lg">We optimize the interview prep experience according to which job Role and Position you're interested in interviewing for.</h2>
        <Link href={"/dashboard"}>
          <Button className="w-full sm:w-auto">Try Now</Button>
        </Link>
        </div>
        <div className="border-2 shadow-lg rounded-lg h-48 sm:h-64 md:h-[40vh] relative overflow-hidden order-1 md:order-2">
          <Image 
            src="/image2.png"
            layout="fill"
            objectFit="cover"
            alt="Choose position and role"
          />
        </div>
      </div>

      <div className="flex flex-col md:grid md:grid-cols-2 text-center gap-8 md:gap-12 lg:gap-24 mx-auto max-w-7xl my-8 sm:my-12 md:my-16">
        <div className="border-2 shadow-lg rounded-lg h-48 sm:h-64 md:h-[40vh] relative overflow-hidden">
          <Image 
            src="/image.png"
            layout="fill"
            objectFit="cover"
            alt="Submit answer and get feedback"
          />
        </div>
        <div className="text-left font-serif">
          <h2 className="py-2 text-black text-xl sm:text-2xl font-extrabold">Submit Your Answer, Get Feedback 🗣️</h2>
          <h2 className="pb-4 text-base sm:text-lg">Get realtime feedback on how you answered each question. We'll even tell you how you can improve answering this question the next time around.</h2>
          <Link href={"/dashboard"}>
            <Button className="w-full sm:w-auto">Try Now</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default How