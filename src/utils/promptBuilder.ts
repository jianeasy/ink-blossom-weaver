
import { ChinesePaintingOptions, translateStyle, translateSubject, translateComposition, translateSeason } from "../types/ChinesePainting";

export const buildChinesePaintingPrompt = (options: ChinesePaintingOptions): string => {
  const { style, subject, parameters } = options;
  const { inkIntensity, composition, paperColor, seasonalFeature } = parameters;
  
  // Base prompt structure
  let prompt = `Traditional Chinese painting (国画) in ${translateStyle(style)} style, `;
  prompt += `depicting ${translateSubject(subject)}, `;
  prompt += `with ${translateComposition(composition)} composition, `;
  prompt += `${translateSeason(seasonalFeature)} season, `;
  
  // Add ink intensity description
  if (inkIntensity <= 3) {
    prompt += "with light and delicate ink wash, ";
  } else if (inkIntensity <= 7) {
    prompt += "with balanced ink tones, ";
  } else {
    prompt += "with bold and deep ink strokes, ";
  }
  
  // Add paper color
  prompt += `on ${paperColor} paper background, `;
  
  // Add style-specific details
  switch (style) {
    case "gongbi":
      prompt += "detailed and precise brushwork with fine lines, meticulous detail, ";
      break;
    case "xieyi":
      prompt += "free and expressive brushwork, capturing the essence rather than appearance, ";
      break;
    case "shuimo":
      prompt += "monochromatic ink wash painting with varying tones of black, ";
      break;
    case "mogu":
      prompt += "boneless technique with color washes and without ink outlines, ";
      break;
    case "lingnan":
      prompt += "vibrant colors blended with Western techniques, bold and innovative, ";
      break;
    case "zhongyuan":
      prompt += "traditional central plains style, classical and balanced, ";
      break;
  }
  
  // Add subject-specific details
  switch (subject) {
    case "landscape":
      prompt += "with mountains, water, mist, and small pavilions in distance, ";
      break;
    case "flower_bird":
      prompt += "with elegant flowers and birds in harmonious composition, ";
      break;
    case "people":
      prompt += "with traditional Chinese figures in classical poses and attire, ";
      break;
    case "animal":
      prompt += "with animals portrayed in traditional Chinese artistic manner, ";
      break;
    case "bamboo":
      prompt += "with bamboo stalks and leaves showing strength and flexibility, ";
      break;
    case "plum_blossom":
      prompt += "with plum blossoms symbolizing resilience and hope, ";
      break;
    case "orchid":
      prompt += "with orchids representing nobility and elegance, ";
      break;
    case "chrysanthemum":
      prompt += "with chrysanthemums symbolizing integrity and longevity, ";
      break;
  }
  
  // Add seasonal elements
  switch (seasonalFeature) {
    case "spring":
      prompt += "with signs of new life, light green hues, and blossoms, ";
      break;
    case "summer":
      prompt += "with lush vegetation, vibrant greens, and clear skies, ";
      break;
    case "autumn":
      prompt += "with red and golden leaves, harvest scenes, and misty atmosphere, ";
      break;
    case "winter":
      prompt += "with snow-covered landscapes, bare trees, and serene stillness, ";
      break;
  }
  
  // Add traditional Chinese painting aesthetic keywords
  prompt += "classical Chinese art, elegant, harmonious, poetic, balanced composition, ";
  prompt += "traditional brushwork, cultural authenticity, philosophical depth";
  
  return prompt;
};
