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
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });
    const result = response.text;
    const finResponse = result?.replace(/```json|```/g, "").trim();
    return { status: true, message: "data fetched", data: finResponse };
  } catch (error) {
    console.log(error);
    return { status: false, message: "something went wrong" };
  }
}

//___________VERIFY ANSWERS___________

interface Question {
  answer: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  question: string;
}

interface Answer {
  question_no: string;
  answer_key: string;
}

export async function verifyAnswer(questions: Question[], answers: Answer[]) {
  try {
    const checkedAnswer = questions.map((question, index) => {
      const matchinganswer = answers.find(
        (ans) => ans.question_no === `Q-${index + 1}`
      );
      return matchinganswer?.answer_key === question.answer;
    });
    return { status: true, message: "answers verified", data: checkedAnswer };
  } catch (error) {
    console.log(error);
    return { status: false, message: "something went wrong" };
  }
}
