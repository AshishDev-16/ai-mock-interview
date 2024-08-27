/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
Job position fullstack developer ,job Description :React,Nodejs,MySql ,Years of Experience Depends on this information please give me five interview question and answer in json format give question and answer as fiels in json 
*/

const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  

   export const chatSession = model.startChat({
      generationConfig
   // See https://ai.google.dev/gemini-api/docs/safety-settings
    });
  
