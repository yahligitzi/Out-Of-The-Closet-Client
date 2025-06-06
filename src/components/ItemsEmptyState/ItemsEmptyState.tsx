import { Box, Typography } from "@mui/material";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import { styles } from "./ItemsEmptyState.style";

const ItemsEmptyState = ({
  setIsPopupOpen,
}: {
  setIsPopupOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}) => (
  <Box sx={styles.root}>
    <CheckroomIcon sx={styles.icon} />
    <Typography sx={styles.title}>
      It seems like your closet is in need of a refresh!
    </Typography>
    {setIsPopupOpen && (
      <Typography onClick={() => setIsPopupOpen(true)} sx={styles.body}>
        would you like to add more items?
      </Typography>
    )}
  </Box>
);

export default ItemsEmptyState;
