const styles = {
  root: {
    display: "flex",
    width: "100%",
    height: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#faf7f2",
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    padding: "40px",
    width: "70%",
    textAlign: "center",
    backgroundColor: "white",
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
    border: "1px solid #e0e0e0",
    borderRadius: 2,
  },
  uploadButton: {
    bgcolor: "#333",
    "&:hover": { bgcolor: "#555" },
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
    backgroundColor: "#f5f5f5",
    borderRadius: 1,
  },
  uploadText: {
    fontSize: 100,
    color: "#e0e0e0",
  },
  uploadActionButton: {
    mt: 3,
    bgcolor: "#333",
    "&:hover": { bgcolor: "#555" },
    textTransform: "none",
  },
  imagesPlaceholder: {
    fontSize: "100px",
  },
};

export default styles;
