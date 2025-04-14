"use client";

import { marksData } from "@/lib/store/useStore";

export default function VerifyAnswer() {
  const marks = marksData((state) => state.marks);

  return (
    <div className="flex justify-center items-center h-[100dvh]">
      <div className="text-4xl text-white">{`${marks.correctAnswer}/${marks.totalQuestion}`}</div>
    </div>
  );
}
