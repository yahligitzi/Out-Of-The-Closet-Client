export interface UploadPhotosProps {
  photos?: File[];
  onPhotosChange: (photos: File[]) => void;
}
