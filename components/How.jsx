import { Video } from 'lucide-react'
import React from 'react'
import { Button } from './ui/button'
import Image from 'next/image'

function How() {
  return (
    <div className="px-10 pb-20 space-y-50">
      <h2 className="text-center text-5xl text-black font-serif font-extrabold mb-10">
        How it Works
      </h2>
      <div className="grid grid-cols-2 text-center gap-24 mx-40 my-40 ">
        <div className="text-left font-serif">
          <h2 className="py-2 text-black text-2xl font-extrabold">Choose the Position & Role 🔎</h2>
          <h2 className="pb-4 text-lg">We optimize the interview prep experience according to which job Role and Position you're interested in interviewing for.</h2>
          <Button>Try Now</Button>
        </div>
        <div className="border-2 shadow-lg rounded-lg h-[40vh] relative overflow-hidden">
          <Image src={'/image2.png'} 
          layout="fill"
          objectFit="cover"
           alt='img'/>
        </div>
      </div>

      <div className="grid grid-cols-2 text-center gap-24 mx-40 my-40">
        <div className="border-2 shadow-lg rounded-lg h-[40vh] relative overflow-hidden">
        <Image src={'/image.png'} 
          layout="fill"
          objectFit="cover"
           alt='img'/>
        </div>
        <div className="text-left font-serif">
        <h2 className="py-2 text-black text-2xl font-extrabold">Submit Your Answer, Get Feedback 🗣️</h2>
          <h2 className="pb-4 text-lg">Get realtime feedback on how you answered each question. We'll even tell you how you can improve answering this question the next time around.</h2>
          <Button>Try Now</Button>
        </div>

      </div>
    </div>
  )
}

export default How