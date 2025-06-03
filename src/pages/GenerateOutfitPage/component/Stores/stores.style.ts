import { colors } from "../../../../constants/styles";

const styles = {
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  title: {
    fontWeight: "bold",
    margin: "5px 0",
  },
  text: {
    color: colors.darkGray,
    maxWidth: "400px",
    textAlign: "center",
  },
  skeletonContainer: {
    gridTemplateColumns: "repeat(2, 1fr)",
    width: "100%",
    justifyItems: "center",
  },
  imageListContianer: {
    maxWidth: "600px",
    overflow: "hidden",
    padding: 10,
  },
  imageCard: {
    cursor: "pointer",
    transition: "all 0.2s ease-in-out",
    display: "flex",
    alignItems: "center",
  },
  selectedImageCard: {
    border: `2px solid ${colors.lightBlue} `,
    transform: "scale(1.02)",
  },
};

export default styles;
