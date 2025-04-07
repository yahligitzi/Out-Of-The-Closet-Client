import styles from "./App.style";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  redirect,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Box } from "@mui/material";
import { PATHS, ROUTES, RouteType } from "./constants/routes";
import { useEffect } from "react";
import { useUser } from "./contexts/UserContext";
import { validateUserToken } from "./services/user.service";
import { addAuthHeader, removeAuthHeader } from "./services/axiosInstance";

const App = () => {
  const { user, setUser } = useUser();

  useEffect(() => {
    const verifyUser = async () => {
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
    };

    verifyUser();
  }, []);

  const isPathAuthenticated = async (isPublicRoute?: boolean) => {
    const token = localStorage.getItem("token");

    if (isPublicRoute || !!token) return null;

    throw redirect(PATHS.SIGN_IN);
  };

  return (
    <Box sx={styles.root}>
      <RouterProvider
        router={createBrowserRouter(
          createRoutesFromElements(
            <Route path="/">
              {ROUTES.map(
                ({ path, element: Component, isPublicRoute }: RouteType) => (
                  <Route
                    key={path}
                    path={path}
                    element={<Component />}
                    loader={() => isPathAuthenticated(isPublicRoute)}
                  />
                )
              )}
              <Route
                path="*"
                element={<Navigate to={PATHS.SIGN_IN} replace={true} />}
              />
            </Route>
          )
        )}
      />
    </Box>
  );
};

export default App;
