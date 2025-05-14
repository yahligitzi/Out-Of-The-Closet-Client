import { colors } from "../../../../constants/styles";

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    gap: "20px",
  },
  description: {
    color: colors.darkGray,
    maxWidth: "500px",
    textAlign: "center",
  },
  subtitle: {
    maxWidth: "400px",
    textAlign: "center",
    marginTop: "-10px",
  },
  uploadButton: {
    bgcolor: colors.darkGray,
    color: colors.white,
    textTransform: "none",
    "&:disabled": { bgcolor: colors.lightGray, color: `${colors.gray}70` },
  },
  previewContainer: {
    position: "relative",
    height: 100,
    width: "100%",
    backgroundSize: "cover",
    backgroundPosition: "center",
    borderRadius: "8px",
    border: `1px solid ${colors.lightGray}`,
  },
  removeButton: {
    position: "absolute",
    top: -10,
    right: -10,
    padding: "4px",
    minWidth: "unset",
    width: "24px",
    height: "24px",
    backgroundColor: colors.white,
    border: `1px solid ${colors.lightGray}`,
    borderRadius: "50%",
    "&:hover": {
      backgroundColor: colors.softGray,
    },
    "& .MuiSvgIcon-root": {
      fontSize: "16px",
      color: colors.darkGray,
    },
  },
  placeholderBox: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.softGray,
    borderRadius: "8px",
  },
  imagesPlaceholder: {
    fontSize: "100px",
    color: colors.lightGray,
  },
  imagesContainer: {
    width: "100%",
  },
};

export default styles;
