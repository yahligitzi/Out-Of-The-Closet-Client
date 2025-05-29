const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
  },
  upperBarContainer: {
    position: "sticky",
    top: 0,
    zIndex: 10,
    background: "white",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 1,
  },
  actionLine: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
    alignItems: "center",
  },
  divider: {
    width: "100%",
  },
  contentRoot: {
    flex: 1,
    padding: "20px",
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
  },
  checkBox: {
    "&.Mui-checked": {
      color: "#71c9e5",
    },
  },
};

export default styles;
