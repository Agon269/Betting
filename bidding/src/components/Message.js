import React, { useEffect } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { connect } from "react-redux";
import { dissMessage } from "../actions/alert-actions";
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const Message = ({ alert, dissMessage }) => {
  useEffect(() => {
    let timer;
    if (alert.type) timer = setTimeout(() => dissMessage(), 2000);
    return () => {
      clearTimeout(timer);
    };
  });
  if (!alert.dismiss && alert.type) {
    return (
      <Snackbar open={true} autoHideDuration={6000}>
        <Alert severity={alert.type}>{alert.message}</Alert>
      </Snackbar>
    );
  } else {
    return null;
  }
};
const mapStateToProps = (state) => {
  return { alert: state.alert };
};
export default connect(mapStateToProps, { dissMessage })(Message);
