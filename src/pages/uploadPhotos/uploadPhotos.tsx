import styles from "./uploadPhotos.style";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import UploadIcon from "@mui/icons-material/Upload";
import ImageIcon from "@mui/icons-material/Image";
import { ChangeEvent, useState } from "react";
import { UPLOAD_PHOTOS_COUNT } from "./uploadPhotos.consts";
import { useSnackbar } from "../../contexts/SnackbarContext";
import userItemsService from "../../services/userItems.service";

export const UploadPhotos = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { setSnackbar } = useSnackbar();

  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);
    const newFiles = files.slice(0, UPLOAD_PHOTOS_COUNT - selectedFiles.length);
    setSelectedFiles((prev) => [...prev, ...newFiles]);
    event.target.value = "";
  };

  const handleUpload = async () => {
    if (selectedFiles.length !== 0) {
      setIsLoading(true);
      const formData = new FormData();

      selectedFiles.forEach((file) => {
        formData.append("images", file);
      });

      userItemsService
        .addUserItems(formData)
        .then(() => {
          setSnackbar(() => ({
            open: true,
            message: "Files uploaded successfully!",
            severity: "success",
          }));
          setSelectedFiles([]);
        })
        .catch(() => {
          setSnackbar(() => ({
            open: true,
            message: "Error uploading files",
            severity: "error",
          }));
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  return (
    <Box sx={styles.root}>
      <Paper elevation={0} sx={styles.paper}>
        <Typography variant="h4" component="h1" sx={styles.title}>
          Entrance quiz
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          upload photos
        </Typography>

        <Box sx={styles.uploadContainer}>
          <Paper elevation={0} sx={styles.uploadBox}>
            <Typography variant="body1" component="div">
              {`please upload ${UPLOAD_PHOTOS_COUNT} photos of your favorite items in your closet`}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              these photos will help establish your new digital closet
            </Typography>

            <Button
              variant="contained"
              component="label"
              startIcon={<UploadIcon />}
              sx={styles.uploadButton}
            >
              upload
              <input
                type="file"
                multiple
                accept="image/*"
                hidden
                onChange={handleFileSelect}
                disabled={
                  selectedFiles.length >= UPLOAD_PHOTOS_COUNT || isLoading
                }
              />
            </Button>
          </Paper>
        </Box>
        <Box mt={3}>
          {isLoading ? (
            <CircularProgress />
          ) : (
            <Grid container spacing={2}>
              {selectedFiles.length > 0 ? (
                selectedFiles.map((file, index) => (
                  <Grid size={4} key={index}>
                    <Box
                      sx={{
                        ...styles.previewContainer,
                        backgroundImage: `url(${URL.createObjectURL(file)})`,
                      }}
                    />
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
          )}
        </Box>

        <Button
          fullWidth
          variant="contained"
          color="primary"
          disabled={isLoading || selectedFiles.length !== UPLOAD_PHOTOS_COUNT}
          onClick={handleUpload}
          sx={styles.uploadActionButton}
        >
          Upload photos
        </Button>
      </Paper>
    </Box>
  );
};
