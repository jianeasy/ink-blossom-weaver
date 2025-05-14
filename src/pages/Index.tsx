
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Brush, Loader2 } from "lucide-react";
import ApiKeyInput from "@/components/ApiKeyInput";
import StyleSelector from "@/components/StyleSelector";
import SubjectSelector from "@/components/SubjectSelector";
import ParameterControls from "@/components/ParameterControls";
import PaintingDisplay from "@/components/PaintingDisplay";
import { useApiKey } from "@/context/ApiKeyContext";
import { RunwareService } from "@/services/RunwareService";
import { toast } from "sonner";
import { buildChinesePaintingPrompt } from "@/utils/promptBuilder";
import { 
  ChinesePaintingOptions, 
  PaintingStyle, 
  PaintingSubject, 
  PaintingParameters 
} from "@/types/ChinesePainting";

const Index = () => {
  const { apiKey } = useApiKey();
  const [isLoading, setIsLoading] = useState(false);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const [generatedPrompt, setGeneratedPrompt] = useState<string>("");
  
  // Default painting options
  const [style, setStyle] = useState<PaintingStyle>("shuimo");
  const [subject, setSubject] = useState<PaintingSubject>("landscape");
  const [customSubject, setCustomSubject] = useState<string>("");
  const [parameters, setParameters] = useState<PaintingParameters>({
    inkIntensity: 6,
    composition: "deep_far",
    paperColor: "象牙白 (Ivory)",
    seasonalFeature: "autumn"
  });

  const getPaintingOptions = (): ChinesePaintingOptions => {
    return {
      style,
      subject,
      customSubject,
      parameters
    };
  };

  const generateImage = async () => {
    if (!apiKey) {
      toast.error("请先设置API密钥");
      return;
    }

    try {
      setIsLoading(true);
      const options = getPaintingOptions();
      const prompt = buildChinesePaintingPrompt(options);
      setGeneratedPrompt(prompt);
      
      const runwareService = new RunwareService(apiKey);
      const result = await runwareService.generateImage({
        positivePrompt: prompt,
        model: "runware:100@1"
      });
      
      setGeneratedImageUrl(result.imageURL);
      toast.success("国画创作完成！");
    } catch (error) {
      console.error("Image generation error:", error);
      toast.error("生成失败，请重试");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pb-16">
      <header className="text-center py-8 border-b border-chinese-red/30 relative animate-ink-flow">
        <h1 className="text-4xl md:text-5xl font-heading text-chinese-red">国画生成器</h1>
        <ApiKeyInput />
      </header>

      <main className="container px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8 animate-ink-flow" style={{ animationDelay: "0.2s" }}>
            <StyleSelector value={style} onChange={setStyle} />
            <SubjectSelector 
              value={subject} 
              onChange={setSubject}
              customSubject={customSubject}
              onCustomSubjectChange={setCustomSubject}
            />
            <ParameterControls parameters={parameters} onChange={setParameters} />
            
            {!generatedImageUrl && (
              <div className="pt-4">
                <Button 
                  className="chinese-button w-full text-lg py-6"
                  onClick={generateImage}
                  disabled={isLoading || !apiKey}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      正在创作国画...
                    </>
                  ) : (
                    <>
                      <Brush className="mr-2 h-5 w-5" />
                      生成国画
                    </>
                  )}
                </Button>
              </div>
            )}
          </div>
          
          <div className="animate-ink-flow" style={{ animationDelay: "0.4s" }}>
            <PaintingDisplay 
              imageUrl={generatedImageUrl} 
              prompt={generatedPrompt}
              loading={isLoading} 
              onGenerate={generateImage} 
            />
          </div>
        </div>
      </main>
      
      <footer className="text-center py-6 text-chinese-black/60 text-sm border-t border-chinese-red/30">
        <p>基于 AI 技术的国画生成器</p>
      </footer>
    </div>
  );
};

export default Index;
