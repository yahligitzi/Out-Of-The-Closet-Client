const styles = {
  root: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    padding: 5,
  },
  itemAndFiltersContainer: {
    display: "flex",
    flexDirection: "row",
    height: "100%",
    width: "100%",
  },
  itemsGrid: {
    justifyItems: "center",
    alignItems: "center",
    gridTemplateColumns: {
      xs: "1fr",
      sm: "repeat(auto-fit, minmax(250px, 1fr))",
    },
  },
  tabWrapper: {
    borderBottom: 1,
    borderColor: "divider",
    width: "45vw",
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
};

export default styles;
