import { colors } from "../../constants/styles";

const styles = {
  filterBtn: {
    textTransform: "none",
    color: "white",
    borderColor: "white",
    borderRadius: 10,
    background: colors.darkGray,
  },
  divider: {
    width: "100%",
  },
  drawerContainer: {
    display: "flex",
    flexDirection: "column",
    zIndex: 100,
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
  },
  listContainer: { flex: 1, padding: "20px" },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
  },
  bottomButtonsContainer: {
    position: "sticky",
    bottom: -1,
    zIndex: 10,
    display: "flex",
  },
  clearAllBtn: {
    textTransform: "none",
    flex: 1,
    color: colors.darkGray,
    background: "white",
    borderRadius: 0,
  },
  categoryNameTitle: {
    fontWeight: 600,
    gap: 10,
  },
  listItemText: {
    gap: 10,
  },
  showResultsBtn: {
    textTransform: "none",
    flex: 2,
    color: colors.darkGray,
    background: "#71c9e5",
    borderRadius: 0,
  },
  filterCount: {
    "& .MuiBadge-badge": {
      color: colors.darkGray,
      backgroundColor: "white",
    },
  },
  drawerPaper: {
    height: "60vh",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
};

export default styles;
