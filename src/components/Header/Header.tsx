import { Logout } from "@mui/icons-material";
import { Avatar, IconButton } from "@mui/material";
import styles from "./header.style";
import { removeAuthHeader } from "../../services/axiosInstance";
import { useUser } from "../../contexts/UserContext";
import { PATHS } from "../../constants/routes";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { setUser } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    removeAuthHeader();
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <div style={styles.headerLine}>
      <Avatar
        src={"logo.jpg"}
        onClick={() => navigate(PATHS.MAIN)}
        sx={styles.logo}
      />
      <IconButton onClick={handleLogout} sx={styles.logoutBtn}>
        <Logout />
      </IconButton>
    </div>
  );
};

export default Header;
