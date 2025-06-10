import { colors } from "../../constants/styles";

const styles = {
  dialogContent: {
    textAlign: "center",
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
  dialogActions: {
    justifyContent: "space-between",
    padding: "4%",
  },
  accordionSummary: {
    "&:hover": {
      outline: "none",
    },
    "&:focus": {
      outline: "none",
    },
  },
  selectedAccordion: {
    border: `2px solid ${colors.lightBlue}`,
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
  continueButton: {
    borderRadius: 10,
    color: "white",
    textTransform: "none",
    background: colors.lightBlue,
    borderColor: "transparent",
    "&:hover": {
      outline: "none",
    },
    "&:focus": {
      outline: "none",
    },
    "&:disabled": {
      background: colors.lightGray,
      color: "white",
    },
  },
};

export default styles;
