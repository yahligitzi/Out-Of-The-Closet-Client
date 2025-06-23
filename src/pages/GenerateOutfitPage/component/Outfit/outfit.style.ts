import { colors } from "../../../../constants/styles";

const styles: any = {
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    height: "100%",
    overflow: "hidden",
    backgroundColor: colors.white,
  },
  upperBar: {
    position: "sticky",
    top: 0,
    alignItems: "center",
    width: "100%",
    justifyContent: "space-between",
    boxSizing: "border-box",
  },
  outfitContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "24px 0 10px",
    width: "90%",
    maxWidth: "600px",
    margin: "0 auto",
    overflowY: "auto",
    gap: 3,
  },
  pageTitle: {
    fontSize: "32px",
    fontWeight: "700",
    color: "black",
    textAlign: "center",
  },
  pageSubtitle: {
    fontSize: "16px",
    color: colors.gray,
    textAlign: "center",
  },
  modelImageContainer: {
    width: "100%",
    aspectRatio: "1",
  },
  modelImage: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  },
  sectionTitle: {
    fontSize: "1.5rem",
    fontWeight: "600",
    color: "black",
    alignSelf: "flex-start",
  },
  itemCard: {
    display: "flex",
    alignItems: "center",
    padding: "12px",
    gap: 3,
    borderRadius: "12px",
    backgroundColor: colors.lightBeige,
    boxShadow: "none",
    border: "none",
  },
  itemThumb: {
    width: "60px",
    height: "60px",
    borderRadius: "8px",
    backgroundColor: colors.softGray,
    overflow: "hidden",
  },
  itemImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  itemDetails: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: 1,
  },
  itemTitle: {
    fontSize: "16px",
    fontWeight: "600",
    color: "black",
  },
  itemStore: {
    fontSize: "14px",
    color: "gray",
  },
  buyButton: {
    padding: "8px 16px",
    borderRadius: "8px",
    backgroundColor: colors.white,
    border: "1px solid black",
    color: "black",
    fontSize: "0.925rem",
    fontWeight: "500",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
  itemsContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: 2,
  },
  backButton: {
    marginBottom: "10px",
    textTransform: "none",
    backgroundColor: colors.white,
    color: colors.lightBlue,
    border: `1px solid ${colors.lightBlue}`,
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
  buttonContainer: {
    display: "flex",
    width: "100%",
    justifyContent: "space-around"
  }
};

export default styles;
