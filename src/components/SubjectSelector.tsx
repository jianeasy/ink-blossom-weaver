import React, { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mic, MicOff } from "lucide-react";
import { PaintingSubject, translateSubject } from "@/types/ChinesePainting";

interface SubjectSelectorProps {
  value: PaintingSubject;
  onChange: (value: PaintingSubject) => void;
  customSubject: string;
  onCustomSubjectChange: (value: string) => void;
}

const SubjectSelector = ({
  value,
  onChange,
  customSubject,
  onCustomSubjectChange,
}: SubjectSelectorProps) => {
  const subjects: PaintingSubject[] = [
    "landscape",
    "flower_bird",
    "people",
    "animal",
    "bamboo",
    "plum_blossom",
    "orchid",
    "chrysanthemum",
  ];

  const [isListening, setIsListening] = useState(false);

  const handleVoiceInput = () => {
    if (
      !("webkitSpeechRecognition" in window) &&
      !("SpeechRecognition" in window)
    ) {
      alert("您的浏览器不支持语音识别功能，请使用现代浏览器。");
      return;
    }

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.lang = "zh-CN";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      console.log("语音识别结果:", transcript);
      onCustomSubjectChange(transcript);
    };

    recognition.onerror = (event) => {
      console.error("语音识别错误:", event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      console.log("语音识别结束");
      setIsListening(false);
    };

    recognition.start();
  };

  const handleChange = (value: string) => {
    onChange(value as PaintingSubject);
  };

  const handleCustomSubjectChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    onCustomSubjectChange(e.target.value);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-heading text-chinese-red">绘画题材</h3>
      <RadioGroup
        value={value}
        onValueChange={handleChange}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {subjects.map((subject) => (
          <div
            key={subject}
            className="flex items-center space-x-2 border border-chinese-brown/50 p-3 rounded-md hover:bg-chinese-brown/10 transition-colors"
          >
            <RadioGroupItem
              value={subject}
              id={`subject-${subject}`}
              className="text-chinese-red"
            />
            <Label
              htmlFor={`subject-${subject}`}
              className="cursor-pointer w-full"
            >
              <span className="font-heading">{translateSubject(subject)}</span>
            </Label>
          </div>
        ))}
      </RadioGroup>

      <div className="mt-4">
        <Label
          htmlFor="customSubject"
          className="block text-chinese-black mb-2"
        >
          自定义主题
        </Label>
        <div className="flex items-center space-x-2">
          <Input
            id="customSubject"
            value={customSubject}
            onChange={handleCustomSubjectChange}
            placeholder="输入或语音输入您想要的绘画主题"
            className="chinese-input w-full"
          />
          <Button
            type="button"
            variant="outline"
            size="icon"
            className={`border border-chinese-brown hover:bg-chinese-brown/10 ${
              isListening ? "bg-chinese-red/10" : ""
            }`}
            onClick={handleVoiceInput}
            title="语音输入"
          >
            {isListening ? (
              <MicOff className="h-4 w-4 text-chinese-red" />
            ) : (
              <Mic className="h-4 w-4 text-chinese-brown" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SubjectSelector;
