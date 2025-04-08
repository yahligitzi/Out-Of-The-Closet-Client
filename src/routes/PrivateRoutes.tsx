import { Navigate, Outlet } from "react-router-dom";
import { PATHS } from "../constants/routes";
import { useUser } from "../contexts/UserContext";

const PrivateRoutes = () => {
  const { user } = useUser();

  return user ? <Outlet /> : <Navigate to={PATHS.SIGN_IN} />;
};

export default PrivateRoutes;
