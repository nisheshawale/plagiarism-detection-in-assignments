import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.up("md")]: {
      padding: "5px 40px",
    },
  },
  logoContainer: {
    display: "flex",
    alignItems: "center",
  },
  logo: {
    objectFit: "contain",
  },
  projectName: {
    marginLeft: theme.spacing(1),
  },
  mobileMenu: {
    background: "#141414",
  },
  button: {
    fontSize: 18,
    fontWeight: 700,
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  getStarted: {
    marginRight: theme.spacing(1),
  },
}));
