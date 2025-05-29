import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "../../contexts/SnackbarContext";
import { PATHS } from "../../constants/routes";
import { loginExistingUser } from "../../services/user.service";
import SignPageWrapper from "./SignPageWrapper";
import styles from "./SignPage.style";
import { MAX_USERNAME_LENGTH, MAX_PASSWORD_LENGTH } from "./SignIn.consts";
import { useUser } from "../../contexts/UserContext";
import { addAuthHeader } from "../../services/axiosInstance";

const SignIn = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { setSnackbar } = useSnackbar();
  const { user, setUser } = useUser();

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate(!user.gender ? PATHS.ENTRANCE_QUIZ : PATHS.MAIN);
    }
  }, [user]);

  const isAbleToSignIn = username.trim().length && password.trim().length;

  const handleSignIn = async () => {
    try {
      const { data } = await loginExistingUser(username, password);

      if (data) {
        const { token, ...user } = data;
        setSnackbar({
          open: true,
          message: "User signed in successfully",
          severity: "success",
        });
        localStorage.setItem("token", token);
        addAuthHeader(token);
        setUser(user);
      } else
        setSnackbar({
          open: true,
          message: "One or more details are incorrect",
          severity: "error",
        });
    } catch (error) {
      setSnackbar({
        open: true,
        message: "An error occurred while trying to login",
        severity: "error",
      });
    }
  };

  return (
    <SignPageWrapper>
      <TextField
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        label="username"
        slotProps={{
          inputLabel: {
            shrink: true,
          },
          htmlInput: { maxLength: MAX_USERNAME_LENGTH },
        }}
      />
      <TextField
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        label="password"
        slotProps={{
          inputLabel: {
            shrink: true,
          },
          htmlInput: { maxLength: MAX_PASSWORD_LENGTH },
        }}
        type="password"
      />
      <Button
        variant="outlined"
        sx={styles.buttonText}
        onClick={handleSignIn}
        disabled={!isAbleToSignIn}
      >
        Sign In
      </Button>
      <Divider>Or</Divider>
      <Box sx={styles.switchModeContainer}>
        <Typography>Create an account</Typography>
        <Button onClick={() => navigate(PATHS.SIGN_UP)} sx={styles.buttonText}>
          Sign Up
        </Button>
      </Box>
    </SignPageWrapper>
  );
};

export default SignIn;
