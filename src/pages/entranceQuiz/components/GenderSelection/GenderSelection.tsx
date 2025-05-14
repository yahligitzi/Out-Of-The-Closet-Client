import { Box, Card, CardContent, Typography } from "@mui/material";
import styles from "./genderSelection.style";
import { GenderSelectionProps } from "./genderSelection.types";
import { FC } from "react";
import { GENDER_OPTIONS } from "./genderSelection.consts";

export const GenderSelection: FC<GenderSelectionProps> = ({
  selectedGender,
  onSelect,
}) => {
  return (
    <Box sx={styles.container}>
      <Typography variant="body1" sx={styles.description}>
        Please select your gender to help us provide better outfit
        recommendations
      </Typography>

      <Box sx={styles.cardsContainer}>
        {GENDER_OPTIONS.map((option) => (
          <Card
            key={option.value}
            sx={{
              ...styles.card,
              ...(selectedGender === option.value ? styles.selectedCard : {}),
            }}
            onClick={() => onSelect(option.value)}
          >
            <CardContent sx={styles.cardContent}>
              {option.icon}
              <Typography variant="h6" sx={styles.label}>
                {option.label}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};
