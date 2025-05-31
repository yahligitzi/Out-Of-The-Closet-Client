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
  uploadPhotosBtn: {
    position: "absolute",
    right: 0,
  },

  dialogBox: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
    padding: "20px 25px",
    gap: 2,
    textAlign: "center",
  },

  uploadImageTitle: {
    textAlign: "center",
  },

  dialogOptionBox: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    width: "50%",
    padding: "10px",
    border: "2px solid #71c9e5",
    borderRadius: "10px",
  },

  dialogOptionsTitle: {
    fontSize: 20,
    fontWeight: 600,
    marginBottom: 1,
  },

  dialogOptionsBody: {
    fontSize: 15,
  },
};

export default styles;
