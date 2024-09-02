import { Button } from "@/components/ui/button";
import { Webcam } from "lucide-react";
import Image from "next/image";
import React from "react";

function RecordAnsSection() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col mt-20 justify-center items-center bg-secondary  rounded-lg p-5">
        <Webcam
          style={{
            height: 300,
            width: "100%",
            zIndex: 10,
          }}
        />
      </div>
      <Button variant="outline" className="my-10">Record Answer</Button>
    </div> 
  );
}

export default RecordAnsSection;
