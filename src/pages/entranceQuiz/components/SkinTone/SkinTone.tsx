import { Box, Typography } from "@mui/material";
import styles from "./skinTone.style";
import { skinTones } from "./skinTone.consts";
import { SkinToneProps } from "./skinTone.types";
import { FC } from "react";

export const SkinTone: FC<SkinToneProps> = ({ selectedTone, onSelect }) => {
  return (
    <Box sx={styles.container}>
      <Typography variant="body1" sx={styles.description}>
        Select your skin tone to help us suggest colors that complement you
      </Typography>

      <Box sx={styles.tonesContainer}>
        {skinTones.map((tone) => (
          <Box
            key={tone.value}
            sx={{
              ...styles.toneBox,
              backgroundColor: tone.color,
              ...(selectedTone === tone.value ? styles.selectedTone : {}),
            }}
            onClick={() => onSelect(tone.value)}
          />
        ))}
      </Box>
    </Box>
  );
};
