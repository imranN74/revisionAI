"use client";

import { Button } from "@/components/ui/button";
import Quest from "../../components/question";
import { QuestHeader } from "@/components/question-header";
import { answerData } from "@/lib/store/useStore";
import { questionsData } from "@/lib/store/useStore";
import { verifyAnswer } from "@/actions/gemini-api/rivise";
import { marksData } from "@/lib/store/useStore";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export function QuestionSubmit() {
  const router = useRouter();
  const [loader, setLoader] = useState(false);
  const answers = answerData((state) => state.answers);
  const questions = questionsData((state) => state.questions);
  const setMarks = marksData((state) => state.setMarks);

  async function handleQuestionSubmit() {
    try {
      setLoader(true);
      if (answers.length === 0) {
        toast.error("no question attempted!");
        setLoader(false);
        return;
      }
      const response = await verifyAnswer(questions, answers);
      if (response.data) {
        const totalQuestion = response.data?.length;
        const correctAnswer = response.data?.filter((ans) => ans === true);
        setMarks({
          totalQuestion: totalQuestion,
          correctAnswer: correctAnswer?.length,
        });
      }
      router.push("/verify-answer");
      setLoader(false);
    } catch (error) {
      console.log(error);
      toast.error("something went wrong!");
      setLoader(false);
    }
  }

  return (
    <div className="bg-white rounded-xl p-5">
      <QuestHeader />
      <hr />
      <Quest />
      <div className="flex justify-center my-2">
        <Button onClick={handleQuestionSubmit}>
          {loader ? "Verifying..." : "Submit"}
        </Button>
      </div>
    </div>
  );
}
