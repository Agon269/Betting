import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";

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
          <Button className={classes.btn}>Login</Button>
          <Button className={classes.btn} variant="outlined">
            Signup
          </Button>
        </Toolbar>
      </AppBar>
    </>
  );
}
