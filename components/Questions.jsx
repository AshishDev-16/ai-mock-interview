"use client"
import React, { useState } from 'react'
import { ChevronDown, ChevronUp } from "lucide-react"
import AnimateOnScroll from './AnimateOnScroll'

const questions = [
  {
    Question: "How are your interview prep questions optimized for each job?",
    Ans: "We spent a long time coming up with questions that each company would be likely to ask!"
  },
  {
    Question: "Which device can I use Interview Pro with?",
    Ans: "You can use Interview Sidekick on various devices including desktop computers, laptops, tablets, and smartphones."
  },
  {
    Question: "How will this help when it comes to my interview?",
    Ans: "Interview Pro provides tailored preparation, boosting your confidence and performance in interviews."
  },
  {
    Question: "Is this tool free?",
    Ans: "We offer both free and premium features. Free for now"
  },
  {
    Question: "Will the AI be quick?",
    Ans: "Yes, our AI is designed to provide quick and efficient responses to your queries."
  }
]

export default function Question() {
  const [openIndex, setOpenIndex] = useState(null)

  const toggleQuestion = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-16 ">
      <AnimateOnScroll>
        <h1 className="text-6xl font-serif font-extrabold text-center mb-4 text-gray-900">
          Frequently Asked Questions
        </h1>
        <p className="text-center text-gray-600 font-serif mb-12 text-lg">Curious about something? We've got answers!</p>
      </AnimateOnScroll>
      
      {questions.map((item, index) => (
        <AnimateOnScroll key={index}>
          <div className="mb-4 bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl">
            <button
              onClick={() => toggleQuestion(index)}
              className="w-full text-left focus:outline-none"
            >
              <div className="flex justify-between items-center p-4 bg-white hover:bg-purple-100 transition-colors duration-200">
                <span className="font-bold font-serif text-xl text-gray-800">{item.Question}</span>
                {openIndex === index ? (
                  <ChevronUp className="h-6 w-6 text-purple-600" />
                ) : (
                  <ChevronDown className="h-6 w-6 text-purple-600" />
                )}
              </div>
            </button>
            {openIndex === index && (
              <div className="p-4 text-gray-700 font-serif text-lg bg-purple-50">
                {item.Ans}
              </div>
            )}
          </div>
        </AnimateOnScroll>
      ))}
    </div>
  )
}
