import React from "react";
import { Field, Form, Formik } from "formik";
import { Box, InputBase, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
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
}));
const AuthForm = () => {
  const classes = useStyles();

  return (
    <Box display="flex" className={classes.formGroup}>
      <Box>
        <InputBase
          placeholder="User name"
          variant="outline"
          className={classes.text}
        />
      </Box>
      <Box>
        <InputBase
          placeholder="Password"
          type="password"
          variant="outline"
          className={classes.text}
        />
      </Box>
    </Box>
  );
};
export default AuthForm;
