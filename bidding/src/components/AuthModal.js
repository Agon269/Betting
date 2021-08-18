import React, { useContext } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Box } from "@material-ui/core";
import { AuthContext } from "../Auth";
import AuthForm from "./AuthForm";
import betty from "../api/betty";
const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(0),
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
  formTitle: {
    fontSize: "32px",
  },
  out: {
    backgroundColor: "transparent",
    marginLeft: "5px",
    color: "#9400D3",
    borderColor: "#9400D3",
    marginTop: "10px",
  },
  switch: {
    color: "#9400D3",
    "&:hover": {
      cursor: "pointer",
    },
  },
}));

const AuthModal = ({ st }) => {
  const { onAuthChange } = useContext(AuthContext);

  const classes = useStyles();
  const [formType, setFormType] = React.useState("sign in");
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setFormType("sign in");
    setOpen(false);
  };
  //need to call the error message if error or call success message if success
  const onSubmit = async (formValues) => {
    let res;
    if (formType === "sign in") {
      try {
        res = await betty.post("/users/login", { ...formValues });
        const token = res.data.token;
        localStorage.setItem("jwtToken", token);
        onAuthChange(token);
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        res = await betty.post("/users/register", { ...formValues });
        const token = res.data.token;
        localStorage.setItem("jwtToken", token);
        onAuthChange(token);
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <div>
      <Button
        variant={"outlined"}
        className={st ? classes.out : classes.popBtn}
        onClick={handleClickOpen}
      >
        Sign in
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        maxWidth="lg"
        classes={{ paper: classes.dialog }}
      >
        <DialogTitle id="form-dialog-title" className={classes.formHead}>
          <Typography className={classes.formTitle}>
            {formType === "sign in" ? "Sign In" : "Sign up"}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Welcome to Betty Join us in our journey to make the best betting app
          </DialogContentText>
          <AuthForm onSubmit={onSubmit} />
          <Box textAlign="center" marginTop="30px">
            {formType === "sign in" ? (
              <Typography>
                Don't have an{" "}
                <span
                  className={classes.switch}
                  onClick={() => setFormType("sign up")}
                >
                  account ?
                </span>
              </Typography>
            ) : (
              <Typography>
                Already have an{" "}
                <span
                  className={classes.switch}
                  onClick={() => setFormType("sign in")}
                >
                  account ?
                </span>
              </Typography>
            )}
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default AuthModal;
