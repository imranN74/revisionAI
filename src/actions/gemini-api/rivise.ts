"use server";

import { GoogleGenAI } from "@google/genai";
import { questionsPrompt } from "./prompts";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

interface UserInput {
  questCount: string;
  text: string;
  level: string;
}

export async function getGeminiResponseForQuestion(userInput: UserInput) {
  const { questCount, text, level } = userInput;
  const prompt = questionsPrompt
    .replace("{number_of_questions}", questCount.toString())
    .replace("{difficulty_level}", level)
    .replace("{user_input_text}", text);
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: prompt,
  });
  const result = response.text;
  const finResponse = result?.replace(/```json|```/g, "").trim();
  // console.log(`++++++${finResponse}++++++`);
  return finResponse;
}
