export interface MeasurementOptions {
  bust: string;
  waist: string;
  hips: string;
  height: string;
}

export type MeasurementName = keyof MeasurementOptions;

export interface MeasurementField {
  field: MeasurementName;
  label: string;
  helperText: string;
  unit: string;
}

export interface MeasurementsProps {
  measurements?: Partial<MeasurementOptions>;
  onMeasurementChange: (field: MeasurementName, value: string) => void;
}
