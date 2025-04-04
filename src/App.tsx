import styles from "./App.style";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { Box } from "@mui/material";
import { PATHS, ROUTES, RouteType } from "./constants/routes";
import { useEffect } from "react";
import { useUser } from "./contexts/UserContext";
import { validateUserToken } from "./services/user.service";

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, setUser } = useUser();

  useEffect(() => {
    const verifyUser = async () => {
      let isUserSigned = !!user;
      const token = localStorage.getItem("token");

      const isLoginPath = [PATHS.SIGN_IN, PATHS.SIGN_UP].includes(
        location.pathname
      );

      if (!user && token) {
        try {
          const { data } = await validateUserToken(token);
          setUser(data);
          isUserSigned = true;
        } catch (e) {
          console.error(e);
        }
      }

      if (isUserSigned && isLoginPath) navigate(PATHS.UPLOAD_PHOTOS);
      if (!isUserSigned && !isLoginPath) navigate(PATHS.SIGN_IN);
    };

    verifyUser();
  }, [location]);

  return (
    <Box sx={styles.root}>
      <Routes>
        {ROUTES.map(({ path, element: Component }: RouteType) => (
          <Route key={path} path={path} element={<Component />} />
        ))}
        <Route
          path="*"
          element={<Navigate to={PATHS.SIGN_UP} replace={true} />}
        />
      </Routes>
    </Box>
  );
};

export default App;
