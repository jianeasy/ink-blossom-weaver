
import React from "react";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { 
  PaintingParameters, 
  CompositionType, 
  SeasonType, 
  translateComposition, 
  translateSeason 
} from "@/types/ChinesePainting";

interface ParameterControlsProps {
  parameters: PaintingParameters;
  onChange: (parameters: PaintingParameters) => void;
}

const ParameterControls = ({ parameters, onChange }: ParameterControlsProps) => {
  const compositions: CompositionType[] = [
    "vertical", 
    "horizontal", 
    "high_far", 
    "level_far", 
    "deep_far"
  ];
  
  const seasons: SeasonType[] = ["spring", "summer", "autumn", "winter"];
  const paperColors = ["象牙白 (Ivory)", "米色 (Beige)", "淡黄 (Light Yellow)", "灰色 (Gray)"];

  const handleInkIntensityChange = (value: number[]) => {
    onChange({ ...parameters, inkIntensity: value[0] });
  };

  const handleCompositionChange = (value: string) => {
    onChange({ ...parameters, composition: value as CompositionType });
  };

  const handlePaperColorChange = (value: string) => {
    onChange({ ...parameters, paperColor: value });
  };

  const handleSeasonChange = (value: string) => {
    onChange({ ...parameters, seasonalFeature: value as SeasonType });
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-heading text-chinese-red">绘画参数 (Parameters)</h3>
      
      <div className="space-y-2">
        <div className="flex justify-between">
          <Label htmlFor="ink-intensity" className="font-heading">墨色浓淡 (Ink Intensity)</Label>
          <span className="text-chinese-black/70">{parameters.inkIntensity}/10</span>
        </div>
        <Slider 
          id="ink-intensity"
          min={1} 
          max={10} 
          step={1} 
          value={[parameters.inkIntensity]} 
          onValueChange={handleInkIntensityChange}
          className="cursor-pointer"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <Label htmlFor="composition" className="font-heading">构图方式 (Composition)</Label>
          <Select value={parameters.composition} onValueChange={handleCompositionChange}>
            <SelectTrigger id="composition" className="chinese-input">
              <SelectValue placeholder="选择构图方式" />
            </SelectTrigger>
            <SelectContent>
              {compositions.map(comp => (
                <SelectItem key={comp} value={comp}>
                  <span className="font-heading">{translateComposition(comp)}</span>
                  <span className="text-sm text-chinese-black/70 block">{comp}</span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="paper-color" className="font-heading">纸色 (Paper Color)</Label>
          <Select value={parameters.paperColor} onValueChange={handlePaperColorChange}>
            <SelectTrigger id="paper-color" className="chinese-input">
              <SelectValue placeholder="选择纸色" />
            </SelectTrigger>
            <SelectContent>
              {paperColors.map(color => (
                <SelectItem key={color} value={color}>
                  {color}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="season" className="font-heading">季节特性 (Season)</Label>
          <Select value={parameters.seasonalFeature} onValueChange={handleSeasonChange}>
            <SelectTrigger id="season" className="chinese-input">
              <SelectValue placeholder="选择季节" />
            </SelectTrigger>
            <SelectContent>
              {seasons.map(season => (
                <SelectItem key={season} value={season}>
                  <span className="font-heading">{translateSeason(season)}</span>
                  <span className="text-sm text-chinese-black/70 block">{season}</span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default ParameterControls;
