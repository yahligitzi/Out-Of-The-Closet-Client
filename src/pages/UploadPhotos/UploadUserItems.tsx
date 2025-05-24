import {
  Box,
  Button,
  CircularProgress,
  Paper,
  Typography,
} from "@mui/material";
import styles from "../entranceQuiz/entranceQuiz.style";
import { useState } from "react";
import { UploadPhotos } from "../entranceQuiz/components/uploadPhotos/uploadPhotos";
import itemsService from "../../services/items.service";
import { PATHS } from "../../constants/routes";
import { useNavigate } from "react-router-dom";

const UploadUserItems = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [photos, setPhotos] = useState<File[]>();

  const navigate = useNavigate();

  return (
    <Box sx={styles.root}>
      <Paper elevation={0} sx={styles.paper}>
        <Typography variant="h4" component="h1" sx={styles.title}>
          Upload Photos
        </Typography>

        <Box sx={styles.content}>
          <UploadPhotos
            photos={photos}
            onPhotosChange={(newPhotos) => setPhotos(newPhotos)}
          />
        </Box>

        <Button
          disabled={!photos?.length || isSubmitting}
          onClick={async () => {
            setIsSubmitting(true);
            const formData = new FormData();

            photos?.forEach((photo) => {
              formData.append(`images`, photo);
            });

            await itemsService.addItems(formData);
            navigate(PATHS.MAIN);
          }}
          variant="contained"
          sx={styles.navigationButton}
          startIcon={isSubmitting ? <CircularProgress size={20} /> : null}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </Paper>
    </Box>
  );
};

export default UploadUserItems;
