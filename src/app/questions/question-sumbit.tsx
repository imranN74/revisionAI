"use client";

import { Button } from "@/components/ui/button";
import Quest from "../../components/question";
import { QuestHeader } from "@/components/question-header";
import { answerData } from "@/lib/store/useStore";
import { questionsData } from "@/lib/store/useStore";
import { verifyAnswer } from "@/actions/gemini-api/rivise";
import { marksData } from "@/lib/store/useStore";
import { useRouter } from "next/navigation";

export function QuestionSubmit() {
  const router = useRouter();

  const answers = answerData((state) => state.answers);
  const questions = questionsData((state) => state.questions);
  const setMarks = marksData((state: any) => state.setMarks);

  async function handleQuestionSubmit() {
    const checkedAnswers = await verifyAnswer(questions, answers);
    const totalQuestion = checkedAnswers.length;
    const correctAnswer = checkedAnswers.filter((ans) => ans === true);
    setMarks({
      totalQuestion: totalQuestion,
      correctAnswer: correctAnswer.length,
    });
    router.push("/verify-answer");
  }

  return (
    <div className="bg-white mx-3 lg:mx-20 my-10 rounded-xl p-5 shadow-2xl">
      <QuestHeader />
      <hr />
      <Quest />
      <div className="flex justify-center my-2">
        <Button onClick={handleQuestionSubmit}>Submit</Button>
      </div>
    </div>
  );
}
