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
import { ChevronsUpDown } from 'lucide-react'
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
            // Calculate total rating
            const total = result.reduce((sum, item) => sum + Number(item.rating), 0);
            setTotalRating(total);
        }
    }
    return (
        <div className="p-10">
            {feedbackList?.length == 0 ?
                <h2 className="font-bold text-xl text-gray-500">No Interview Feedback Found</h2>
                :
                <>
                    <h2 className="text-3xl font-bold text-green-500">Congratulation!</h2>

                    <h2 className="font-bold text-2xl">Here is your interview feedback</h2>
                    {totalRating < 10 ?
                        <h2 className="text-red-500 text-lg my-3">Your overall interview rating:<strong>
                            {totalRating}/25
                        </strong></h2>
                        :
                        <>
                            <h2 className="text-green-500 text-lg my-3">Your overall interview rating:<strong>
                                {totalRating}/25
                            </strong></h2>
                        </>}

                    <h2 className="text-sm text-gray-500">Find below interview question with correct answer, Your answer and feedback for improvment</h2>

                    {feedbackList && feedbackList.map((item, index) => (
                        <Collapsible key={index} className="mt-7">
                            <CollapsibleTrigger className="p-2 flex justify-between bg-secondary rounded-lg my-2 text-left gap-7 w-full">
                                {item.question} <ChevronsUpDown className="h-5 w-5" />
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                                <div className="flex flex-col gap-2">
                                    {item.rating < 5 ?
                                        <h2 className="text-red-500 p-2 border rounded-lg">
                                            <strong>Rating:</strong>{item.rating}
                                        </h2>
                                        :
                                        <>
                                            <h2 className="text-green-500 p-2 border rounded-lg">
                                                <strong>Rating:</strong>{item.rating}
                                            </h2>
                                        </>}
                                    <h2 className="p-2 border rounded-lg bg-red-50 text-sm text-red-900">
                                        <strong>Your Answer:</strong>{item.userAns}
                                    </h2>
                                    <h2 className="p-2 border rounded-lg bg-green-50 text-sm text-green-900">
                                        <strong>Correct Answer:</strong>{item.correctAns}
                                    </h2>
                                    <h2 className="p-2 border rounded-lg bg-blue-50 text-sm text-primary">
                                        <strong>Feedback:</strong>{item.feedback}
                                    </h2>
                                </div>
                            </CollapsibleContent>
                        </Collapsible>

                    ))}
                </>}
            <Button onClick={() => router.replace('/dashboard')}>Go Home</Button>
        </div>
    )
}

export default Feedback