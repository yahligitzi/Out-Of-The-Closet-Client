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
  cardsContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "20px",
    width: "100%",
    maxWidth: "800px",
  },
  card: {
    cursor: "pointer",
    transition: "all 0.2s ease-in-out",
    border: `1px solid ${colors.lightGray}`,
    "&:hover": {
      transform: "scale(1.02)",
      borderColor: colors.darkGray,
    },
  },
  selectedCard: {
    borderColor: colors.darkGray,
    borderWidth: "2px",
    backgroundColor: `${colors.darkGray}10`,
  },
  cardMedia: {
    objectFit: "cover",
  },
  cardContent: {
    padding: "16px",
  },
};

export default styles;
