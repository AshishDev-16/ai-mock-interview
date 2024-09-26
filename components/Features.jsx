"use client"

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";


const testimonials = [

    {
        
        "title": "Saved Transcripts 🗣️",
        "description": "All of your interviews are transcribed and saved for future reference"
    },
    {
       
        "title": "Realtime Transcriptions 🕰️",
        "description": "Our transcriptions have a latency of less than 2 seconds, ensuring that the AI keeps up with the conversation"
    },
    {
        
        "title": "AI learns over time 🧠",
        "description": "Our AI is constantly learning from successful interviews so that you increase your chances of getting the offer extended email"
    },      
    {
        
        "title": "Position-optimized interview questions 🪮",
        "description": "We optimize the interview questions and process according to which role/position you're interviewing for."
    },   
    {
        
        "title": "Multi-device 📱💻",
        "description": "Interview Pro is designed to be used by your phone, computer, or tablet"
    },   
    {
        
        "title": "Coming soon...😉",
        "description": "We're just getting started! Check back in as our team is continually adding features"
    }, 

]

function Features() {
  return (
    <div className="px-10  space-y-4">
    <h2 className="text-center text-5xl text-black font-serif font-extrabold mb-10">
        Our Features
    </h2>
    <h2 className="text-center text-sm text-zinc-400 font-serif">Using cutting-edge AI and so much more</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 m-20">
        {testimonials.map((item) => (
            <Card key={item.description} className="bg-blue-100 border-blue-300 text-black">
                <CardHeader>
                    <CardTitle className="flex items-center gap-x-2">
                        <div className="">
                            
                            <p className="text-lg font-serif">{item.title}</p>
                        </div>
                    </CardTitle>
                    <CardContent className="pt-4 px-0 font-serif">
                        {item.description}
                    </CardContent>
                </CardHeader>
            </Card>
        ))}
    </div>
</div>
  )
}

export default Features