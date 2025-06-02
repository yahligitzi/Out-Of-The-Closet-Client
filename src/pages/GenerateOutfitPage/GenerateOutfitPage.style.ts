import { colors } from "../../constants/styles";

const styles = {
  root: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
  },
  navigationLine: {
    position: "sticky",
    bottom: -1,
    zIndex: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "white",
    gap: 10,
  },
  genericButton: {
    textTransform: "none",
    color: "white",
    borderColor: colors.lightGray,
    background: colors.darkGray,
    margin: "2% 0",
  },
  nextButton: {
    textTransform: "none",
    color: "white",
    borderColor: colors.lightGray,
    background: colors.darkGray,
    margin: "2% 0",
    "&:disabled": {
      color: "white",
      background: colors.lightGray,
    },
  },
};

export default styles;
