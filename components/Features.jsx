"use client"

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import AnimateOnScroll from './AnimateOnScroll'


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
        <div id="features" className="px-4 sm:px-6 md:px-10 py-16 sm:py-24 md:py-32">
            <AnimateOnScroll>
                <h2 className="text-center text-3xl sm:text-4xl md:text-5xl text-gray-800 font-serif font-bold mb-6 sm:mb-8 md:mb-12">
                    Our Features
                </h2>
                <p className="text-center text-base sm:text-lg text-gray-600 font-serif max-w-3xl mx-auto mb-12 sm:mb-16 md:mb-20">
                    Enhance your interview preparation with our innovative tools designed to give you the competitive edge.
                </p>
            </AnimateOnScroll>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {testimonials.map((item) => (
                    <AnimateOnScroll key={item.title}>
                        <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300 h-full flex flex-col">
                            <CardHeader className="border-b border-gray-100 p-6">
                                <CardTitle className="flex items-center gap-x-3 text-xl font-semibold text-gray-800">
                                    <span className="text-2xl">{item.title.split(' ').pop()}</span>
                                    <p>{item.title.split(' ').slice(0, -1).join(' ')}</p>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-6 flex-grow flex items-center">
                                <p className="text-gray-600 font-serif text-base">
                                    {item.description}
                                </p>
                            </CardContent>
                        </Card>
                    </AnimateOnScroll>
                ))}
            </div>
        </div>
    )
}

export default Features
