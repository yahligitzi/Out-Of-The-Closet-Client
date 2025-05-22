import { Gender } from "../GenderSelection/genderSelection.consts";

export type StyleOption = "sporty" | "elegant" | "casual" | "vintage";

export interface StylePreferencesProps {
  selectedStyle?: StyleOption;
  gender?: Gender;
  onSelect: (style: StyleOption) => void;
}

export interface StyleOptionAnswer {
  value: StyleOption;
  label: string;
  description: string;
  imageUrl: string;
}
