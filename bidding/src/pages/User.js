import React, { useContext } from "react";
import { AuthContext } from "../Auth";
import {
  makeStyles,
  Paper,
  Container,
  Box,
  Typography,
} from "@material-ui/core";
import MyCard from "../components/MyCard";

import { Redirect } from "react-router-dom";

const User = () => {
  const { user } = useContext(AuthContext);

  const useStyles = makeStyles((theme) => ({
    userHeader: {
      margin: "20px",
      paddingTop: "40px",
    },
    tableHeader: {
      margin: "40px",
      paddingTop: "20px",
    },
    tableCont: {
      marginTop: "40px",
      marginBottom: "60px",
      paddingBottom: "40px",
    },
  }));
  const classes = useStyles();

  if (!user.isSignedIn) {
    return <Redirect to="/" />;
  }
  console.log(user);
  if (user.isSignedIn)
    return (
      <>
        <Container component={Paper} className={classes.cont}>
          <Typography className={classes.userHeader} variant="h4">
            {user.currentUser.username}
          </Typography>
          <Box
            display="flex"
            flexWrap="wrap"
            justifyContent="space-between"
            alignItems="center"
          >
            <MyCard
              head={"Wallet"}
              number={user.currentUser.wallet}
              type={"money"}
            />
            <MyCard
              head={"Bets made"}
              number={user.currentUser.bets.length}
              type={"bet"}
            />
            <MyCard head={"Lost"} number={4} type={"lost"} />
            <MyCard head={"Won"} number={5} type={"won"} />
          </Box>
        </Container>
        <Container className={classes.tableCont}>
          <Typography variant="h4" className={classes.tableHeader}>
            All bets made
          </Typography>
          {/* <UserTable /> */}
        </Container>
      </>
    );
};

export default User;
