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

const SubBetForm = ({ onSubmit }) => {
  const classes = useStyles();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm({ mode: "all" });

  return (
    <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
      <Box display="flex" className={classes.formGroup}>
        <Input
          name="amount"
          placeholder="100"
          type="number"
          label="Amount to bet"
          errors={errors.amount}
          {...register("amount", {
            required: { value: true, message: "You must enter amount" },
          })}
          ref={null}
        />

        <Input
          name="side"
          select={true}
          label="Side"
          options={["None", "For", "Against"]}
          errors={errors.side}
          {...register("side", {
            required: { value: true, message: "You must select side" },
          })}
          ref={null}
        />

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

export default SubBetForm;
