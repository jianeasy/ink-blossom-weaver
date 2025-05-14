
import React from "react";
import { Button } from "@/components/ui/button";
import { Brush, Download, Loader2 } from "lucide-react";

interface PaintingDisplayProps {
  imageUrl: string | null;
  prompt: string;
  loading: boolean;
  onGenerate: () => void;
}

const PaintingDisplay = ({ imageUrl, prompt, loading, onGenerate }: PaintingDisplayProps) => {
  const handleDownload = () => {
    if (!imageUrl) return;
    
    // Create a temporary anchor element
    const a = document.createElement("a");
    a.href = imageUrl;
    a.download = `chinese-painting-${Date.now()}.webp`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-heading text-chinese-red">画作预览</h3>
      
      <div className="rounded-md overflow-hidden border-4 border-chinese-brown bg-chinese-white min-h-[300px] flex items-center justify-center">
        {loading ? (
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="h-12 w-12 animate-spin text-chinese-red" />
            <p className="text-chinese-black/70">正在创作中...</p>
          </div>
        ) : imageUrl ? (
          <img 
            src={imageUrl} 
            alt="Generated Chinese Painting" 
            className="w-full h-full object-contain"
          />
        ) : (
          <div className="text-chinese-black/50 flex flex-col items-center gap-4">
            <Brush className="h-12 w-12" />
            <p>设置参数后点击生成按钮创作国画</p>
          </div>
        )}
      </div>
      
      {imageUrl && (
        <div className="flex justify-between">
          <Button 
            variant="outline" 
            className="border-chinese-brown text-chinese-black hover:bg-chinese-brown/10"
            onClick={handleDownload}
          >
            <Download className="mr-2 h-4 w-4" />
            下载画作
          </Button>
          
          <Button 
            className="chinese-button"
            onClick={onGenerate}
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                生成中...
              </>
            ) : (
              <>
                <Brush className="mr-2 h-4 w-4" />
                重新生成
              </>
            )}
          </Button>
        </div>
      )}
      
      {prompt && (
        <div className="mt-4 p-3 bg-chinese-white/60 border border-chinese-brown/30 rounded text-sm text-chinese-black/70">
          <p className="font-semibold">生成提示词:</p>
          <p className="mt-1 text-xs">{prompt}</p>
        </div>
      )}
    </div>
  );
};

export default PaintingDisplay;
