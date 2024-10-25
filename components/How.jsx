import { Video } from 'lucide-react'
import React from 'react'
import { Button } from './ui/button'
import Image from 'next/image'
import Link from 'next/link'
import AnimateOnScroll from './AnimateOnScroll'

function How() {
  return (
    <div id="how" className="px-4 sm:px-6 md:px-10 pb-10 sm:pb-20 space-y-12 sm:space-y-16 md:space-y-20">
      <AnimateOnScroll>
        <h2 className="text-center text-4xl sm:text-5xl md:text-6xl text-black font-serif font-extrabold mb-8 sm:mb-12">
          How it Works
        </h2>
      </AnimateOnScroll>
      <AnimateOnScroll>
        <div className="flex flex-col md:grid md:grid-cols-2 text-center gap-10 md:gap-16 lg:gap-24 mx-auto max-w-7xl my-12 sm:my-16 md:my-20">
          <div className="text-left font-serif order-2 md:order-1 bg-white p-8 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300">
            <h2 className="py-2 text-indigo-600 text-2xl sm:text-3xl font-extrabold">Choose the Position & Role 🔎</h2>
            <h2 className="pb-6 text-base sm:text-lg text-gray-600">We optimize the interview prep experience according to which job Role and Position you're interested in interviewing for.</h2>
            <Link href={"/dashboard"}>
              <Button className="w-full sm:w-auto bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-indigo-600 hover:to-purple-500 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105 shadow-md">Try Now</Button>
            </Link>
          </div>
          <div className="border-4 border-indigo-200 shadow-2xl rounded-2xl h-64 sm:h-80 md:h-[50vh] relative overflow-hidden order-1 md:order-2 transform hover:rotate-2 transition-all duration-300">
            <Image 
              src="/image2.png"
              layout="fill"
              objectFit="cover"
              alt="Choose position and role"
              className="rounded-xl"
            />
          </div>
        </div>
      </AnimateOnScroll>
      <AnimateOnScroll>
        <div className="flex flex-col md:grid md:grid-cols-2 text-center gap-10 md:gap-16 lg:gap-24 mx-auto max-w-7xl my-12 sm:my-16 md:my-20">
          <div className="border-4 border-purple-200 shadow-2xl rounded-2xl h-64 sm:h-80 md:h-[50vh] relative overflow-hidden transform hover:rotate-2 transition-all duration-300">
            <Image 
              src="/image1.png"
              layout="fill"
              objectFit="cover"
              alt="Submit answer and get feedback"
              className="rounded-xl"
            />
          </div>
          <div className="text-left font-serif bg-white p-8 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300">
            <h2 className="py-2 text-purple-600 text-2xl sm:text-3xl font-extrabold">Submit Your Answer, Get Feedback 🗣️</h2>
            <h2 className="pb-6 text-base sm:text-lg text-gray-600">Get realtime feedback on how you answered each question. We'll even tell you how you can improve answering this question the next time around.</h2>
            <Link href={"/dashboard"}>
              <Button className="w-full sm:w-auto bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-purple-600 hover:to-indigo-500 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105 shadow-md">Try Now</Button>
            </Link>
          </div>
        </div>
      </AnimateOnScroll>
    </div>
  )
}

export default How
