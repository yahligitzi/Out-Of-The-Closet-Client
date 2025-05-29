import styles from "./uploadPhotos.style";
import { Box, Button, IconButton, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import UploadIcon from "@mui/icons-material/Upload";
import ImageIcon from "@mui/icons-material/Image";
import CloseIcon from "@mui/icons-material/Close";
import { ChangeEvent, FC } from "react";
import { UPLOAD_PHOTOS_COUNT } from "./uploadPhotos.consts";
import { UploadPhotosProps } from "./uploadPhotos.types";

export const UploadPhotos: FC<UploadPhotosProps> = ({
  photos,
  onPhotosChange,
  text,
}) => {
  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);
    const newFiles = files.slice(
      0,
      UPLOAD_PHOTOS_COUNT - (photos?.length ?? 0)
    );
    onPhotosChange([...(photos ?? []), ...newFiles]);
    event.target.value = "";
  };

  const handleRemovePhoto = (indexToRemove: number) => {
    onPhotosChange(photos?.filter((_, index) => index !== indexToRemove) ?? []);
  };

  const isDisabled = (photos?.length ?? 0) >= UPLOAD_PHOTOS_COUNT;

  return (
    <Box sx={styles.container}>
      <Typography variant="body1" sx={styles.description}>
        Please upload {UPLOAD_PHOTOS_COUNT} photos of your favorite items in
        your closet
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={styles.subtitle}>
        {text}
      </Typography>

      <Button
        variant="contained"
        component="label"
        startIcon={<UploadIcon />}
        sx={styles.uploadButton}
        disabled={isDisabled}
      >
        upload
        <input
          type="file"
          multiple
          accept="image/*"
          hidden
          onChange={handleFileSelect}
          disabled={isDisabled}
        />
      </Button>

      <Box mt={3} sx={styles.imagesContainer}>
        <Grid container spacing={2}>
          {(photos?.length ?? 0) > 0 ? (
            photos?.map((file, index) => (
              <Grid size={4} key={index}>
                <Box
                  sx={{
                    ...styles.previewContainer,
                    backgroundImage: `url(${URL.createObjectURL(file)})`,
                  }}
                >
                  <IconButton
                    size="small"
                    onClick={() => handleRemovePhoto(index)}
                    sx={styles.removeButton}
                  >
                    <CloseIcon />
                  </IconButton>
                </Box>
              </Grid>
            ))
          ) : (
            <Grid size={12}>
              <Box sx={styles.placeholderBox}>
                <IconButton disabled sx={styles.imagesPlaceholder}>
                  <ImageIcon fontSize="inherit" />
                </IconButton>
              </Box>
            </Grid>
          )}
        </Grid>
      </Box>
    </Box>
  );
};
