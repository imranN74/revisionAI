import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState, useRef } from "react";
import { answerData } from "@/lib/store/useStore";

type Option = {
  A: string;
  B: string;
  C: string;
  D: string;
};

export default function AnswerRadio({
  options,
  questionKey,
}: {
  options: Option;
  questionKey: string;
}) {
  const setAnswer = answerData((state) => state.setAnswer);

  function handleAnswerUpdate(val: string) {
    setAnswer({ question_no: questionKey, answer_key: val });
    // console.log(val);
  }

  return (
    <RadioGroup defaultValue="" onValueChange={handleAnswerUpdate}>
      {Object.entries(options).map(([Key, value]) => {
        return (
          <div className="flex items-center space-x-2" key={Key}>
            <span>{Key}</span>
            <RadioGroupItem value={Key} id={Key} />
            <Label htmlFor={Key}>{value}</Label>
          </div>
        );
      })}
    </RadioGroup>
  );
}
