import React from "react";
import {
  Container,
  CardMedia,
  Typography,
  Button,
  Grid,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AuthModal from "./AuthModal";
import routeTo from "../util/btnrouting";
const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(0),
  },
  title: {
    flexGrow: 1,
  },
  btn: {
    backgroundColor: "transparent",
    marginLeft: "5px",
    color: "#9400D3",
    borderColor: "#9400D3",
    marginTop: "10px",
  },
  introdiv: {
    marginTop: "70px",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  more: {
    color: "#9400D3",
    fontSize: "82px",
    animationName: "$blinker",
    animationDuration: "1s",
    animationTimingFunction: "linear",
    animationIterationCount: "infinite",
  },

  "@keyframes blinker": {
    "50%": {
      transform: "translateY(-20%)",
    },
  },
}));
export default function Intro({ user }) {
  const classes = useStyles();

  return (
    <Container maxWidth="lg" className={classes.introdiv}>
      <Grid container spacing={2}>
        <Grid item sm={6} md={6} xs={12}>
          <Typography variant="h1">Bet with your friends</Typography>
          <Typography variant="h6" gutterBottom>
            body1. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore
            consectetur, neque doloribus, cupiditate numquam dignissimos laborum
            fugiat deleniti? Eum quasi quidem quibusdam.
          </Typography>
          {user.isSignedIn ? (
            <Button
              className={classes.btn}
              variant="outlined"
              onClick={() => routeTo("/createbet")}
            >
              Bet Now
            </Button>
          ) : (
            <AuthModal type={"Sign up"} st={"out"} />
          )}
        </Grid>
        <Grid item sm={6} xs={false}>
          <CardMedia
            className={classes.media}
            image="https://res.cloudinary.com/dvfihlcxd/image/upload/v1626705273/bet/7511_nkkpuz.svg"
            title="https://www.freepik.com/vectors/people'>People vector created by pch.vector - www.freepik.com"
          />
        </Grid>
      </Grid>
      <ExpandMoreIcon variant="outline" className={classes.more} />
    </Container>
  );
}
