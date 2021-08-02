import React, { useEffect } from "react";
import {
  makeStyles,
  Paper,
  Container,
  Box,
  Typography,
  Button,
} from "@material-ui/core";
import { connect } from "react-redux";
import { getBet } from "../actions/bet-actions";
import MyCard from "../components/MyCard";
const useStyles = makeStyles((theme) => ({
  cont: {
    marginTop: "30px",
  },
  secondBtn: {
    backgroundColor: "transparent",
    marginLeft: "5px",
    color: "#9400D3",
    borderColor: "#9400D3",
  },
  userHeader: {
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
  btn: {
    backgroundColor: "#9400D3",
    marginTop: "20px",
    marginBottom: "20px",
    color: "white",
    "&:hover": {
      backgroundColor: "#9400D3",
    },
  },
}));
function BetPage({ bet, getBet, match }) {
  const { id } = match.params;

  useEffect(() => {
    getBet(id);
  }, [getBet, id]);
  const classes = useStyles();
  console.log(bet);
  if (!bet) {
    return <div>Loadding ..</div>;
  }
  return (
    <>
      <Container component={Paper} className={classes.cont} maxWidth="md">
        <Typography className={classes.userHeader} variant="h4">
          {bet.room.title}
        </Typography>
        <Box maxWidth="600px">
          <Typography variant="subtitle1">{bet.room.description}</Typography>
        </Box>
        <Box className={classes.btnBox}>
          <Button className={classes.btn}>Bet against</Button>
          <Button className={classes.secondBtn} variant="outlined">
            Create a sub bet
          </Button>
        </Box>
      </Container>
      <Container component={Paper} className={classes.cont} maxWidth="md">
        <Typography className={classes.userHeader} variant="h4">
          Bet Stats
        </Typography>
        <Box
          display="flex"
          flexWrap="wrap"
          justifyContent="space-between"
          alignItems="center"
        >
          <MyCard head={"People betting"} number={4} type={"people"} />
          <MyCard head={"Sub bets"} number={3} type={"bet"} />
          <MyCard head={"Bet Amount"} number={bet.amountBet} type={"money"} />
          <MyCard head={"End date"} number={bet.room.endTime} type={"date"} />
        </Box>
      </Container>
    </>
  );
}
const mapStateToProps = (state, ownProps) => {
  let bets = Object.values(state.bets);
  let newBets = bets.filter((bet) => bet.room === ownProps.match.params.id);
  //own props
  //get user routeid/ match it with route id
  return {
    bet: state.bets[ownProps.match.params.id],
    bets: newBets,
    user: state.user,
  };
};
export default connect(mapStateToProps, { getBet })(BetPage);
