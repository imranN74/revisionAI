"use client";

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { Paperclip } from "lucide-react";
import { questFormStore } from "@/lib/store/useStore";
import { ChangeEvent, useState } from "react";
import { getGeminiResponseForQuestion } from "@/actions/gemini-api/rivise";
import { toast } from "react-hot-toast";

export default function MessageInput() {
  const [prompt, setPrompt] = useState<string>("");

  //prompt input change
  function handleInputChange(e: ChangeEvent<HTMLTextAreaElement>) {
    setPrompt(e.target.value);
  }

  //global state for questions prefernce
  const questChoice = questFormStore((state) => state.questForm);

  //send message function
  async function sendMessage() {
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
    console.log(response);
  }

  return (
    <div className="w-full px-4 py-2 bg-[#33204f]">
      <div className=" rounded-2xl  border border-gray-300 bg-gray-200 px-4 py-2 shadow-2xl">
        <Textarea
          placeholder="Type your topic..."
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
