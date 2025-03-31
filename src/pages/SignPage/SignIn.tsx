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
import { useSnackbar } from "../../contexts/snackbarContext";
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

const SignIn = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { setSnackbar } = useSnackbar();

  const navigate = useNavigate();

  const signInUser = () => {
    // setSnackbar({
    //   open: true,
    //   message: "Files uploaded successfully!",
    //   severity: "success",
    // });
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
          Sign In
        </Typography>
        <TextField
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          label="username"
          slotProps={{
            inputLabel: {
              shrink: true,
            },
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
          }}
        />
        <Button
          variant="outlined"
          sx={{ textTransform: "none" }}
          onClick={signInUser}
        >
          Sign In
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
            onClick={() => navigate(PATHS.SIGN_UP)}
            sx={{
              textTransform: "none",
            }}
          >
            Sign Up
          </Button>
        </div>
      </Card>
    </Stack>
  );
};

export default SignIn;
