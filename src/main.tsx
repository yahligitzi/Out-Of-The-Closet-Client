import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { SnackbarContextProvider } from "./contexts/SnackbarContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SnackbarContextProvider>
      <App />
    </SnackbarContextProvider>
  </StrictMode>
);
