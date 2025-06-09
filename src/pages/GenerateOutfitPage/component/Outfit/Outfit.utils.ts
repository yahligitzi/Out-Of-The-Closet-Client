import { BufferFromServer } from "./outfit.types";

export const BufferToImageUrl = (buffer: BufferFromServer) => {
  const byteArray = new Uint8Array(buffer.data);
  const blob = new Blob([byteArray], { type: "image/png" });
  return URL.createObjectURL(blob);
};
