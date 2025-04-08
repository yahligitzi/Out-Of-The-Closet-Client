import { Stack, Card, Avatar, Typography } from "@mui/material";
import styles from "./SignPage.style";

type SignPageWrapperProps = {
  title: string;
  children: React.ReactNode;
};
const SignPageWrapper = ({ title, children }: SignPageWrapperProps) => {
  return (
    <Stack sx={styles.stack}>
      <Card variant="outlined" sx={styles.cardRoot}>
        <Avatar src={"vite.svg"} sx={styles.logo} />
        <Typography component="h1" variant="h4" sx={styles.title}>
          {title}
        </Typography>
        {children}
      </Card>
    </Stack>
  );
};

export default SignPageWrapper;
