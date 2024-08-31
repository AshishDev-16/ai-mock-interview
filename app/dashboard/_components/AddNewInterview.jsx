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
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
import { chatSession } from "@/utils/GeminiAIModel";
import { MockInterview } from "@/utils/schema";
import {v4 as uuid4} from 'uuid';
import { db } from "@/utils/db";
import { useUser } from "@clerk/nextjs";
import moment from 'moment';
import { useRouter } from "next/navigation";

const AddNewInterview = () => {
  const [openDialog, setOpenDialog] = useState(false);
    const [jobPosition,setJobPosition]=useState();
    const [jobDesc,setJobDesc] = useState();
    const [jobExperience,setJobExperience]= useState();
    const [loading,setLoading] = useState(false);
    const [jsonResponse,setJsonResponse] = useState([]);
    const{user} = useUser();
    const router = useRouter();


    const onSubmit=async(e)=>{
        e.preventDefault();
        const InputPrompt = "Job position:" +jobPosition+" ,job Description :" +jobDesc +" ,Years of Experience:" +jobExperience +" Depends on this information please give me five interview question and answer in json format give question and answer as fiels in json  format";
        const result=await chatSession.sendMessage(InputPrompt);
        const MockJsonResp = (result.response.text()).replace('```json','').replace('```','')
        console.log(JSON.parse(MockJsonResp));
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
        className="p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transation-all"
        onClick={() => setOpenDialog(true)}
      >
        <h2 className=" text-lg text-center">+Add New</h2>
      </div>
      <form onSubmit={onSubmit}>
                <div>
                    <h2>Add Details about your job position/role ,Job Description</h2>

                    <div className='mt-7 my-3'>
                        <label >Job Role / Job Position</label>
                        <input placeholder="Ex. Full Stack Developer" required onChange={(event)=>setJobPosition(event.target.value)}/>
                    </div>
                    
                    <div className=' my-3'>
                        <label >Job Description / Tech Stack (In Short)</label>
                        <textarea placeholder="Ex. React,Angular,Nodejs" required onChange={(event)=>setJobDesc(event.target.value)}/>
                    </div>
                    
                    <div className=' my-3'>
                        <label >Years of Experience</label>
                        <input placeholder="Ex. 5" type="number" max="100" required onChange={(event)=>setJobExperience(event.target.value)}/>
                    </div>
                </div>
                <div>
                <Button type="button" varient="ghost" onClick={()=>setOpenDialog(false)}>Cancle</Button>
                <Button onClick={onSubmit}>Start Interview</Button>
              </div>
              </form>
              
      <Dialog Open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              {/* <form onSubmit={onSubmit}>
                <div>
                    <h2>Add Details about your job position/role ,Job Description</h2>

                    <div className='mt-7 my-3'>
                        <label >Job Role / Job Position</label>
                        <Input placeholder="Ex. Full Stack Developer" required onChange={(event)=>setJobPosition(event.target.value)}/>
                    </div>
                    
                    <div className=' my-3'>
                        <label >Job Description / Tech Stack (In Short)</label>
                        <Textarea placeholder="Ex. React,Angular,Nodejs" required onChange={(event)=>setJobDesc(event.target.value)}/>
                    </div>
                    
                    <div className=' my-3'>
                        <label >Years of Experience</label>
                        <Input placeholder="Ex. 5" type="number" max="100" required onChange={(event)=>setJobExperience(event.target.value)}/>
                    </div>
                </div>
                <div>
                <Button type="button" varient="ghost" onClick={()=>setOpenDialog(false)}>Cancle</Button>
                <Button type="submit" className='animate-spin' disable={loading}> {loading?<><LoadingCircle>'Generating From AI'</>:'Start  Iterview' }</Button>
              </div>
              </form>
               */}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddNewInterview;
