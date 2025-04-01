import { Button, Divider, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "../../contexts/SnackbarContext";
import { PATHS } from "../../constants/routes";
import { loginExistingUser } from "../../services/user.service";
import SignPageWrapper from "./SignPageWrapper";
import styles from "./SignPage.style";

const SignIn = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { setSnackbar } = useSnackbar();

  const navigate = useNavigate();

  const isAbleToSave = username.trim().length && password.trim().length;

  const handleSignIn = async () => {
    try {
      // TODO: "save" user and his token
      const { data } = await loginExistingUser(username, password);

      if (data) {
        setSnackbar({
          open: true,
          message: "User signed in successfully",
          severity: "success",
        });
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
        severity: "success",
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
          htmlInput: { maxLength: 20 },
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
          htmlInput: { maxLength: 20 },
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
