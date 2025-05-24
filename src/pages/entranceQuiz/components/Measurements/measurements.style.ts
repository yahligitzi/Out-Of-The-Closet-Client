import { colors } from "../../../../constants/styles";

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    gap: "20px",
  },
  description: {
    color: colors.darkGray,
    maxWidth: "400px",
    textAlign: "center",
  },
  subtitle: {
    maxWidth: "400px",
    textAlign: "center",
    marginTop: "-10px",
  },
  measurementsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    width: "100%",
    maxWidth: "400px",
    marginTop: "10px",
  },
  measurementField: {
    width: "100%",
  },
  input: {
    "& .MuiOutlinedInput-root": {
      "&:hover fieldset": {
        borderColor: colors.darkGray,
      },
      "&.Mui-focused fieldset": {
        borderColor: colors.darkGray,
      },
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: colors.darkGray,
    },
  },
};

export default styles;
