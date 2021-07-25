import { Box, Container, Typography, Paper, Button } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  btnBox: {
    marginTop: "20px",
  },
  secondBtn: {
    backgroundColor: "transparent",
    marginLeft: "5px",
    color: "#9400D3",
    borderColor: "#9400D3",
  },
  btn: {
    backgroundColor: "#9400D3",
    marginRight: "10px",
    color: "white",
    "&:hover": {
      backgroundColor: "#9400D3",
    },
  },
}));
export default function BetDetails() {
  const classes = useStyles();

  return (
    <Container component={Paper} maxWidth="md">
      <Box>
        <Typography variant="h4">Bitcoin will reach 500k</Typography>
        <Typography variant="h6" gutterBottom>
          body1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
          blanditiis tenetur unde suscipit, quam beatae rerum inventore
          consectetur, neque doloribus, cupiditate numquam.
        </Typography>
        <Typography varuant="h6">Amount : 2000$</Typography>
      </Box>
      <Box className={classes.btnBox}>
        <Button className={classes.btn}>Bet against?</Button>
        <Button className={classes.secondBtn} variant="outlined">
          Create a sub bet
        </Button>
      </Box>
    </Container>
  );
}
