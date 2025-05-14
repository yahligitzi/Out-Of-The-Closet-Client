import { Gender } from "../GenderSelection/genderSelection.consts";
import { StyleOptionAnswer } from "./stylePreferences.types";

export const STYLE_OPTIONS = (
  gender: Gender = "female"
): StyleOptionAnswer[] => [
  {
    value: "sporty",
    label: "Sporty",
    description: "Athletic and comfortable, perfect for an active lifestyle",
    imageUrl: `src/images/styles/${gender}/sporty.jpg`,
  },
  {
    value: "elegant",
    label: "Elegant",
    description: "Sophisticated and polished, ideal for formal occasions",
    imageUrl: `src/images/styles/${gender}/elegant.jpg`,
  },
  {
    value: "casual",
    label: "Casual",
    description: "Relaxed and effortless, great for everyday wear",
    imageUrl: `src/images/styles/${gender}/casual.jpg`,
  },
  {
    value: "vintage",
    label: "Vintage",
    description: "Classic and timeless, inspired by past decades",
    imageUrl: `src/images/styles/${gender}/vintage.jpg`,
  },
];
