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
    maxWidth: "400px",
    textAlign: "center",
  },
  cardsContainer: {
    display: "flex",
    gap: "30px",
    justifyContent: "center",
    width: "100%",
    maxWidth: "600px",
  },
  card: {
    width: "200px",
    cursor: "pointer",
    transition: "all 0.2s ease-in-out",
    border: `1px solid ${colors.lightGray}`,
    "&:hover": {
      transform: "scale(1.05)",
      borderColor: colors.darkGray,
    },
  },
  selectedCard: {
    borderColor: colors.darkGray,
    borderWidth: "2px",
    backgroundColor: `${colors.darkGray}10`,
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "15px",
    padding: "30px !important",
  },
  icon: {
    fontSize: "60px",
    color: colors.darkGray,
  },
  label: {
    color: colors.darkGray,
    fontWeight: "500",
  },
};

export default styles;
