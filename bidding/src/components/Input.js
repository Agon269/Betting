import React from "react";
import { InputBase, Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  text: {
    border: "1px solid #9400D3 ",
    borderRadius: "4px",
    height: "6vh",
    padding: theme.spacing(2),
    marginTop: theme.spacing(1),
    width: "100%",
    marginBottom: "10px",
  },
  error: {
    border: "1px solid red ",
    borderRadius: "4px",
    width: "100%",
    marginTop: theme.spacing(1),
    padding: theme.spacing(2),
    marginBottom: "5px",
    height: "6vh",
  },
  inputCont: {
    width: "100%",
  },
  errorText: {
    fontSize: "10px",
    color: "Red",
    marginBottom: "20px",
  },
}));

const Input = ({
  input,
  label,
  type,
  meta: { touched, invalid, error },
  ...custom
}) => {
  const classes = useStyles();

  return (
    <Box className={classes.inputCont}>
      <label>{label}</label>
      <InputBase
        label={label}
        type={type}
        error={(touched && invalid) || (touched && error)}
        className={error && touched ? classes.error : classes.text}
        {...input}
        {...custom}
        required
      />
      <Typography className={classes.errorText}>
        {error && touched ? error : ""}
      </Typography>
    </Box>
  );
};
export default Input;
