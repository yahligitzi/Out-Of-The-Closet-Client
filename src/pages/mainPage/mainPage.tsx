import styles from "./mainPage.style";
import {
  Alert,
  Box,
  IconButton,
  Paper,
  Snackbar,
  Typography,
} from "@mui/material";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import itemsService from "../../services/items.service";
import { useSnackbar } from "../../contexts/SnackbarContext";
import { useState } from "react";
import { JSX } from "@emotion/react/jsx-runtime";

export const SearchPage = () => {
  const { setSnackbar, snackbar } = useSnackbar();
  const [items, setItems] = useState<JSX.Element[]>();

  // ToDo: add a dialog before to pick an item to make an outfit from
  const handleGenerateClicked = () => {
    itemsService
      .generateOutFit()
      .then(({ items }) => {
        const outfit: JSX.Element[] = items.map((item) => {
          return <img src={item} alt="outfit" />;
        });

        setItems(outfit);
      })
      .catch(() => {
        setSnackbar(() => ({
          open: true,
          message: "Error generating an outfit",
          severity: "error",
        }));
      });
  };

  return (
    <Box sx={styles.root}>
      <Paper elevation={0} sx={styles.paper}>
        <Typography variant="h4" component="h1" sx={styles.title}>
          My Closet
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Generate your outfit
        </Typography>
        <IconButton sx={styles.icon} onClick={handleGenerateClicked}>
          <AutoAwesomeIcon color={"primary"} />
        </IconButton>
        {items?.length !== 0 && (
          <Box sx={{ display: "flex", flexDirection: "column" }}>{items}</Box>
        )}
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
