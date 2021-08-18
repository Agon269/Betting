import React from "react";
import { Box, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useForm } from "react-hook-form";
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

const AuthForm = ({ onSubmit }) => {
  const classes = useStyles();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm({ mode: "all" });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box display="flex" className={classes.formGroup}>
        <Box>
          <Input
            name="username"
            type="text"
            label="User Name"
            errors={errors.username}
            autoComplete="username"
            {...register("username", {
              required: { value: true, message: "You must enter a user name" },
            })}
            ref={null}
          />
        </Box>
        <Box>
          <Input
            name="password"
            label="Password"
            type="password"
            errors={errors.password}
            {...register("password", {
              required: { value: true, message: "You must enter a password" },
              minLength: {
                value: 8,
                message: "Password needs to be at least 8 characters",
              },
            })}
            ref={null}
            autoComplete="password"
          />
        </Box>
        <Button
          variant="contained"
          className={classes.confirmBtn}
          type="submit"
          disabled={!isValid || isSubmitting}
        >
          Submit
        </Button>
      </Box>
    </form>
  );
};

export default AuthForm;
