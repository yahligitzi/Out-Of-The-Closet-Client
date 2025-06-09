const styles = {
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    height: "100%",
    overflow: "hidden",
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
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 3,
    padding: 2,
    width: "100%",
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
  outfitContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 3,
    padding: 2,
    width: "90vw",
    overflowY: "scroll",
    overflowX: "hidden",
  },
  modelImageContainer: {
    width: "300px",
    height: "300px",
  },
  modelImage: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  },
  outfitTitle: {
    alignSelf: "center",
    fontSize: "1.5rem",
    fontWeight: 600,
  },
  itemsContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: 2,
  },
  itemCard: {
    display: "flex",
    alignItems: "center",
    padding: 2,
    gap: 2,
  },
  itemImageContainer: {
    flex: 1,
    height: "40vw",
  },
  itemImage: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  },
  itemUrlContainer: {
    flex: 1,
    wordBreak: "break-all",
    fontWeight: 600,
  },
} satisfies Record<string, React.CSSProperties>;

export default styles;
