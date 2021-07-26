import React, { useEffect } from "react";
import {
  makeStyles,
  Paper,
  Container,
  Box,
  Typography,
} from "@material-ui/core";
import { connect } from "react-redux";
import { getBet } from "../actions/index";
function BetPage({ bet, getBet }) {
  useEffect(() => {
    getBet();
  }, [getBet]);

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
  return (
    <>
      <Container component={Paper} className={classes.cont}>
        <Typography className={classes.userHeader} variant="h4">
          Bet title
        </Typography>
      </Container>
    </>
  );
}
const mapStateToProps = (state) => {
  //own props
  //get user routeid/ match it with route id
  return { bet: state.bets, user: state.user };
};
export default connect(mapStateToProps, { getBet })(BetPage);
