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
    flexDirection: "column",
    alignItems: "center",
    gap: 1,
    width: "100%",
    justifyContent: "space-between",
    boxSizing: "border-box",
  },
  searchBarLine: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    background: "#fffdf1",
    width: "100%",
    padding: 2,
  },
  actionsLine: {
    display: "flex",
    background: "white",
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
  },
  searchBar: {
    ".MuiOutlinedInput-root": {
      borderRadius: 5,
    },
  },
  loader: { marginTop: 10 },
  image: {
    objectFit: "contain",
    margin: "auto",
  },
};

export default styles;
