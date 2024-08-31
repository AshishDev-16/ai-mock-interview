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
    const InputPrompt = "Job position:" +jobPosition+" ,job Description :" +jobDesc +" ,Years of Experience:" +jobExperience +" Depends on this information please give me 5 interview question and answer in json format give question and answer as fiels in json  format";
    const result=await chatSession.sendMessage(InputPrompt);
    const MockJsonResp = (result.response.text()).replace('```json','').replace('```','')
    // console.log(JSON.parse(MockJsonResp));
    setJsonResponse(MockJsonResp);
    // console.log(MockJsonResp)

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
