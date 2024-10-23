"use client"
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import { desc, eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import InterviewItemCard from './InterviewItemCard';

function InterviewList() {


    const {user} = useUser();
    const [interviewList,setInterviewList]= useState([]);

    useEffect(()=>{
        user&&GetInterviewList();
    },[user])

    const GetInterviewList = async () => {
        const result =await db.select()
        .from(MockInterview)
        .where(eq(MockInterview.createdBy,user?.primaryEmailAddress?.emailAddress))
        .orderBy(desc(MockInterview.id))

        console.log(result)
        setInterviewList(result);
    }

  return (
    <div>
        <h2 className="font-medium text-xl">Previous Mock Interview</h2>
        {interviewList.length === 0 ? (
            <div className="flex justify-center items-center h-40">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {interviewList.map((interview, index) => (
                    <InterviewItemCard
                    interview={interview}
                    key={index}/>
                ))}
            </div>
        )}
    </div>
  )
}

export default InterviewList;