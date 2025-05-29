import { Button } from "@mui/material";
import styles from "./SelectButton.style";

type SelectButtonProps = {
  selectText?: string;
  clearText?: string;
  isAllSelected: boolean;
  selectAllFunc: () => void;
  clearFunc: () => void;
};

const SelectButton = ({
  selectText = "Select All",
  clearText = "Clear",
  isAllSelected,
  selectAllFunc,
  clearFunc,
}: SelectButtonProps) => {
  return (
    <Button
      sx={styles.button}
      variant="outlined"
      onClick={isAllSelected ? clearFunc : selectAllFunc}
    >
      {isAllSelected ? clearText : selectText}
    </Button>
  );
};

export default SelectButton;
