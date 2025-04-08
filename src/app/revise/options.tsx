"use client";

import SelectField from "@/components/SelectField";
import { useState } from "react";

export function Options() {
  const [selectValue, setSelectValue] = useState("");

  function handleActionChange(value: string) {
    setSelectValue(value);
    console.log(value);
  }

  return (
    <div>
      <SelectField
        fields={["Questions", "Understand"]}
        placeholder="Select Action"
        onChange={handleActionChange}
        value={selectValue}
      />
    </div>
  );
}
