const styles = {
  upperBar: {
    position: "sticky",
    top: 0,
    zIndex: 10,
    background: "white",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 1,
    width: "100%",
    justifyContent: "space-between",
    boxSizing: "border-box",
  },
  actionsLine: {
    display: "flex",
    background: "white",
    justifyContent: "space-between",
  },
  mainContentWrapper: {
    flex: 1,
    padding: "20px",
    overflowY: "auto",
    minHeight: 0,
  },
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "2%",
    minHeight: 0,
    boxSizing: "border-box",
  },
  itemsGrid: {
    width: "100%",
    boxSizing: "border-box",
    display: "grid",
    gridTemplateColumns: {
      xs: "repeat(2, minmax(0, 1fr))",
      md: "repeat(3, minmax(0, 1fr))",
    },
    gap: 2,
    justifyItems: "center",
    alignItems: "center",
  },
  imageCard: {
    width: "100%",
    height: {
      xs: 150,
      md: 250,
    },
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxSizing: "border-box",
    borderRadius: 2,
    backgroundColor: "#fff",
    position: "relative",
  },
  searchBar: {
    ".MuiOutlinedInput-root": {
      borderRadius: 5,
    },
    width: "50%",
  },
  loader: { marginTop: 10 },
  image: {
    objectFit: "contain",
    margin: "auto",
  },
  deleteButton: {
    "&:focus": {
      outline: "none",
    },
    position: "absolute",
    top: 8,
    left: 8,
    zIndex: 10,
    backgroundColor: "rgba(255,255,255,0.7)",
  },
  dialogText: {
    textAlign: "center",
  },
  dialogActions: {
    justifyContent: "space-between",
    padding: "10px 20px",
  },
  dialogButton: {
    borderRadius: "15px",
  },
};

export default styles;
