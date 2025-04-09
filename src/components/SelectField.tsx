"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SelectProps {
  fields: string[];
  value: string;
  onChange?: (value: string) => void;
  placeholder: string;
}

export default function SelectField({
  value,
  onChange,
  placeholder,
  fields,
}: SelectProps) {
  return (
    <Select value={value ? value : ""} onValueChange={onChange}>
      <SelectTrigger className="w-[180px] border-black">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {fields.map((field: string, index) => {
          return (
            <SelectItem value={field} key={index}>
              {field}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}
