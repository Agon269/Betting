import React from "react";
import { Box, Button, InputBase, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { Field, reduxForm } from "redux-form";
const useStyles = makeStyles((theme) => ({
  formGroup: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    border: "1px solid #9400D3 ",
    height: "6vh",
    padding: theme.spacing(2),
    marginBottom: "20px",
  },
  error: {
    border: "1px solid red ",
  },
}));

const AuthForm = ({ submitHandler }) => {
  const classes = useStyles();
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  function renderError(error, touched) {
    if (touched && error) {
      return (
        <div>
          <div>{error}</div>
        </div>
      );
    }
  }
  const renderTextField = ({
    input,
    label,
    meta: { touched, error },
    ...custom
  }) => (
    <div>
      <InputBase
        hintText={"Incorrect intery"}
        label={label}
        error={touched && error}
        className={error && touched ? classes.error : classes.text}
        {...custom}
      />
      <div>{renderError(error, touched)}</div>
    </div>
  );

  return (
    <form autoComplete="off" onSubmit={(e) => handleSubmit(e)}>
      <Box display="flex" className={classes.formGroup}>
        <Box>
          <Field
            placeholder="User Name"
            name="userName"
            component={renderTextField}
            label="User Name"
          />
        </Box>
        <Box>
          <Field
            placeholder="password"
            name="password"
            component={renderTextField}
            label="Password"
            type="password"
          />
        </Box>
        <Button className="ui button" type="submit">
          Submit
        </Button>
      </Box>
    </form>
  );
};

const validate = (formValues) => {
  const errors = {};

  if (!formValues.userName) {
    errors.userName = "You must enter a title";
  }
  if (!formValues.password) {
    errors.password = "Password needs to be at least 6 characters";
  }
  console.log(errors);
  return errors;
};

export default reduxForm({
  form: "AuthForm",
  validate,
})(AuthForm);
