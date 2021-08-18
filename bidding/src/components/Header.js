import React, { useContext } from "react";
import { AuthContext } from "../Auth";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import IconButton from "@material-ui/core/IconButton";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import AuthModal from "./AuthModal";
import { Button, Box } from "@material-ui/core";
import routeTo from "../util/btnrouting";

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
  userIcon: {
    color: "white",
    padding: "5px",
  },
  bar: {
    padding: "10px",
    alignItems: "center",
  },
  homeBtn: {
    "&:hover": {
      cursor: "pointer",
    },
  },
}));
const Header = () => {
  const { user, onAuthChange, logOut } = useContext(AuthContext);

  const classes = useStyles();
  return (
    <>
      <CssBaseline />

      <AppBar className={classes.nav} position="static">
        <Box
          display="flex"
          justifyContent="space-between"
          className={classes.bar}
        >
          <Typography variant="h6" className={classes.title}>
            <span onClick={() => routeTo("/")} className={classes.homeBtn}>
              Betty
            </span>
          </Typography>

          <Button className={classes.userIcon} onClick={() => routeTo("/bets")}>
            All bets
          </Button>
          {user.isSignedIn === true ? (
            <>
              <Button
                className={classes.btn}
                onClick={() => {
                  logOut();
                  onAuthChange();
                }}
              >
                Sign out
              </Button>{" "}
              <Button
                className={classes.btn}
                onClick={() => routeTo("/createbet")}
              >
                Create bet
              </Button>
              <IconButton
                onClick={() => routeTo("/user")}
                aria-label="upload picture"
                className={classes.userIcon}
                component="span"
              >
                <PermIdentityIcon />
              </IconButton>
            </>
          ) : (
            <>
              <AuthModal type={"sign in"} />
            </>
          )}
        </Box>
      </AppBar>
    </>
  );
};

export default Header;
