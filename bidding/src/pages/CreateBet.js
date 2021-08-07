import React from "react";
import {
  makeStyles,
  Paper,
  Container,
  Box,
  Typography,
} from "@material-ui/core";
import BetForm from "../components/BetForm";
import { connect } from "react-redux";
import { createBet } from "../actions/bet-actions";
const CreateBet = ({ createBet }) => {
  const useStyles = makeStyles((theme) => ({
    cont: {
      marginTop: "30px",
    },
  }));
  const classes = useStyles();

  const onSubmit = (formValues) => {
    createBet(formValues);
  };
  return (
    <Container component={Paper} maxWidth="md" className={classes.cont}>
      <Typography variant="h2">Create Bet</Typography>
      <Box maxWidth="700px">
        <Typography variant="subtitle1">
          Bet Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </Typography>
      </Box>
      <BetForm onSubmit={onSubmit} />
    </Container>
  );
};
export default connect(null, { createBet })(CreateBet);
