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
  backButton: {
    textTransform: "none",
    color: colors.lightBlue,
    borderRadius: 10,
    "&:hover": {
      borderColor: colors.lightBlue,
      outline: "none",
    },
    "&:focus": {
      borderColor: colors.lightBlue,
      outline: "none",
    },
  },
  nextButton: {
    textTransform: "none",
    background: colors.lightBlue,
    color: "white",
    borderRadius: 10,
    margin: "2% 0",
    "&:disabled": {
      color: "white",
      background: colors.lightGray,
    },
    "&:hover": {
      outline: "none",
    },
    "&:focus": {
      outline: "none",
    },
  },
  dialogRoot: { textAlign: "center" },
  dialogActions: {
    justifyContent: "space-between",
    padding: "4%",
  },
};

export default styles;
