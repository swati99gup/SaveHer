import dotenv from "dotenv";
dotenv.config();
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);


export const askAI = async (message) => {
  const model = genAI.getGenerativeModel({
    model: "gemini-3-flash-preview"
  });

 const result = await model.generateContent(`
You are SafeHer AI, a women safety assistant.

Rules:
- Give short practical advice.
- Be calm and supportive.
- Suggest emergency services if danger exists.
- Keep answers under 100 words.

User:
${message}
`);

  return result.response.text();
};