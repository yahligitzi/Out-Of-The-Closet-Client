import { GenderAnswer as GenderOption } from "./genderSelection.types";
import styles from "./genderSelection.style";
import WomanIcon from "@mui/icons-material/Woman";
import ManIcon from "@mui/icons-material/Man";

export type Gender = "male" | "female";

export const GENDER_OPTIONS: GenderOption[] = [
  {
    value: "female",
    label: "Female",
    icon: <WomanIcon sx={styles.icon} />,
  },
  {
    value: "male",
    label: "Male",
    icon: <ManIcon sx={styles.icon} />,
  },
];
