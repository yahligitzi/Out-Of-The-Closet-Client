const styles = {
  root: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
  },
  upperBar: {
    position: "sticky",
    top: 0,
    zIndex: 10,
    background: "white",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 1,
    width: "100%",
    justifyContent: "space-between",
    padding: "8px 16px",
    boxSizing: "border-box",
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
    },
    gap: 2,
    justifyItems: "center",
    alignItems: "center",
  },
  imageCard: {
    maxWidth: "50%",
    boxSizing: "border-box",
  },
  searchBar: {
    ".MuiOutlinedInput-root": {
      borderRadius: 5,
    },
  },
  loader: { marginTop: 10 },
};

export default styles;
