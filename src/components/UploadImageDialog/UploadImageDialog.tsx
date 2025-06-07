import { Box, Dialog, DialogTitle, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { styles } from "./UploadImageDialog.style";
import { PATHS } from "../../constants/routes";

const UploadImageDialog = ({
  setIsPopupOpen,
  isPopupOpen,
}: {
  setIsPopupOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isPopupOpen: boolean;
}) => {
  const navigate = useNavigate();

  return (
    <Dialog onClose={() => setIsPopupOpen(false)} open={isPopupOpen}>
      <DialogTitle sx={styles.uploadImageTitle}>Upload image form</DialogTitle>
      <Box sx={styles.dialogBox}>
        <Box
          sx={styles.dialogOptionBox}
          onClick={() =>
            navigate(PATHS.UPLOAD_PHOTOS, {
              state: { isLocal: true },
            })
          }
        >
          <Typography sx={styles.dialogOptionsTitle}>Local device</Typography>
          <Typography sx={styles.dialogOptionsBody}>
            select photos from camera roll
          </Typography>
        </Box>
        <Box
          sx={styles.dialogOptionBox}
          onClick={() => navigate(PATHS.UPLOAD_PHOTOS)}
        >
          <Typography sx={styles.dialogOptionsTitle}>By url</Typography>
          <Typography sx={styles.dialogOptionsBody}>
            insert the item url directly from the site for easy and quick upload
          </Typography>
        </Box>
      </Box>
    </Dialog>
  );
};

export default UploadImageDialog;
