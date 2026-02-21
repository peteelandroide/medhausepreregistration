import { GoogleGenerativeAI } from "@google/generative-ai";

export const analyzeTranscript = async (transcript: string, apiKey: string) => {
    if (!apiKey) throw new Error("API Key is required");

    const genAI = new GoogleGenerativeAI(apiKey);
    // Updated to Gemini 2.5 Pro as requested
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-pro" });

    const prompt = `
  Analyze the following meeting transcript between a MedHause representative (Pedro/Mafe) and a Doctor.
  Extract the following information into a valid JSON object. 
  IMPORTANT: The values must be in SPANISH.
  Do NOT use markdown formatting in the response, just return the raw JSON.
  
  Fields to extract:
  - doctorName: Name of the doctor.
  - specialty: Medical specialty.
  - currentSituation: Summary of their current professional situation (1-2 sentences).
  - goals: Their professional goals for the next 6 months (1-2 sentences).
  - recommendedPlan: 'Membership' or 'Visitante' (Infer 'Membership' by default if they talk about long term, premium, or 20 hours).
  - hoursPerMonth: Number of hours discussed (default to 20 if Membership/Premium is mentioned).
  - priceEstimate: Price mentioned (e.g. "$2.000.000 COP"). Default to "$2.000.000 COP" if Membership/Premium.
  - keyBenefits: Array of strings (3-4 bullet points) representing specific benefits discussed that appealed to the doctor.
  - nextSteps: Agreed next steps (e.g. "Visit", "Send documents").
  - meetingNotes: A brief summary or a key quote from the meeting to show active listening.

  Transcript:
  "${transcript.replace(/"/g, '\\"')}"
  `;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        if (!text) throw new Error("No text returned from Gemini");

        // Clean up potential markdown code blocks
        let jsonString = text.replace(/```json/g, '').replace(/```/g, '').trim();

        // Attempt to find JSON structure if there's extra text
        const jsonStart = jsonString.indexOf('{');
        const jsonEnd = jsonString.lastIndexOf('}');
        if (jsonStart !== -1 && jsonEnd !== -1) {
            jsonString = jsonString.substring(jsonStart, jsonEnd + 1);
        }

        return JSON.parse(jsonString);
    } catch (error) {
        console.error("Error analyzing transcript:", error);
        throw error;
    }
};
