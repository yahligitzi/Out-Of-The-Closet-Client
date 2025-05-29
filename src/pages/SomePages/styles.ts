const styles = {
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
  title: {
    fontWeight: "bold",
    margin: "5px 0",
  },
  skeletonContainer: {
    gridTemplateColumns: "repeat(2, 1fr)",
    width: "100%",
    justifyItems: "center",
  },
  imageListContianer: {
    maxWidth: "600px",
    overflow: "hidden",
    padding: 10,
  },
  imageCard: {
    cursor: "pointer",
    transition: "all 0.2s ease-in-out",
  },
  selectedImageCard: {
    border: "2px solid gray",
    transform: "scale(1.02)",
  },

  itemsImageListConstinaer: {
    justifyItems: "center",
    alignItems: "center",
  },
};

export default styles;
