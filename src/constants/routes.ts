import { JSX } from "@emotion/react/jsx-runtime";
import { UploadPhotos } from "../pages/uploadPhotos/uploadPhotos";
import SignIn from "../pages/SignPage/SignIn";
import SignUp from "../pages/SignPage/SignUp";

export interface RouteType {
  path: string;
  name?: string;
  element: () => JSX.Element;
}

export const PATHS = {
  UPLOAD_PHOTOS: "/upload-photos",
  SIGN_IN: "/signin",
  SIGN_UP: "/signup",
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
    path: PATHS.UPLOAD_PHOTOS,
    name: "העלאת תמונות",
    element: UploadPhotos,
  },
];
