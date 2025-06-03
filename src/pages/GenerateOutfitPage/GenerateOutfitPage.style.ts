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
    borderColor: colors.lightBlue,
    color: colors.lightBlue,
    borderRadius: 10,
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
  },
  dialogRoot: { textAlign: "center" },
  dialogActions: {
    justifyContent: "space-between",
    padding: "4%",
  },
};

export default styles;
