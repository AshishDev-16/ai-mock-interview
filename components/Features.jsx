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
        <div className="px-4 sm:px-6 md:px-10 py-8 sm:py-12 md:py-16 space-y-4 sm:space-y-6 md:space-y-8">
            <h2 className="text-center text-3xl sm:text-4xl md:text-5xl text-black font-serif font-extrabold mb-4 sm:mb-6 md:mb-10">
                Our Features
            </h2>
            <h2 className="text-center text-sm sm:text-base text-zinc-400 font-serif max-w-2xl mx-auto">
                Using cutting-edge AI and so much more to enhance your interview preparation experience
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mt-8 sm:mt-12 md:mt-16">
                {testimonials.map((item) => (
                    <Card key={item.title} className="bg-blue-100 border-blue-300 text-black">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-x-2">
                                <p className="text-lg sm:text-xl font-serif">{item.title}</p>
                            </CardTitle>
                            <CardContent className="pt-2 sm:pt-4 px-0 font-serif text-sm sm:text-base">
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