import { JSX } from "@emotion/react/jsx-runtime";
import SignIn from "../pages/SignPage/SignIn";
import SignUp from "../pages/SignPage/SignUp";
import { EntranceQuiz } from "../pages/entranceQuiz/EntranceQuiz";
import { SearchPage } from "../pages/mainPage/mainPage";

export interface RouteType {
  path: string;
  name?: string;
  element: () => JSX.Element;
}

export const PATHS = {
  SIGN_IN: "/signin",
  SIGN_UP: "/signup",
  ENTRANCE_QUIZ: "/entrance-quiz",
  SEARCH: "/search",
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
    path: PATHS.SEARCH,
    name: "חיפוש",
    element: SearchPage,
  },
];
