const styles = {
  root: {
    backgroundColor: "#fffdf1",
    width: "100vw",
    height: "100vh",
    position: "relative",
  },

  cardRoot: {
    display: "flex",
    flexDirection: "column",
    alignSelf: "center",
    width: "100%",
    padding: "35px 30px 5px",
    gap: 2,
    boxSizing: "border-box",
    margin: "auto",
    boxShadow: "hsla(220, 30%, 5%, 0.05) 0px 5px 15px",
    position: "absolute",
    bottom: 0,
    borderRadius: "20px 20px 0px 0px",
  },
  logoContainer: {
    display: "flex",
    justifyContent: "center",
  },

  logo: {
    height: 300,
    width: 300,
    marginTop: "15vh",
  },
  title: {
    width: "100%",
    textAlign: "center",
  },
  buttonText: {
    textTransform: "none",
  },
  switchModeContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 0.5,
  },
};

export default styles;
