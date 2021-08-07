import React from "react";
import { Box, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { Field, reduxForm } from "redux-form";
import Input from "./Input";
const useStyles = makeStyles((theme) => ({
  formGroup: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  confirmBtn: {
    color: "white",
    marginTop: "50px",
    backgroundColor: "#9400D3",
    "&:hover": {
      backgroundColor: "#9400D3",
    },
  },
}));

const SubBetForm = ({ handleSubmit, onSubmit, pristine, submitting }) => {
  const classes = useStyles();

  return (
    <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
      <Box display="flex" className={classes.formGroup}>
        <Field
          name="amount"
          type="number"
          component={Input}
          label="Amount"
          placeholder="50"
          autoComplete="amount"
        />

        <Field
          name="side"
          select={true}
          options={["None", "For", "Against"]}
          component={Input}
          label="Side"
        />

        <Button
          variant="contained"
          className={classes.confirmBtn}
          type="submit"
          disabled={pristine || submitting}
        >
          Submit
        </Button>
      </Box>
    </form>
  );
};

const validate = (formValues) => {
  const errors = {};

  if (!formValues.amount) {
    errors.amount = "You must enter a amount";
  }
  if (formValues.side === "None") {
    errors.side = "You must enter side";
  }
  return errors;
};

export default reduxForm({
  form: "AuthForm",
  validate,
})(SubBetForm);
