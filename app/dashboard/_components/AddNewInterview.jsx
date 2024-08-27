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

const AddNewInterview = () => {
  const [openDialog, setOpenDialog] = useState(false);
    const [jobPosition,setJobPosition]=useState();
    const [jobDesc,setJobDesc] = useState();
    const [jobExperience,setJobExperience]= useState();

    const onSubmit=async(e)=>{
        e.preventDefault();
        console.log("job khvbjhadh")
        const InputPrompt = "Job position:" +jobPosition+" ,job Description :" +jobDesc +" ,Years of Experience:" +jobExperience +" Depends on this information please give me five interview question and answer in json format give question and answer as fiels in json  format";

        const result=await chatSession.sendMessage(InputPrompt);
        const MockJsonResp = (result.response.text()).replace('```json','').replace('```','')
        console.log(JSON.parse(MockJsonResp));


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
                <Button>Start Interview</Button>
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
