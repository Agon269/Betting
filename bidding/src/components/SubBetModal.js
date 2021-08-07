import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import SubBetForm from "./SubBetForm";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(0),
  },
  popBtn: {
    backgroundColor: "transparent",
    marginLeft: "5px",
    color: "#9400D3",
    borderColor: "#9400D3",
    marginTop: "20px",
    marginBottom: "20px",
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
}));

const SubBetModal = ({ creater }) => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = (formValues) => {
    //submit form
    creater(formValues);
  };
  return (
    <>
      <Button
        variant={"outlined"}
        className={classes.popBtn}
        onClick={handleClickOpen}
      >
        Create Sub bet
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        maxWidth="lg"
        classes={{ paper: classes.dialog }}
      >
        <DialogTitle id="form-dialog-title" className={classes.formHead}>
          <Typography className={classes.formTitle}>Create Sub bet</Typography>
        </DialogTitle>
        <DialogContent>
          <SubBetForm onSubmit={onSubmit} />
        </DialogContent>
      </Dialog>
    </>
  );
};
export default connect(null, {})(SubBetModal);
