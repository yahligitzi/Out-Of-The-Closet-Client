import { SkinToneValue } from "./skinTone.consts";

export interface SkinToneProps {
  selectedTone?: SkinToneValue;
  onSelect: (tone: SkinToneValue) => void;
}
