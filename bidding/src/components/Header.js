import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import IconButton from "@material-ui/core/IconButton";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import AuthModal from "./AuthModal";
import { connect } from "react-redux";
import { Button, Box } from "@material-ui/core";

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
}));

const Header = ({ user }) => {
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
            Betty
          </Typography>

          <Button className={classes.userIcon}>All bets</Button>
          {user.isSignedIn === true ? (
            <>
              <Button className={classes.btn}>Sign out</Button>
              <IconButton
                aria-label="upload picture"
                className={classes.userIcon}
                component="span"
              >
                <PermIdentityIcon />
              </IconButton>
            </>
          ) : (
            <>
              <AuthModal type={"signin"} />
              <AuthModal type={"signup"} />
            </>
          )}
        </Box>
      </AppBar>
    </>
  );
};

const mapStateToProps = (state) => {
  return { user: state.user };
};
export default connect(mapStateToProps)(Header);
