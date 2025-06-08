import { colors } from "../../constants/styles";

const styles = {
  dialogContent: {
    display: "flex",
    justifyContent: "space-between",
    textAlign: "center",
  },
  optionBox: {
    border: `2px solid ${colors.lightBlue}`,
    borderRadius: 4,
    display: "flex",
    flexDirection: "column",
    justifyContent: "start",
    margin: "1vh",
    padding: "1vh",
    cursor: "pointer",
    gap: 2,
  },
  title: {
    fontWeight: "bold",
    fontSize: "3vh",
    textAlign: "center",
  },
  optionTitle: {
    fontWeight: "bold",
    fontSize: "2.1vh",
    color: "black",
  },
  description: {
    fontSize: "1.7vh",
    color: "black",
  },
  closeButton: {
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
};

export default styles;
