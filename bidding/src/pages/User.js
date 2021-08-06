import React, { useEffect } from "react";
import {
  makeStyles,
  Paper,
  Container,
  Box,
  Typography,
} from "@material-ui/core";
import MyCard from "../components/MyCard";

import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { getUserBets } from "../actions/bet-actions";
import _ from "lodash";
const User = ({ getUserBets, bets, user }) => {
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
  useEffect(() => {
    // getUserBets(user);
  });
  if (_.isEmpty(user)) {
    return <Redirect to="/" />;
  }
  console.log(user);

  if (!_.isEmpty(user))
    return (
      <>
        <Container component={Paper} className={classes.cont}>
          <Typography className={classes.userHeader} variant="h4">
            {user.username}
          </Typography>
          <Box
            display="flex"
            flexWrap="wrap"
            justifyContent="space-between"
            alignItems="center"
          >
            <MyCard head={"Wallet"} number={user.wallet} type={"money"} />
            <MyCard head={"Bets made"} number={user.bets.length} type={"bet"} />
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

const mapStateToProps = (state) => {
  let bets = Object.values(state.bets);
  let { currentUser } = state.user;
  return { bets, user: { ...currentUser } };
};
export default connect(mapStateToProps, { getUserBets })(User);
