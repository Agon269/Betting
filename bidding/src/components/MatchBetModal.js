import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Box } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(0),
  },
  popBtn: {
    backgroundColor: "#9400D3",
    marginTop: "20px",
    marginBottom: "20px",
    color: "white",
    "&:hover": {
      backgroundColor: "#9400D3",
    },
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
}));

const MatchModal = ({ action }) => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        variant={"outlined"}
        className={classes.popBtn}
        onClick={handleClickOpen}
      >
        match bet
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        maxWidth="lg"
        classes={{ paper: classes.dialog }}
      >
        <DialogTitle id="form-dialog-title" className={classes.formHead}>
          <Typography className={classes.formTitle}>Match this bet</Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Warning, by agreeing to match this bet you are trusting the creater
            to decide the winner. Please make sure the creater of this bet is
            someone you know or a trusted user.
          </DialogContentText>
        </DialogContent>
        <Box textAlign="center" marginTop="30px">
          <Button className={classes.popBtn} onClick={() => action()}>
            i Agree
          </Button>
        </Box>
      </Dialog>
    </>
  );
};
export default MatchModal;
