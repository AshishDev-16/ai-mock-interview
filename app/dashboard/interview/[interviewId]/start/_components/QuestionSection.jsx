import { Lightbulb, Volume2 } from "lucide-react";
import React from "react";

function QuestionSection({ mockInterviewQuestion, activeQuestionIndex }) {
  const textToSpeech = (text) => {
    if ("speechSynthesis" in window) {
      const speech = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech);
    } else {
      alert("Sorry, Your browser does not support text to speech");
    }
  };
  return (
    mockInterviewQuestion && (
      <div className="space-y-10">
        <div className="p-8 rounded-sm border border-foreground/5 bg-foreground/[0.02] space-y-10 shadow-2xl">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {mockInterviewQuestion &&
              mockInterviewQuestion.map((question, index) => (
                <div
                  key={index}
                  className={`py-2 px-1 border rounded-sm text-[9px] font-black tracking-[0.2em] text-center uppercase transition-all duration-500 
                    ${
                      activeQuestionIndex == index
                        ? "bg-primary/20 border-primary/40 text-primary"
                        : "bg-foreground/[0.02] border-foreground/5 text-foreground/20"
                    }`}
                >
                  Vector #{index + 1}
                </div>
              ))}
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="h-px w-6 bg-primary/40" />
              <span className="text-[10px] font-black tracking-[0.4em] text-primary uppercase">
                Active Query
              </span>
            </div>
            <h2 className="text-xl md:text-2xl font-black tracking-tight text-foreground uppercase leading-tight">
              {mockInterviewQuestion[activeQuestionIndex]?.question}
            </h2>
            <div
              onClick={() =>
                textToSpeech(
                  mockInterviewQuestion[activeQuestionIndex]?.question,
                )
              }
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm border border-foreground/5 bg-foreground/[0.02] text-[10px] font-bold text-foreground/40 uppercase hover:text-primary hover:border-primary/20 cursor-pointer transition-all duration-300"
            >
              <Volume2 size={14} />
              <span>Broadcast Audio</span>
            </div>
          </div>

          <div className="p-8 rounded-sm border border-primary/10 bg-primary/5 space-y-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-[0.03]">
              <Lightbulb size={60} className="text-primary" />
            </div>
            <div className="flex gap-3 items-center">
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <strong className="text-[10px] font-black tracking-[0.4em] text-primary uppercase">
                Protocol Notes
              </strong>
            </div>
            <p className="text-[11px] leading-relaxed text-foreground/50 font-medium tracking-wide uppercase">
              Click on Record Answer to initialize the audio buffer. Vector
              analysis will be performed upon submission. Ensure vocal clarity
              for high-fidelity signal processing.
            </p>
          </div>
        </div>
      </div>
    )
  );
}

export default QuestionSection;
