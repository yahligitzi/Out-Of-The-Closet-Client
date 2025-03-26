import { JSX } from "@emotion/react/jsx-runtime";
import { UploadPhotos } from "../pages/uploadPhotos/uploadPhotos";

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
];

export const PATHS = {
  UPLOAD_PHOTOS: "/upload-photos",
};
