import { JSX } from "@emotion/react/jsx-runtime";
import SignIn from "../pages/SignPage/SignIn";
import SignUp from "../pages/SignPage/SignUp";
import MainPage from "../pages/MainPage";
import { EntranceQuiz } from "../pages/entranceQuiz/EntranceQuiz";
import UploadUserItems from "../pages/UploadPhotos/UploadUserItems";
import GenerateOutfitPage from "../pages/GenerateOutfitPage/GenerateOutfitPage";

export interface RouteType {
  path: string;
  name?: string;
  element: () => JSX.Element;
}

export const PATHS = {
  SIGN_IN: "/signin",
  SIGN_UP: "/signup",
  ENTRANCE_QUIZ: "/entrance-quiz",
  MAIN: "/main",
  UPLOAD_PHOTOS: "/upload-photos",
  GENERATE_OUTFIT: "/generate-outfit",
};

export const PUBLIC_ROUTES: RouteType[] = [
  {
    path: PATHS.SIGN_IN,
    name: "כניסה",
    element: SignIn,
  },
  {
    path: PATHS.SIGN_UP,
    name: "הרשמה",
    element: SignUp,
  },
];

export const PRIVATE_ROUTES: RouteType[] = [
  {
    path: PATHS.ENTRANCE_QUIZ,
    name: "Entrance Quiz",
    element: EntranceQuiz,
  },
  {
    path: PATHS.MAIN,
    name: "עמוד ראשי",
    element: MainPage,
  },
  {
    path: PATHS.UPLOAD_PHOTOS,
    name: "העלאת תמונות",
    element: UploadUserItems,
  },
  {
    path: PATHS.GENERATE_OUTFIT,
    name: "יצירת תלבושת",
    element: GenerateOutfitPage,
  },
];
