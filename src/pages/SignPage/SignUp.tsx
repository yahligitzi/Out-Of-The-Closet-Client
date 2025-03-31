import {
  Avatar,
  Button,
  Divider,
  Card as MuiCard,
  Stack,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "../../contexts/SnackbarContext";
import { createNewUser } from "../../services/user.service";
import { AxiosError } from "axios";
import { PATHS } from "../../constants/routes";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  maxWidth: "400px",
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
}));

const SignUp = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [fieldsError, setFieldsError] = useState<Record<string, string>>({});

  const navigate = useNavigate();
  const { setSnackbar } = useSnackbar();

  const validateFields = () => {
    const errorObject: Record<string, string> = {};

    if (username.length < 2)
      errorObject.username = "Username must be at least three characters";
    if (!/^\S+@\S+\.\S+$/.test(email)) errorObject.email = "Invalid email";

    if (password.length < 2)
      errorObject.password = "Password must be at least three characters";

    setFieldsError(errorObject);

    return !Object.keys(errorObject).length;
  };

  const handleSignUp = async () => {
    const allFieldsValid = validateFields();

    if (allFieldsValid) {
      try {
        // TODO: "save" user and his token
        await createNewUser({
          username,
          password,
          email,
        });

        setSnackbar({
          open: true,
          severity: "success",
          message: "User sign up successfully",
        });

        navigate(PATHS.UPLOAD_PHOTOS);
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
    <Stack
      direction="column"
      justifyContent="space-between"
      sx={{
        padding: 4,
      }}
      position="relative"
    >
      <Card variant="outlined">
        <Avatar src={"vite.svg"} sx={{ alignSelf: "center" }} />
        <Typography
          component="h1"
          variant="h4"
          sx={{ width: "100%", textAlign: "center" }}
        >
          Sign Up
        </Typography>
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
            htmlInput: { maxLength: 20 },
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
            htmlInput: { maxLength: 20 },
          }}
          error={!!fieldsError.password}
          helperText={fieldsError.password ?? ""}
          type="password"
        />
        <Button
          variant="outlined"
          sx={{ textTransform: "none" }}
          onClick={handleSignUp}
        >
          Sign Up
        </Button>
        <Divider>Or</Divider>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Typography>Already have an account?</Typography>
          <Button
            onClick={() => navigate(PATHS.SIGN_IN)}
            sx={{
              textTransform: "none",
            }}
          >
            Sign In
          </Button>
        </div>
      </Card>
    </Stack>
  );
};

export default SignUp;
