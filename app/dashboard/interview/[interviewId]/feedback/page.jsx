"use client"

import { db } from '@/utils/db'
import { UserAnswer } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronsUpDown, Home, Star } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

function Feedback({ params }) {
    const [feedbackList, setFeedbackList] = useState([]);
    const router = useRouter();
    const [totalRating, setTotalRating] = useState(0);

    useEffect(() => {
        getFeedback();
    }, [])

    const getFeedback = async () => {
        const result = await db.select()
            .from(UserAnswer)
            .where(eq(UserAnswer.mockIdRef, params.interviewId))
            .orderBy(UserAnswer.id);

        console.log(result);
        setFeedbackList(result);

        if (result.length > 0) {
            const total = result.reduce((sum, item) => sum + Number(item.rating), 0);
            setTotalRating(total);
        }
    }

    return (
        <div className="min-h-screen pt-20">
            <div className="max-w-4xl mx-auto p-6 pt-24">
                {feedbackList?.length == 0 ? (
                    <div className="text-center py-20">
                        <h2 className="font-bold text-2xl text-gray-600">No Interview Feedback Found</h2>
                        <p className="mt-4 text-gray-500">It seems there's no feedback available for this interview yet.</p>
                    </div>
                ) : (
                    <div className="space-y-8">
                        <div className="text-center">
                            <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
                                Congratulations!
                            </h2>
                            <h3 className="mt-2 font-bold text-2xl text-gray-700">Here's Your Interview Feedback</h3>
                        </div>

                        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                            <h2 className="text-2xl font-bold mb-4">Overall Performance</h2>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-600 mb-2">Your overall interview rating:</p>
                                    <p className={`text-3xl font-bold ${totalRating < 10 ? 'text-red-500' : 'text-green-500'}`}>
                                        {totalRating}/25
                                    </p>
                                </div>
                                <div className="flex">
                                    {[...Array(5)].map((_, i) => (
                                        <Star 
                                            key={i} 
                                            className={`w-8 h-8 ${i < Math.round(totalRating / 5) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>

                        <p className="text-sm text-gray-600 mb-6">
                            Expand each question below to see your answer, the correct answer, and feedback for improvement.
                        </p>

                        {feedbackList && feedbackList.map((item, index) => (
                            <Collapsible key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                                <CollapsibleTrigger className="p-4 flex justify-between items-center w-full text-left hover:bg-gray-50 transition-colors duration-200">
                                    <span className="font-medium text-gray-800">{item.question}</span>
                                    <ChevronsUpDown className="h-5 w-5 text-gray-400" />
                                </CollapsibleTrigger>
                                <CollapsibleContent className="p-4 bg-gray-50">
                                    <div className="space-y-4">
                                        <div className={`p-3 rounded-lg ${item.rating < 5 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                                            <strong>Rating:</strong> {item.rating}/5
                                        </div>
                                        <div className="p-3 bg-red-50 rounded-lg">
                                            <strong className="block mb-1 text-red-700">Your Answer:</strong>
                                            <p className="text-red-900">{item.userAns}</p>
                                        </div>
                                        <div className="p-3 bg-green-50 rounded-lg">
                                            <strong className="block mb-1 text-green-700">Correct Answer:</strong>
                                            <p className="text-green-900">{item.correctAns}</p>
                                        </div>
                                        <div className="p-3 bg-blue-50 rounded-lg">
                                            <strong className="block mb-1 text-blue-700">Feedback:</strong>
                                            <p className="text-blue-900">{item.feedback}</p>
                                        </div>
                                    </div>
                                </CollapsibleContent>
                            </Collapsible>
                        ))}

                        <div className="mt-8 text-center">
                            <Button
                                onClick={() => router.replace('/dashboard')}
                                className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-bold py-2 px-6 rounded-full inline-flex items-center transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                            >
                                <Home className="mr-2 h-5 w-5 animate-pulse" />
                                <span className="relative">
                                    <span className="absolute inset-0 bg-white opacity-25 blur-sm"></span>
                                    <span className="relative z-10">Go to Dashboard</span>
                                </span>
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Feedback
