import { Gender } from "./genderSelection.consts";

export interface SkinToneProps {
  selectedTone: string;
  onSelect: (tone: string) => void;
}

export interface GenderAnswer {
  value: Gender;
  label: string;
  icon: React.ReactNode;
}

export interface GenderSelectionProps {
  selectedGender?: string;
  onSelect: (gender: Gender) => void;
}
