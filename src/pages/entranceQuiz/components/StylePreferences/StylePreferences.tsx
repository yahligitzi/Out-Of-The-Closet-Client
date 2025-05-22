import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import styles from "./stylePreferences.style";
import { StylePreferencesProps } from "./stylePreferences.types";
import { FC } from "react";
import { STYLE_OPTIONS } from "./StylePreferences.consts";

export const StylePreferences: FC<StylePreferencesProps> = ({
  selectedStyle,
  gender,
  onSelect,
}) => {
  return (
    <Box sx={styles.container}>
      <Typography variant="body1" sx={styles.description}>
        Choose your preferred style to help us curate your perfect wardrobe
      </Typography>

      <Box sx={styles.cardsContainer}>
        {STYLE_OPTIONS(gender).map((style) => (
          <Card
            key={style.value}
            sx={{
              ...styles.card,
              ...(selectedStyle === style.value ? styles.selectedCard : {}),
            }}
            onClick={() => onSelect(style.value)}
          >
            <CardMedia
              component="img"
              height="200"
              image={style.imageUrl}
              alt={style.label}
              sx={styles.cardMedia}
            />
            <CardContent sx={styles.cardContent}>
              <Typography variant="h6">{style.label}</Typography>
              <Typography variant="body2" color="text.secondary">
                {style.description}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};
