import styles from "./mainPage.style";
import {
  Alert,
  Box,
  IconButton,
  Paper,
  Snackbar,
  Typography,
} from "@mui/material";
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import chatBotService from "../../services/chatBot.service";
import { useState } from "react";
import { SnackbarState } from "../uploadPhotos/uploadPhotos.types";

export const SearchPage = () => {
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    open: false,
  });
  // ToDo: add a dialog before to pick an item to make an outfit from 
  const handleGenerateClicked = () => {
    chatBotService
      .generateOutFit()
      .then(() => {
        // Todo: what to do with the outfit
      })
      .catch(() => {
        setSnackbar(() => ({
          open: true,
          message: "Error generating an outfit",
          severity: "error",
        }));
      })
  }

  return (
    <Box sx={styles.root}>
      <Paper elevation={0} sx={styles.paper}>
        <Typography variant="h4" component="h1" sx={styles.title}>
          my closet
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          search and generate your ootd
        </Typography>
        <IconButton sx={styles.icon} onClick={handleGenerateClicked}>
          <AutoAwesomeIcon />
        </IconButton>
      </Paper>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ open: false })}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};
