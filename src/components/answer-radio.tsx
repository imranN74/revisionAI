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
  questionNumber,
}: {
  options: Option;
  questionNumber: number;
}) {
  const [answer, setAnswerKey] = useState("");
  const setAnswer = answerData((state) => state.setAnswer);
  const answerId = useRef(null);
  const questId = `Q-${questionNumber}`;

  function handleAnswerUpdate(val: string) {
    setAnswerKey(val);
    setAnswer({ question_no: questId, answer_key: answer });
  }

  return (
    <RadioGroup defaultValue="option-one" onValueChange={handleAnswerUpdate}>
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
