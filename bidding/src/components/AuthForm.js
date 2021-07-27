import React from "react";
import { Box, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import asyncvalidate from "./asyncvalidate";
import { Field, reduxForm } from "redux-form";
import Input from "./Input";
const useStyles = makeStyles((theme) => ({
  formGroup: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  confirmBtn: {
    color: "white",
    marginTop: "10px",
    backgroundColor: "#9400D3",
    "&:hover": {
      backgroundColor: "#9400D3",
    },
  },
}));

const AuthForm = (props) => {
  const classes = useStyles();

  return (
    <form autoComplete="off" onSubmit={props.handleSubmit(props.onSubmit)}>
      <Box display="flex" className={classes.formGroup}>
        <Box>
          <Field
            name="username"
            type="text"
            component={Input}
            label="User Name"
          />
        </Box>
        <Box>
          <Field
            name="password"
            component={Input}
            label="Password"
            type="password"
          />
        </Box>
        <Button
          variant="contained"
          className={classes.confirmBtn}
          type="submit"
        >
          Submit
        </Button>
      </Box>
    </form>
  );
};

const validate = (formValues) => {
  const errors = {};

  if (!formValues.username) {
    errors.username = "You must enter a user name";
  }
  if (!formValues.password) {
    errors.password = "You must enter password";
  }
  if (formValues.password && formValues.password.length < 6) {
    errors.password = "Password needs to be at least 6 characters";
  }

  return errors;
};

export default reduxForm({
  form: "AuthForm",
  validate,
  asyncvalidate,
})(AuthForm);
