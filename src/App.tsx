import styles from "./App.style";
import { Route, Routes } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import {
  PRIVATE_ROUTES,
  PUBLIC_ROUTES,
  ROUTES,
  RouteType,
} from "./constants/routes";
import { useEffect, useState } from "react";
import { useUser } from "./contexts/UserContext";
import { validateUserToken } from "./services/user.service";
import { addAuthHeader, removeAuthHeader } from "./services/axiosInstance";
import PrivateRoutes from "./routes/PrivateRoutes";

const App = () => {
  const [isLoadingUser, setIsLoadingUser] = useState<boolean>(true);
  const { user, setUser } = useUser();

  useEffect(() => {
    const verifyUser = async () => {
      setIsLoadingUser(true);
      const token = localStorage.getItem("token");

      if (!user && token) {
        try {
          addAuthHeader(token);
          const { data } = await validateUserToken();

          setUser(data);
        } catch (e) {
          removeAuthHeader();
          localStorage.removeItem("token");
          console.error(e);
        }
      }

      setIsLoadingUser(false);
    };

    verifyUser();
  }, []);

  return (
    <Box sx={styles.root}>
      {isLoadingUser ? (
        <CircularProgress sx={styles.loader} />
      ) : (
        <Routes>
          <Route element={<PrivateRoutes />}>
            {PRIVATE_ROUTES.map(({ path, element: Component }: RouteType) => (
              <Route key={path} path={path} element={<Component />} />
            ))}
          </Route>

          {PUBLIC_ROUTES.map(({ path, element: Component }: RouteType) => (
            <Route key={path} path={path} element={<Component />} />
          ))}
        </Routes>
      )}
    </Box>
  );
};

export default App;
