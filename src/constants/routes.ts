import { JSX } from "@emotion/react/jsx-runtime";
import { UploadPhotos } from "../pages/uploadPhotos/uploadPhotos";
import SignIn from "../pages/SignIn/SignIn";
import SignUp from "../pages/SignIn/SignUp";

export interface RouteType {
  path: string;
  name?: string;
  element: () => JSX.Element;
}

export const ROUTES: RouteType[] = [
  {
    path: "/", //TODO: Later change to upload-photos
    name: "העלאת תמונות",
    element: UploadPhotos,
  },
  {
    path: "/signin",
    name: "כניסה",
    element: SignIn,
  },
  {
    path: "/signup",
    name: "הרשמה",
    element: SignUp,
  },
];

export const PATHS = {
  UPLOAD_PHOTOS: "/upload-photos",
};
