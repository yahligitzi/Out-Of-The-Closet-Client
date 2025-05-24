import { Gender } from "../pages/entranceQuiz/components/GenderSelection/genderSelection.consts";
import { SkinToneValue } from "../pages/entranceQuiz/components/SkinTone/skinTone.consts";
import { StyleOption } from "../pages/entranceQuiz/components/StylePreferences/stylePreferences.types";

export type User = {
  username: string;
  email: string;
  id: string;
  gender?: Gender;
  preferredStyle?: StyleOption;
  waistSize?: number;
  bustSize?: number;
  hipsSize?: number;
  height?: number;
  skinTone?: SkinToneValue;
};

export type CreateUserDto = Omit<User, "id"> & { password: string };

export type CreateUserResDto = User & { token: string };
