import React from "react";
import { Button, Grid, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Input from "./Input";
import { useForm } from "react-hook-form";

const useStyles = makeStyles((theme) => ({
  formGroup: {
    justifyContent: "flex-start",
    maxWidth: "600px",
    padding: "5px",
  },
  confirmBtn: {
    color: "white",
    marginTop: "10px",
    marginBottom: "20px",

    backgroundColor: "#9400D3",
    "&:hover": {
      backgroundColor: "#9400D3",
    },
  },
}));

const BetForm = ({ onSubmit }) => {
  const classes = useStyles();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm({ mode: "all" });
  return (
    <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={8}>
        <Grid item xs={12} sm={6}>
          <Input
            name="title"
            type="text"
            label="Title"
            errors={errors.title}
            {...register("title", {
              required: { value: true, message: "You must enter a title" },
            })}
            ref={null}
          />
          <Input
            name="description"
            des={true}
            label="Description"
            errors={errors.description}
            {...register("description", {
              required: { value: true, message: "You must enter description" },
              minLength: {
                value: 50,
                message: "Description needs to be at least 50 words.",
              },
            })}
            ref={null}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          {/* maybe change max to users wallet amount  aslo validation message*/}
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
            name="category"
            select={true}
            options={["Crypto", "Politics", "Sports", "Personal", "Other"]}
            type="number"
            label="Category"
            errors={errors.amount}
            placeholder="sports"
            {...register("category", {
              required: { value: true, message: "You must enter a date" },
            })}
            ref={null}
          />

          <Input
            name="enddate"
            type="date"
            label="Expire date"
            errors={errors.enddate}
            {...register("enddate", {
              required: { value: true, message: "You must enter a date" },
            })}
            ref={null}
          />
        </Grid>
      </Grid>
      <Box display="flex" justifyContent="flex-end">
        <Button
          type="submit"
          variant="contained"
          className={classes.confirmBtn}
          disabled={!isValid || isSubmitting}
        >
          Submit
        </Button>
      </Box>
    </form>
  );
};

export default BetForm;
