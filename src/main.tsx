import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { SnackbarContextProvider } from "./contexts/SnackbarContext.tsx";
import { UserContextProvider } from "./contexts/UserContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SnackbarContextProvider>
      <UserContextProvider>
        <App />
      </UserContextProvider>
    </SnackbarContextProvider>
  </StrictMode>
);
