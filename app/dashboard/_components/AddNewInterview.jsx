"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";
import { chatSession } from "@/utils/GeminiAIModel";
import {v4 as uuid4} from 'uuid';
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { MockInterview } from "@/utils/schema";
import { db } from "@/utils/db";

function AddNewInterview() {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobPosition,setJobPosition]=useState();
  const [jobDesc,setJobDesc] = useState();
  const [jobExperience,setJobExperience]= useState();
  const [loading,setLoading] = useState(false);
  const [jsonResponse,setJsonResponse] = useState([]);
  const{user} = useUser();
  const router = useRouter();

  const onSubmit=async(e)=>{
    setLoading(true)
    e.preventDefault();
    
    const InputPrompt = `Generate 5 interview questions and answers for the following job:

    Job Position: ${jobPosition}
    Job Description: ${jobDesc}
    Years of Experience: ${jobExperience}
    
    Please provide the output as a valid JSON array of objects. Each object should have 'question' and 'answer' fields. Do not include any markdown formatting, code blocks, or additional explanations. The JSON should be directly parseable.
    
    Example format:
    [
      {
        "question": "Sample question here?",
        "answer": "Sample answer here."
      },
      {
        "question": "Another sample question?",
        "answer": "Another sample answer."
      }
    ]
    
    Ensure that:
    1. All quotes are properly escaped.
    2. There are no trailing commas.
    3. Newlines within answers use \\n for line breaks.
    4. No markdown formatting (like **, __, or \`) is used.
    5. The output is a single, valid JSON array.`;

    const result = await chatSession.sendMessage(InputPrompt);
    let MockJsonResp = result.response.text().trim();
  

    // Attempt to parse and re-stringify to ensure valid JSON
    try {
      MockJsonResp = JSON.stringify(JSON.parse(MockJsonResp));
    } catch (error) {
      console.error("Error parsing AI response:", error);
      // Handle the error appropriately, maybe set an error state or retry
    }

    // At this point, MockJsonResp should be a valid JSON string
    setJsonResponse(MockJsonResp);

    if(MockJsonResp)
    {
    const resp=await db.insert(MockInterview)
    .values({
      mockId:uuid4(),
      jsonMockResp:MockJsonResp,
      jobPosition:jobPosition,
      jobDesc:jobDesc,
      jobExperience:jobExperience,
      createdBy:user?.primaryEmailAddress?.emailAddress,
      createdAt:moment().format('DD-MM-YYYY')
    }).returning({mockId:MockInterview.mockId})
    console.log("Inserted ID: ",resp);
    if(resp){
      setOpenDialog(false);
      router.push('/dashboard/interview/'+resp[0]?.mockId)
    }
    }
    else{
      console.log("Error inserting mock interview");
    }
    setLoading(false);
  }
  return (
    <div>
      <div
        className="p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all"
        onClick={() => setOpenDialog(true)}
      >
        <h2 className="text-lg text-center">+ Add New</h2>
      </div>
      <Dialog open={openDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              Tell us more about your job interviwing
            </DialogTitle>
            <DialogDescription>
              <form onSubmit={onSubmit}>
              <div className="">
                <h2 className="">
                  Add Details about your job position/role ,Job Description
                </h2>

                <div className="mt-7 my-3">
                  <label>Job Role/Job Position</label>
                  <Input placeholder="Ex. Full Stack Developer" required onChange={(event)=>setJobPosition(event.target.value)}/>
                </div>
                <div className="my-3">
                  <label>Job Description / Tech Stack (In Short)</label>
                  <Textarea placeholder="Ex. React,Angular,Nodejs" required onChange={(event)=>setJobDesc(event.target.value)}/>
                </div>
                <div className="my-3">
                  <label>Years of Experience</label>
                  <Input
                    placeholder="Ex. 5"
                    type="number"
                    min="0"
                    max="50"
                    required
                    onChange={(event)=>setJobExperience(event.target.value)}
                  />
                </div>
              </div>

              <div className="flex gap-5 justify-end">
                <Button type="button" variant="ghost" onClick={() => setOpenDialog(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading?
                  <>
                  <LoaderCircle className="animate-spin"/>'Generating from AI'
                  </>:'Start Interview'
                }
               
                </Button>
              </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
export default AddNewInterview;
