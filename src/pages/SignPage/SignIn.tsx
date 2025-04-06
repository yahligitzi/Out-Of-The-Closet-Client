import { Button, Divider, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "../../contexts/SnackbarContext";
import { PATHS } from "../../constants/routes";
import { loginExistingUser } from "../../services/user.service";
import SignPageWrapper from "./SignPageWrapper";
import styles from "./SignPage.style";
import { MAX_FIELDS_LENGTH } from "./SignIn.consts";
import { useUser } from "../../contexts/UserContext";

const SignIn = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { setSnackbar } = useSnackbar();
  const { setUser } = useUser();

  const navigate = useNavigate();

  const isAbleToSave = username.trim().length && password.trim().length;

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
        setUser(user);
        navigate(PATHS.UPLOAD_PHOTOS);
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
    <SignPageWrapper title="Sign In">
      <TextField
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        label="username"
        slotProps={{
          inputLabel: {
            shrink: true,
          },
          htmlInput: { maxLength: MAX_FIELDS_LENGTH },
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
          htmlInput: { maxLength: MAX_FIELDS_LENGTH },
        }}
        type="password"
      />
      <Button
        variant="outlined"
        sx={styles.buttonText}
        onClick={handleSignIn}
        disabled={!isAbleToSave}
      >
        Sign In
      </Button>
      <Divider>Or</Divider>
      <div style={styles.switchModeContainer as React.CSSProperties}>
        <Typography>Already have an account?</Typography>
        <Button onClick={() => navigate(PATHS.SIGN_UP)} sx={styles.buttonText}>
          Sign Up
        </Button>
      </div>
    </SignPageWrapper>
  );
};

export default SignIn;
