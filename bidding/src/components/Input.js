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
    border: "1px solid red",
    borderRadius: "4px",
    width: "100%",
    marginTop: theme.spacing(1),
    padding: theme.spacing(2),
    marginBottom: "5px",
    height: "6vh",

    "&:focus": {
      outline: "none!important",
      border: "1px solid #9400D3!important",
    },
  },
  errorArea: {
    border: "1px solid red",
    borderRadius: "4px",
    width: "100%",
    marginTop: theme.spacing(1),
    padding: theme.spacing(2),
    marginBottom: "5px",

    "&:focus": {
      outline: "none!important",
      border: "1px solid #9400D3!important",
    },
  },
  inputCont: {
    width: "100%",
    marginTop: "20px",
  },
  errorText: {
    fontSize: "15px",
    color: "Red",
    marginBottom: "20px",
  },
  textArea: {
    width: "100%",
    border: "1px solid #9400D3 ",
    padding: theme.spacing(2),
    marginTop: theme.spacing(1),
    borderRadius: "4px",
    marginBottom: "10px",
    font: "inherit",
    "&:focus": {
      outline: "none!important",
      border: "1px solid #9400D3!important",
    },
  },
}));
//because it rerenders on every change and redux form creates a problem

const Input = ({
  input,
  label,
  type,
  meta: { touched, invalid, error },
  des,
  select,
  options,
  ...custom
}) => {
  const classes = useStyles();
  if (des) {
    return (
      <Box className={classes.inputCont}>
        <label className={classes.labeled}>{label}</label>
        <textarea
          className={error && touched ? classes.errorArea : classes.textArea}
          required
          rows="6"
          {...custom}
          {...input}
        />
        <Typography className={classes.errorText}>
          {error && touched ? error : ""}
        </Typography>
      </Box>
    );
  } else if (select) {
    return (
      <Box className={classes.inputCont}>
        <label className={classes.labeled}>{label}</label>
        <select
          className={error && touched ? classes.error : classes.textArea}
          {...input}
          {...custom}
        >
          {options.map((option) => (
            <option value={option} key={option}>
              {option}
            </option>
          ))}
        </select>
      </Box>
    );
  } else {
    return (
      <Box className={classes.inputCont}>
        <label className={classes.labeled}>{label}</label>
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
  }
};
export default Input;
