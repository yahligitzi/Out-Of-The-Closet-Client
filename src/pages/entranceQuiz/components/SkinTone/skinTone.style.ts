import { colors } from "../../../../constants/styles";

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    gap: "30px",
  },
  description: {
    color: colors.darkGray,
    maxWidth: "500px",
    textAlign: "center",
  },
  tonesContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    justifyContent: "center",
    maxWidth: "600px",
  },
  toneBox: {
    width: "80px",
    height: "80px",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "all 0.2s ease-in-out",
    position: "relative",
    border: `1px solid ${colors.lightGray}`,
    "&:hover": {
      transform: "scale(1.1)",
    },
  },
  selectedTone: {
    border: `2px solid ${colors.darkGray}`,
    transform: "scale(1.1)",
  },
};

export default styles;
