import {
  Box,
  Paper,
  Button,
  TextField,
  Typography,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { useMemo, useState } from "react";
import { PATHS } from "../../constants/routes";
import { Add, Close } from "@mui/icons-material";
import styles from "../entranceQuiz/entranceQuiz.style";
import itemsService from "../../services/items.service";
import { useLocation, useNavigate } from "react-router-dom";
import { UploadPhotos } from "../entranceQuiz/components/uploadPhotos/uploadPhotos";
import { useSnackbar } from "../../contexts/SnackbarContext";

interface AddUrlImageProps {
  value: string;
  onChange: (value: string) => void;
  onAdd?: () => void;
  onRemove?: () => void;
}

const AddUrlImage = ({
  value,
  onChange,
  onAdd,
  onRemove,
}: AddUrlImageProps) => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      gap: 1,
      marginTop: 2,
    }}
  >
    <TextField
      fullWidth
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Enter image URL"
    />
    {onAdd && (
      <IconButton disabled={!value} onClick={onAdd}>
        <Add />
      </IconButton>
    )}
    {onRemove && (
      <IconButton onClick={onRemove}>
        <Close />
      </IconButton>
    )}
  </Box>
);

const UploadUserItems = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [photos, setPhotos] = useState<File[]>();
  const [siteUrls, setSiteUrls] = useState<string[]>([""]);
  const location = useLocation();
  const { setSnackbar } = useSnackbar();

  const navigate = useNavigate();

  const uploadFromLocal = useMemo(() => location?.state?.isLocal, [location]);

  return (
    <Box sx={styles.root}>
      <Paper elevation={0} sx={styles.paper}>
        <Typography variant="h4" component="h1" sx={styles.title}>
          Upload Photos
        </Typography>

        {!uploadFromLocal ? (
          <>
            {siteUrls.map((url, index) => (
              <AddUrlImage
                key={index}
                value={url}
                onChange={(value) => {
                  const updated = [...siteUrls];
                  updated[index] = value;
                  setSiteUrls(updated);
                }}
                onAdd={
                  index === siteUrls.length - 1
                    ? () => setSiteUrls([...siteUrls, ""])
                    : undefined
                }
                onRemove={
                  siteUrls.length > 1 && index !== siteUrls.length - 1
                    ? () => {
                        const updated = siteUrls.filter((_, i) => i !== index);
                        setSiteUrls(updated);
                      }
                    : undefined
                }
              />
            ))}
          </>
        ) : (
          <Box sx={styles.content}>
            <UploadPhotos
              photos={photos}
              onPhotosChange={(newPhotos) => setPhotos(newPhotos)}
            />
          </Box>
        )}

        <Button
          disabled={
            uploadFromLocal
              ? !photos?.length || isSubmitting
              : (siteUrls.length == 1 && siteUrls[0] == "") || isSubmitting
          }
          onClick={async () => {
            setIsSubmitting(true);
            try {
              if (uploadFromLocal) {
                const formData = new FormData();

                photos?.forEach((photo) => {
                  formData.append(`images`, photo);
                });

                await itemsService.addItems(formData);
              } else {
                await itemsService.addItemsByUrl(
                  siteUrls.filter((url) => url !== "")
                );
              }

              setSnackbar({
                open: true,
                message: "Your items have been uploaded successfully",
                severity: "success",
              });
            } catch (err) {
              setIsSubmitting(false);
              setSnackbar({
                open: true,
                message: `Oops!
                   some of your items could have not been classified. try uploading a more specific image`,
                severity: "error",
              });
            } finally {
              navigate(PATHS.MAIN);
            }
          }}
          variant="contained"
          sx={styles.navigationButton}
          startIcon={isSubmitting ? <CircularProgress size={20} /> : null}
        >
          Submit
        </Button>
      </Paper>
    </Box>
  );
};

export default UploadUserItems;
