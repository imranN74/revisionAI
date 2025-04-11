import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type Option = { A: string; B: string; C: string; D: string };

export default function AnswerRadio({ options }: { options: Option }) {
  return (
    <RadioGroup defaultValue="option-one">
      {Object.entries(options).map(([Key, value]) => {
        return (
          <div className="flex items-center space-x-2">
            <span>{Key}</span>
            <RadioGroupItem value={value} id={Key} />
            <Label htmlFor="option-one">{value}</Label>
          </div>
        );
      })}
    </RadioGroup>
  );
}
