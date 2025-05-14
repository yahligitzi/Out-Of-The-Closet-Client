import { Button, Divider, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "../../contexts/SnackbarContext";
import { createNewUser } from "../../services/user.service";
import { AxiosError } from "axios";
import { PATHS } from "../../constants/routes";
import SignPageWrapper from "./SignPageWrapper";
import styles from "./SignPage.style";
import {
  MAX_USERNAME_LENGTH,
  MAX_EMAIL_LENGTH,
  MAX_PASSWORD_LENGTH,
  MIN_PASSWORD_LENGTH,
  MIN_USERNAME_LENGTH,
} from "./SignIn.consts";
import { useUser } from "../../contexts/UserContext";
import { addAuthHeader } from "../../services/axiosInstance";

const SignUp = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [fieldsError, setFieldsError] = useState<Record<string, string>>({});

  const navigate = useNavigate();
  const { user, setUser } = useUser();
  const { setSnackbar } = useSnackbar();

  useEffect(() => {
    if (user) navigate(PATHS.MAIN);
  }, [user]);

  const validateFields = () => {
    const errorObject: Record<string, string> = {};

    if (username.length < MIN_USERNAME_LENGTH)
      errorObject.username = `Username must be at least ${MIN_USERNAME_LENGTH} characters`;
    if (!/^\S+@\S+\.\S+$/.test(email)) errorObject.email = "Invalid email";

    if (password.length < MIN_PASSWORD_LENGTH)
      errorObject.password = `Password must be at least ${MIN_PASSWORD_LENGTH} characters`;

    setFieldsError(errorObject);

    return !Object.keys(errorObject).length;
  };

  const handleSignUp = async () => {
    const allFieldsValid = validateFields();

    if (allFieldsValid) {
      try {
        const { data } = await createNewUser({
          username,
          password,
          email,
        });
        const { token, ...user } = data;

        setSnackbar({
          open: true,
          severity: "success",
          message: "User sign up successfully",
        });

        addAuthHeader(token);
        localStorage.setItem("token", token);
        setUser(user);
      } catch (err) {
        if (err instanceof AxiosError && err.status === 409 && err.response)
          setSnackbar({
            open: true,
            severity: "error",
            message: err.response.data.error,
          });
        else
          setSnackbar({
            open: true,
            severity: "error",
            message: "Error in sign up",
          });
      }
    }
  };

  return (
    <SignPageWrapper title="Sign Up">
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
        error={!!fieldsError.username}
        helperText={fieldsError.username ?? ""}
      />
      <TextField
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        label="email"
        slotProps={{
          inputLabel: {
            shrink: true,
          },
          htmlInput: { maxLength: MAX_EMAIL_LENGTH },
        }}
        error={!!fieldsError.email}
        helperText={fieldsError.email ?? ""}
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
        error={!!fieldsError.password}
        helperText={fieldsError.password ?? ""}
        type="password"
      />
      <Button variant="outlined" sx={styles.buttonText} onClick={handleSignUp}>
        Sign Up
      </Button>
      <Divider>Or</Divider>
      <div style={styles.switchModeContainer as React.CSSProperties}>
        <Typography>Already have an account?</Typography>
        <Button onClick={() => navigate(PATHS.SIGN_IN)} sx={styles.buttonText}>
          Sign In
        </Button>
      </div>
    </SignPageWrapper>
  );
};

export default SignUp;
