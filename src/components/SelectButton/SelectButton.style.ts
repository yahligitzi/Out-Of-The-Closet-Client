import { colors } from "../../constants/styles";

const styles = {
  button: {
    textTransform: "none",
    borderRadius: 10,
    borderColor: colors.lightGray,
    color: "white",
    background: colors.darkGray,
    "&:hover": {
      outline: "none",
      borderColor: colors.lightGray,
    },
    "&:focus": {
      outline: "none",
    },
  },
};

export default styles;
