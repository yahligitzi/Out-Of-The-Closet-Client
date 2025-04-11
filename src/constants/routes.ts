import { JSX } from "@emotion/react/jsx-runtime";
import { UploadPhotos } from "../pages/uploadPhotos/uploadPhotos";
import { SearchPage } from "../pages/mainPage/mainPage";

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
    path: "/search",
    name: "חיפוש",
    element: SearchPage,
  },
];

export const PATHS = {
  UPLOAD_PHOTOS: "/upload-photos",
};
