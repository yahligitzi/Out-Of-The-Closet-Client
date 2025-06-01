import { Card, Box } from "@mui/material";
import styles from "./SignPage.style";

type SignPageWrapperProps = {
  children: React.ReactNode;
};
const SignPageWrapper = ({ children }: SignPageWrapperProps) => {
  return (
    <Box sx={styles.root}>
      <Box sx={styles.logoContainer}>
        <img src={"logo.jpg"} style={styles.logo} />
      </Box>
      <Card variant="outlined" sx={styles.cardRoot}>
        {children}
      </Card>
    </Box>
  );
};

export default SignPageWrapper;
