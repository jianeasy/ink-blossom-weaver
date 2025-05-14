
export interface ChinesePaintingOptions {
  style: PaintingStyle;
  subject: PaintingSubject;
  customSubject?: string;
  parameters: PaintingParameters;
}

export type PaintingStyle = 
  | "gongbi" // 工笔画
  | "xieyi" // 写意画
  | "shuimo" // 水墨画
  | "mogu" // 没骨画
  | "lingnan" // 岭南画派
  | "zhongyuan"; // 中原画派

export type PaintingSubject =
  | "landscape" // 山水画
  | "flower_bird" // 花鸟画
  | "people" // 人物画
  | "animal" // 动物画
  | "bamboo" // 竹子
  | "plum_blossom" // 梅花
  | "orchid" // 兰花
  | "chrysanthemum"; // 菊花

export interface PaintingParameters {
  inkIntensity: number; // 墨色浓淡 (1-10)
  composition: CompositionType; // 构图方式
  paperColor: string; // 纸色
  seasonalFeature: SeasonType; // 季节特性
}

export type CompositionType =
  | "vertical" // 纵式构图
  | "horizontal" // 横式构图
  | "high_far" // 高远构图
  | "level_far" // 平远构图
  | "deep_far"; // 深远构图

export type SeasonType = "spring" | "summer" | "autumn" | "winter";

export const translateStyle = (style: PaintingStyle): string => {
  const styleMap: Record<PaintingStyle, string> = {
    gongbi: "工笔画",
    xieyi: "写意画",
    shuimo: "水墨画",
    mogu: "没骨画",
    lingnan: "岭南画派",
    zhongyuan: "中原画派"
  };
  return styleMap[style];
};

export const translateSubject = (subject: PaintingSubject): string => {
  const subjectMap: Record<PaintingSubject, string> = {
    landscape: "山水画",
    flower_bird: "花鸟画",
    people: "人物画",
    animal: "动物画",
    bamboo: "竹子",
    plum_blossom: "梅花",
    orchid: "兰花",
    chrysanthemum: "菊花"
  };
  return subjectMap[subject];
};

export const translateComposition = (composition: CompositionType): string => {
  const compositionMap: Record<CompositionType, string> = {
    vertical: "纵式构图",
    horizontal: "横式构图",
    high_far: "高远构图",
    level_far: "平远构图",
    deep_far: "深远构图"
  };
  return compositionMap[composition];
};

export const translateSeason = (season: SeasonType): string => {
  const seasonMap: Record<SeasonType, string> = {
    spring: "春",
    summer: "夏",
    autumn: "秋",
    winter: "冬"
  };
  return seasonMap[season];
};
