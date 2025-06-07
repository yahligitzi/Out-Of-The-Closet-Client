import { Button } from "@mui/material";
import styles from "./SelectButton.style";

type SelectButtonProps = {
  selectText?: string;
  clearText?: string;
  areAllSelected: boolean;
  selectAllFunc: () => void;
  clearFunc: () => void;
};

const SelectButton = ({
  selectText = "Select All",
  clearText = "Clear",
  areAllSelected,
  selectAllFunc,
  clearFunc,
}: SelectButtonProps) => {
  return (
    <Button
      sx={styles.button}
      variant="outlined"
      onClick={areAllSelected ? clearFunc : selectAllFunc}
    >
      {areAllSelected ? clearText : selectText}
    </Button>
  );
};

export default SelectButton;
