import styles from "./App.style";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import { Box } from "@mui/material";
import { PATHS, ROUTES, RouteType } from "./constants/routes";

function App() {
  return (
    <Box sx={styles.root}>
      <Router>
        <Routes>
          {ROUTES.map(({ path, element: Component }: RouteType) => (
            <Route key={path} path={path} element={<Component />} />
          ))}
          <Route
            path="*"
            element={<Navigate to={PATHS.SIGN_UP} replace={true} />}
          />
        </Routes>
      </Router>
    </Box>
  );
}

export default App;
