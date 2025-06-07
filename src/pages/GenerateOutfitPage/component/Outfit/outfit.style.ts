const styles = {
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  upperBar: {
    position: "sticky",
    top: 0,
    alignItems: "center",
    width: "100%",
    justifyContent: "space-between",
    boxSizing: "border-box",
  },
  skeletonContainer: {
    gridTemplateColumns: "repeat(2, 1fr)",
    width: "100%",
    justifyItems: "center",
  },
  imageListContianer: {
    maxWidth: "600px",
  },
  imageCard: {
    transition: "all 0.2s ease-in-out",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};

export default styles;
