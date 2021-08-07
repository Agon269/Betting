<<<<<<< HEAD
import React, { useEffect } from "react";
import {
  makeStyles,
  Paper,
  Container,
  Box,
  Typography,
} from "@material-ui/core";
import MyCard from "../components/MyCard";
import UserTable from "../components/UserTable";
import { connect } from "react-redux";
import { getUserBets } from "../actions";

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
          <MyCard head={"Wallet"} number={1000} type={"money"} />
          <MyCard head={"Bets made"} number={12} type={"bet"} />
          <MyCard head={"Lost"} number={4} type={"lost"} />
          <MyCard head={"Won"} number={5} type={"won"} />
        </Box>
      </Container>
      <Container component={Paper} className={classes.tableCont}>
        <Typography variant="h4" className={classes.tableHeader}>
          All bets made
        </Typography>
        <UserTable />
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
=======
import React, { useEffect } from "react";
import {
  makeStyles,
  Paper,
  Container,
  Box,
  Typography,
} from "@material-ui/core";
import MyCard from "../components/MyCard";
import UserTable from "../components/UserTable";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { getUserBets } from "../actions";
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
            <MyCard head={"Wallet"} number={1000} type={"money"} />
            <MyCard head={"Bets made"} number={12} type={"bet"} />
            <MyCard head={"Lost"} number={4} type={"lost"} />
            <MyCard head={"Won"} number={5} type={"won"} />
          </Box>
        </Container>
        <Container className={classes.tableCont}>
          <Typography variant="h4" className={classes.tableHeader}>
            All bets made
          </Typography>
          <UserTable />
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
>>>>>>> 5371e86812dc8cb538a93cb460c5a97fe1e22ee1
