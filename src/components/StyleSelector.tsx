
import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { PaintingStyle, translateStyle } from "@/types/ChinesePainting";

interface StyleSelectorProps {
  value: PaintingStyle;
  onChange: (value: PaintingStyle) => void;
}

const StyleSelector = ({ value, onChange }: StyleSelectorProps) => {
  const styles: PaintingStyle[] = [
    "gongbi",
    "xieyi",
    "shuimo", 
    "mogu",
    "lingnan",
    "zhongyuan"
  ];

  const handleChange = (value: string) => {
    onChange(value as PaintingStyle);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-heading text-chinese-red">绘画风格 (Style)</h3>
      <RadioGroup value={value} onValueChange={handleChange} className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {styles.map((style) => (
          <div key={style} className="flex items-center space-x-2 border border-chinese-brown/50 p-3 rounded-md hover:bg-chinese-brown/10 transition-colors">
            <RadioGroupItem value={style} id={`style-${style}`} className="text-chinese-red" />
            <Label htmlFor={`style-${style}`} className="cursor-pointer w-full">
              <span className="font-heading">{translateStyle(style)}</span>
              <span className="text-sm text-chinese-black/70 block">{style}</span>
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default StyleSelector;
