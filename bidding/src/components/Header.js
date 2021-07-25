import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import AuthModal from "./AuthModal";

//later if we have a logo
// import IconButton from "@material-ui/core/IconButton";
// import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(0),
  },
  title: {
    flexGrow: 1,
  },
  nav: {
    backgroundColor: "#9400D3",
  },
  btn: {
    color: "white",
    backgroundColor: "transparent",
    marginLeft: "5px",
  },
}));

export default function Header() {
  const classes = useStyles();
  return (
    <>
      <CssBaseline />

      <AppBar className={classes.nav} position={"static"}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Betty
          </Typography>
          <AuthModal type={"signin"} />
          <AuthModal type={"signup"} />
        </Toolbar>
      </AppBar>
    </>
  );
}
