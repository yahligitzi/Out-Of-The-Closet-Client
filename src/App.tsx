import styles from "./App.style";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Box } from "@mui/material";
import { ROUTES, RouteType } from "./constants/routes";

function App() {
  return (
    <Box sx={styles.root}>
      <Router>
        <Routes>
          {ROUTES.map(({ path, element: Component }: RouteType) => (
            <Route key={path} path={path} element={<Component />} />
          ))}
        </Routes>
      </Router>
    </Box>
  );
}

export default App;
