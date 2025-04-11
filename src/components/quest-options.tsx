"use client";

import SelectField from "@/components/SelectField";
import { questFormStore } from "@/lib/store/useStore";

export function Options() {
  const questForm = questFormStore((state) => state.questForm);
  const setQuestState = questFormStore((state) => state.setQuestState);

  function handleChange(name: string, value: string) {
    setQuestState({ [name]: value });
  }

  return (
    <div className="bg-[#33204f]">
      <div className="flex justify-center">
        <p className="text-xl text-white">Choose Your Preference!</p>
      </div>
      <div className="flex gap-5 mt-2">
        <SelectField
          fields={["10", "15", "20"]}
          placeholder="No Of Questions"
          onChange={(value) => handleChange("ques", value)}
          value={questForm.ques}
        />
        <SelectField
          fields={["Easy", "Medium", "Hard"]}
          placeholder="Level Of Questions"
          onChange={(value) => handleChange("level", value)}
          value={questForm.level}
        />
      </div>
    </div>
  );
}
