import { colors } from "../../constants/styles";

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
  puller: {
    width: 30,
    height: 6,
    backgroundColor: colors.lightGray,
    borderRadius: 3,
    marginTop: 8,
  },
  colorBox: {
    width: "80px",
    height: "80px",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "all 0.2s ease-in-out",
    border: `1px solid ${colors.lightGray}`,
    "&:hover": {
      transform: "scale(1.1)",
    },
  },
  selectedColorTag: {
    border: `2px solid ${colors.darkGray}`,
    transform: "scale(1.1)",
  },
  colorTagListWrapper: {
    display: "flex",
    flexWrap: "wrap",
    gap: 2,
    justifyContent: "center",
  },
  colorBoxWithTitle: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 2,
  },
};

export default styles;
