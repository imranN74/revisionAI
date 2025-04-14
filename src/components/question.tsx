"use client";

import { questionsData } from "@/lib/store/useStore";
import AnswerRadio from "./answer-radio";

export default function Quest() {
  const questions = questionsData((state) => state.questions);
  return questions.map((data, index) => {
    return (
      <div key={index}>
        <div className="py-3">
          <div className="my-5 flex gap-2">
            <div className="font-bold">{index + 1}.</div>
            <div>{data.question}</div>
          </div>
          <div className="px-2">
            <AnswerRadio options={data.options} questionNumber={index + 1} />
          </div>
        </div>
        <hr />
      </div>
    );
  });
}
