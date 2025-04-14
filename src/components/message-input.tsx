"use client";

import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import { Paperclip } from "lucide-react";
import { questFormStore } from "@/lib/store/useStore";
import { ChangeEvent, useState } from "react";
import { getGeminiResponseForQuestion } from "@/actions/gemini-api/rivise";
import { toast } from "react-hot-toast";
import { questionsData } from "@/lib/store/useStore";
import { useRouter } from "next/navigation";
import { Loader } from "./loader";

export default function MessageInput() {
  const router = useRouter();

  const [prompt, setPrompt] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  //global state for questions prefernce
  const questChoice = questFormStore((state) => state.questForm);
  //global questions state
  const questions = questionsData((state) => state.questions);
  const setQuestions = questionsData((state) => state.setQuestions);

  //prompt input change
  function handleInputChange(e: ChangeEvent<HTMLTextAreaElement>) {
    setPrompt(e.target.value);
  }

  //send message function
  async function sendMessage() {
    try {
      setLoading(true);
      if (!prompt) {
        toast.error("Please enter your topic");
      }
      if (questChoice.ques === "") {
        questChoice.ques = "10";
        if (questChoice.level === "") {
          questChoice.level = "Easy";
        }
      }
      const response = await getGeminiResponseForQuestion({
        questCount: questChoice.ques,
        text: prompt,
        level: questChoice.level,
      });
      const gptResponse = JSON.parse(response.data ?? "");
      if (!gptResponse) {
        setPrompt("");
        setLoading(false);
        toast.error("Invalid Input! enter valid content");
        return;
      }
      setQuestions(gptResponse);
      router.push("/questions");
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  return (
    <div className="w-full px-2 py-2 bg-[#33204f]">
      {loading ? <Loader /> : ""}
      <div className=" rounded-2xl border border-gray-300 bg-white px-4 py-2 shadow-2xl">
        <Textarea
          value={prompt}
          placeholder="Newton's first law..."
          className="min-h-[50px] max-h-60 flex-1 resize-none border-none bg-transparent p-0 text-lg  shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
          onChange={handleInputChange}
        />
        <div className="flex justify-between">
          <div className="cursor-pointer p-2">
            <Paperclip size={22} />
          </div>
          {!prompt ? (
            ""
          ) : (
            <div
              className="cursor-pointer hover:text-blue-700 p-2"
              onClick={sendMessage}
            >
              <Send size={22} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
