import { MeasurementField } from "./measurements.types";

export const MEASUREMENT_FIELDS: MeasurementField[] = [
  {
    field: "bustSize",
    label: "Bust",
    helperText: "Measure around the fullest part of your bust",
    unit: "cm",
  },
  {
    field: "waistSize",
    label: "Waist",
    helperText: "Measure around your natural waistline",
    unit: "cm",
  },
  {
    field: "hipsSize",
    label: "Hips",
    helperText: "Measure around the fullest part of your hips",
    unit: "cm",
  },
  {
    field: "height",
    label: "Height",
    helperText: "Your total height",
    unit: "cm",
  },
];
