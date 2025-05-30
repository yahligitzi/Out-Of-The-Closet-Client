const styles = {
  root: {
    display: "flex",
    flexDirection: "column",
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
  },
  itemsGrid: {
    justifyItems: "center",
    alignItems: "center",
    display: "grid",
    gridTemplateColumns: {
      xs: "repeat(2, 1fr)",
    },
  },
  mainContentWrapper: {
    flex: 1,
    padding: "20px",
  },
  container: {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "2%",
  },
  searchBar: {
    ".MuiOutlinedInput-root": {
      borderRadius: 5,
    },
  },
  loader: { marginTop: 10 },
};

export default styles;
