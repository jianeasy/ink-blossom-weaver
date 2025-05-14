import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useApiKey } from "@/context/ApiKeyContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";

const ApiKeyInput = () => {
  const { apiKey, setApiKey } = useApiKey();
  const [tempApiKey, setTempApiKey] = useState("");
  const [open, setOpen] = useState(!apiKey);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (tempApiKey.trim()) {
      setApiKey(tempApiKey.trim());
      toast.success("API密钥已保存");
      setOpen(false);
    } else {
      toast.error("请输入有效的API密钥");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* <DialogTrigger asChild>
        <Button 
          variant="outline" 
          className="absolute top-4 right-4 bg-chinese-white hover:bg-chinese-white/90 text-chinese-black border-chinese-brown"
        >
          {apiKey ? "更改API密钥" : "设置API密钥"}
        </Button>
      </DialogTrigger> */}
      <DialogContent className="chinese-panel">
        <DialogHeader>
          <DialogTitle className="text-2xl font-heading text-chinese-red">
            设置 Runware API 密钥
          </DialogTitle>
          <DialogDescription className="text-chinese-black/80">
            请输入您的 Runware API 密钥以使用图像生成功能。 您可以在{" "}
            <a
              href="https://runware.ai/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-chinese-red hover:text-chinese-brown underline"
            >
              Runware.ai
            </a>{" "}
            网站上获取您的 API 密钥。
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="password"
            placeholder="输入您的 API 密钥"
            value={tempApiKey}
            onChange={(e) => setTempApiKey(e.target.value)}
            className="chinese-input"
            required
          />
          <DialogFooter>
            <Button type="submit" className="chinese-button">
              保存
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ApiKeyInput;
