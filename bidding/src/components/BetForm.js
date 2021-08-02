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
          <Field label="Description" name="desc" component={Input} des={true} />
          <Field label="Your side" name="side1" component={Input} type="text" />
          <Field
            label="The other side"
            name="side2"
            component={Input}
            type="text"
          />
        </Grid>
        <Grid item xs={6}>
          <Field
            label="Category"
            name="category"
            component={Input}
            type="text"
          />
          <Field
            label="Start date"
            name="strtdate"
            component={Input}
            type="date"
          />
          <Field
            label="Expire date"
            name="expdate"
            component={Input}
            type="date"
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
  if (!formValues.side1) {
    errors.side1 = "You must enter side your side";
  }
  if (!formValues.side2) {
    errors.side2 = "You must enter the other side";
  }
  if (!formValues.desc) {
    errors.desc = "you must enter description";
  }

  return errors;
};

export default reduxForm({
  form: "BetForm",
  validate,
})(BetForm);
