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
  icon: {
    width: "4vw"
  }
};

export default styles;
