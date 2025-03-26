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
  uploadContainer: {
    marginTop: "20px",
  },
  uploadBox: {
    padding: 3,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "20px",
    border: `1px solid ${colors.lightGray}`,
    borderRadius: 2,
  },
  uploadButton: {
    bgcolor: colors.darkGray,
    "&:hover": { bgcolor: colors.gray },
    textTransform: "none",
  },
  previewContainer: {
    height: 100,
    width: "100%",
    backgroundSize: "cover",
    backgroundPosition: "center",
    borderRadius: 1,
  },
  placeholderBox: {
    height: 200,
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.softGray,
    borderRadius: 1,
  },
  uploadText: {
    fontSize: 100,
    color: colors.lightGray,
  },
  uploadActionButton: {
    mt: 3,
    bgcolor: colors.darkGray,
    "&:hover": { bgcolor: colors.gray },
    "&:disabled": { bgcolor: colors.lightGray, color: `${colors.gray}70` },
    textTransform: "none",
  },
  imagesPlaceholder: {
    fontSize: "100px",
  },
};

export default styles;
