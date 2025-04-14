"use client";

import { marksData } from "@/lib/store/useStore";
import { QuestHeader } from "@/components/question-header";
import Quest from "@/components/question";

export default function VerifyAnswer() {
  // const marks = marksData((state: any) => state.marks);

  return (
    <div className="bg-white rounded-xl p-5">
      <QuestHeader />
      <hr />
      <Quest />
    </div>
  );
}
