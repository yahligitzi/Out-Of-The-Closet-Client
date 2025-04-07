import { JSX } from "@emotion/react/jsx-runtime";
import { UploadPhotos } from "../pages/uploadPhotos/uploadPhotos";
import SignIn from "../pages/SignPage/SignIn";
import SignUp from "../pages/SignPage/SignUp";

export interface RouteType {
  path: string;
  name?: string;
  isPublicRoute?: boolean;
  element: () => JSX.Element;
}

export const PATHS = {
  UPLOAD_PHOTOS: "/upload-photos",
  SIGN_IN: "/signin",
  SIGN_UP: "/signup",
};

export const ROUTES: RouteType[] = [
  {
    path: PATHS.UPLOAD_PHOTOS,
    name: "העלאת תמונות",
    element: UploadPhotos,
    isPublicRoute: false,
  },
  {
    path: PATHS.SIGN_IN,
    name: "כניסה",
    element: SignIn,
    isPublicRoute: true,
  },
  {
    path: PATHS.SIGN_UP,
    name: "הרשמה",
    element: SignUp,
    isPublicRoute: true,
  },
];
