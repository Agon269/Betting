import React from "react";
import { Button, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Field, reduxForm } from "redux-form";
import Input from "./Input";

const useStyles = makeStyles((theme) => ({
  formGroup: {
    justifyContent: "flex-start",
    maxWidth: "600px",
    padding: "5px",
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

const BetForm = ({ handleSubmit, onSubmit, pristine, submitting }) => {
  const classes = useStyles();

  return (
    <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={8}>
        <Grid item xs={6}>
          <Field name="title" type="text" label="Title" component={Input} />
          <Field
            label="Description"
            name="description"
            component={Input}
            des={true}
          />
          <Field label="Your side" name="side" component={Input} type="text" />
        </Grid>
        <Grid item xs={6}>
          <Field
            label="Category"
            name="category"
            component={Input}
            type="text"
            placeholder="sports"
          />
          <Field
            label="Expire date"
            name="enddate"
            component={Input}
            type="date"
          />
          <Field
            label="Amount to bet"
            name="amount"
            component={Input}
            type="number"
            placeholder="100"
          />
          <div>
            <Button
              type="submit"
              variant="contained"
              className={classes.confirmBtn}
              disabled={pristine || submitting}
            >
              Submit
            </Button>
            {/* <Button text="Reset" color="default" /> */}
          </div>
        </Grid>
      </Grid>
    </form>
  );
};

const validate = (formValues) => {
  const errors = {};

  if (!formValues.title) {
    errors.title = "You must enter a title";
  }
  if (!formValues.category) {
    errors.category = "You must enter category";
  }
  if (!formValues.side) {
    errors.side = "You must enter side your side";
  }
  if (!formValues.amount) {
    errors.amount = "You must enter side your amount";
  }

  if (!formValues.description) {
    errors.description = "you must enter description";
  }

  return errors;
};

export default reduxForm({
  form: "BetForm",
  validate,
})(BetForm);
