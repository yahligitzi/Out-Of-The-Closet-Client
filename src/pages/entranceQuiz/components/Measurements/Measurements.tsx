import { Box, TextField, Typography, InputAdornment } from "@mui/material";
import styles from "./measurements.style";
import { MeasurementName, MeasurementsProps } from "./measurements.types";
import { FC } from "react";
import { MEASUREMENT_FIELDS } from "./measurements.consts";

export const Measurements: FC<MeasurementsProps> = ({
  measurements,
  onMeasurementChange,
}) => {
  const handleInputChange = (field: MeasurementName, value: string) => {
    // Only allow numbers
    if (value === "" || /^\d+$/.test(value)) {
      onMeasurementChange(field, value === "" ? undefined : value);
    }
  };

  return (
    <Box sx={styles.container}>
      <Typography variant="body1" sx={styles.description}>
        Provide your measurements to help us find the perfect fit for you
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={styles.subtitle}>
        All measurements should be in centimeters
      </Typography>

      <Box sx={styles.measurementsContainer}>
        {MEASUREMENT_FIELDS.map((field) => (
          <Box key={field.field} sx={styles.measurementField}>
            <TextField
              label={field.label}
              value={measurements?.[field.field]}
              onChange={(e) => handleInputChange(field.field, e.target.value)}
              helperText={field.helperText}
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">{field.unit}</InputAdornment>
                ),
              }}
              sx={styles.input}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};
