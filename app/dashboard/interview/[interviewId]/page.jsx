"use client"
import { MockInterview } from '@/utils/schema'
import React from 'react'
import { useEffect,useState } from 'react'
import { db } from '@/utils/db'
import { eq } from 'drizzle-orm'
import Webcam from 'react-webcam'

const Interview = ({params}) => {

  const {interviewData,setInterviewData} = useState();
  useEffect(()=>{
    console.log(params.interviewId)
    GetInterviewDetails();
  },[])

  const GetInterviewDetails=async()=>{
    const result = await db.select().from(MockInterview)
    .where(eq(MockInterview.mockId,params.interviewId))
    console.log(result);
    setInterviewData(result[0]);
  }

  return (
    <div className='my-10 flex justify-center flex-col items-center'>
      <h2 className='font-bold text-2xl'>Let's Get Started</h2>
      <div><Webcam/></div>
    </div>
  )
}

export default Interview
