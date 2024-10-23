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
    <div className="relative">
      <div
        className="p-8 border-2 border-dashed rounded-lg bg-gradient-to-br from-purple-100 to-indigo-100 hover:shadow-xl cursor-pointer transition-all duration-300 transform hover:-translate-y-1"
        onClick={() => setOpenDialog(true)}
      >
        <h2 className="text-lg font-semibold text-center text-primary flex items-center justify-center">
          <span className="inline-block mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </span>
          Add New Interview
        </h2>
      </div>
      <Dialog open={openDialog}>
        <DialogContent className="max-w-3xl bg-gradient-to-br from-white to-purple-50">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-primary mb-4">
              Create Your Mock Interview
            </DialogTitle>
            <DialogDescription>
              <form onSubmit={onSubmit} className="space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h2 className="text-lg font-semibold text-gray-700 mb-4">
                    Tell us about the position you're interviewing for
                  </h2>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Job Role/Position</label>
                      <Input 
                        placeholder="Ex. Full Stack Developer" 
                        required 
                        onChange={(event) => setJobPosition(event.target.value)}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Job Description / Tech Stack</label>
                      <Textarea 
                        placeholder="Ex. React, Angular, Node.js" 
                        required 
                        onChange={(event) => setJobDesc(event.target.value)}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-primary"
                        rows={3}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Years of Experience</label>
                      <Input
                        placeholder="Ex. 5"
                        type="number"
                        min="0"
                        max="50"
                        required
                        onChange={(event) => setJobExperience(event.target.value)}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 justify-end">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setOpenDialog(false)}
                    className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    disabled={loading}
                    className="px-4 py-2 text-sm bg-primary text-white hover:bg-primary-dark transition-colors duration-300"
                  >
                    {loading ? (
                      <div className="flex items-center">
                        <LoaderCircle className="animate-spin mr-2 h-4 w-4"/>
                        Generating...
                      </div>
                    ) : 'Start Interview'}
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
