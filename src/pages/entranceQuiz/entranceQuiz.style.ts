import { colors } from "../../constants/styles";

const styles = {
  root: {
    display: "flex",
    width: "100%",
    height: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.lightBeige,
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    padding: "40px",
    width: "70%",
    textAlign: "center",
    backgroundColor: colors.white,
  },
  title: {
    fontWeight: "bold",
    marginBottom: "5px",
  },
  content: {
    marginTop: "20px",
    marginBottom: "20px",
    minHeight: "300px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  navigation: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "20px",
  },
  navigationButton: {
    marginTop: 5,
    bgcolor: colors.darkGray,
    color: colors.white,
    "&:hover": { bgcolor: colors.gray },
    textTransform: "none",
    minWidth: "120px",

    "&:disabled": { bgcolor: colors.lightGray, color: `${colors.gray}70` },
  },
};

export default styles;
