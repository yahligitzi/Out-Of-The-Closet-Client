import { Gender } from "./components/GenderSelection/genderSelection.consts";
import { MeasurementOptions } from "./components/Measurements/measurements.types";
import { SkinToneValue } from "./components/SkinTone/skinTone.consts";
import { StyleOption } from "./components/StylePreferences/stylePreferences.types";

export interface QuizData {
  gender?: Gender;
  measurements?: Partial<MeasurementOptions>;
  preferredStyle?: StyleOption;
  skinTone?: SkinToneValue;
  photos?: File[];
}

export type QuizStepId = keyof QuizData;

export interface QuizStep {
  title: string;
  id: QuizStepId;
  subtitle: string;
  component: React.ReactNode;
  isRequired?: boolean;
}
