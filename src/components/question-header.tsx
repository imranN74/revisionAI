"use client";

import { questFormStore } from "@/lib/store/useStore";

export function QuestHeader() {
  const questForm = questFormStore((state) => state.questForm);
  return (
    <div className="mb-5">
      <div className="flex justify-center text-2xl text-red-500 font-semibold">
        QUESTIONS
      </div>
      <div className="flex justify-center gap-5">
        <div className="flex justify-center">
          No. Of Questions&nbsp;:&nbsp;
          <span className="text-red-400">{questForm.ques}</span>
        </div>
        <div className="flex justify-center">
          Level&nbsp;:&nbsp;
          <span className="text-red-400">{questForm.level}</span>
        </div>
      </div>
    </div>
  );
}
