
import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { PaintingSubject, translateSubject } from "@/types/ChinesePainting";

interface SubjectSelectorProps {
  value: PaintingSubject;
  onChange: (value: PaintingSubject) => void;
}

const SubjectSelector = ({ value, onChange }: SubjectSelectorProps) => {
  const subjects: PaintingSubject[] = [
    "landscape",
    "flower_bird",
    "people",
    "animal",
    "bamboo",
    "plum_blossom",
    "orchid",
    "chrysanthemum"
  ];

  const handleChange = (value: string) => {
    onChange(value as PaintingSubject);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-heading text-chinese-red">绘画题材 (Subject)</h3>
      <RadioGroup value={value} onValueChange={handleChange} className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {subjects.map((subject) => (
          <div key={subject} className="flex items-center space-x-2 border border-chinese-brown/50 p-3 rounded-md hover:bg-chinese-brown/10 transition-colors">
            <RadioGroupItem value={subject} id={`subject-${subject}`} className="text-chinese-red" />
            <Label htmlFor={`subject-${subject}`} className="cursor-pointer w-full">
              <span className="font-heading">{translateSubject(subject)}</span>
              <span className="text-sm text-chinese-black/70 block">{subject}</span>
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default SubjectSelector;
