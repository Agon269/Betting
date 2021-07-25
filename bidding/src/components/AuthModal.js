import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import AuthForm from "./AuthForm";
const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(0),
  },
  confirmBtn: {
    backgroundColor: "transparent",
    color: "#9400D3",
    borderColor: "#9400D3",
  },
  popBtn: {
    color: "white",
    backgroundColor: "transparent",
    marginLeft: "5px",
  },
  dialog: {
    border: "2px solid #9400D3",
    maxWidth: "920px",
    padding: "20px 50px",
    alignItems: "center",
    borderRadius: "10px",
    position: "absolute",
    top: theme.spacing(5),
  },
}));

const AuthModal = ({ type }) => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = (formValues) => {
    console.log(formValues);
  };
  return (
    <div>
      <Button className={classes.popBtn} onClick={handleClickOpen}>
        {type === "signin" ? "Sign In" : "Sign up"}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        maxWidth="lg"
        classes={{ paper: classes.dialog }}
      >
        <DialogTitle id="form-dialog-title" className={classes.formHead}>
          <Typography variant="h4">
            {" "}
            {type === "signin" ? "Sign In" : "Sign up"}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Welcome to Betty Join us in our journey to make the best betting app
          </DialogContentText>
          <AuthForm onSubmit={onSubmit} />
        </DialogContent>
        {/* <DialogActions className={classes.actions}>
          <Button
            onClick={handleClose}
            className={classes.confirmBtn}
            variant="outlined"
          >
            {type === "signin" ? "Sign In" : "Sign up"}
          </Button>
          <Button onClick={handleClose} variant="contained">
            Cancel
          </Button>
        </DialogActions> */}
      </Dialog>
    </div>
  );
};
export default AuthModal;
