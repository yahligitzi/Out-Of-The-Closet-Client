import { createContext, useContext, useState } from "react";
import { Alert, Snackbar } from "@mui/material";

interface SnackbarState {
  open: boolean;
  message?: string;
  severity?: "success" | "error";
}

interface SnackbarType {
  snackbar: SnackbarState;
  setSnackbar: React.Dispatch<React.SetStateAction<SnackbarState>>;
}

const SnackbarContext = createContext<SnackbarType | null>(null);

type SnackbarContextProvider = {
  children: React.ReactNode;
};

export const SnackbarContextProvider = ({
  children,
}: SnackbarContextProvider) => {
  const [snackbar, setSnackbar] = useState<SnackbarState>({ open: false });

  return (
    <SnackbarContext.Provider value={{ snackbar, setSnackbar }}>
      {children}
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
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);

  if (!context) {
    throw new Error("use snackbar must be used within an snackbar provider");
  }

  return context;
};
