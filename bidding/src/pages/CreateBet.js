import React from "react";
import {
  makeStyles,
  Paper,
  Container,
  Box,
  Typography,
} from "@material-ui/core";
import BetForm from "../components/BetForm";
import { createBet } from "../api/api";
import { useMutation } from "react-query";
import history from "../history";

const useStyles = makeStyles((theme) => ({
  cont: {
    marginTop: "30px",
  },
}));

const CreateBet = () => {
  const classes = useStyles();

  //query here
  // isLoading: isMutating
  const { mutateAsync } = useMutation(createBet, {
    onSuccess: (data) => {
      history.push(`/bet/${data.id}`);
    },
  });
  const onSubmit = async (formValues) => {
    // createBet(formValues);
    await mutateAsync({ ...formValues });
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
export default CreateBet;
