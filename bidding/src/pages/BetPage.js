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
import { getBet } from "../actions/index";
import MyCard from "../components/MyCard";
function BetPage({ bet, getBet }) {
  useEffect(() => {
    getBet();
  }, [getBet]);

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
  const classes = useStyles();
  return (
    <>
      <Container component={Paper} className={classes.cont} maxWidth="md">
        <Typography className={classes.userHeader} variant="h4">
          Bet title
        </Typography>
        <Box maxWidth="600px">
          <Typography variant="subtitle">
            Bet Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </Typography>
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
          <MyCard head={"Bet Amount"} number={21} type={"money"} />
          <MyCard head={"End date"} number={"12/12/2021"} type={"date"} />
        </Box>
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
