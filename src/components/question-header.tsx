"use client";

import { questFormStore } from "@/lib/store/useStore";

export function QuestHeader() {
  const questForm = questFormStore((state) => state.questForm);
  return (
    <div className="mb-5">
      <div className="flex justify-center text-2xl">Questions</div>
      <div className="flex justify-center gap-5">
        <div className="flex justify-center">
          No. Of Questions : {questForm.ques}
        </div>
        <div className="flex justify-center">
          Questions Level: {questForm.level}
        </div>
      </div>
    </div>
  );
}
