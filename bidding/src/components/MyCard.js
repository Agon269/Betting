import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import CallMadeIcon from "@material-ui/icons/CallMade";
import PeopleOutlineIcon from "@material-ui/icons/PeopleOutline";
import EventBusySharpIcon from "@material-ui/icons/EventBusySharp";

const MyCard = ({ head, number, type }) => {
  const useStyles = makeStyles((theme) => ({
    myCard: {
      margin: "10px",
      minWidth: "300px",
      marginBottom: "20px",
      position: "relative",
    },
    stat: {
      textAlign: "center",
      display: "inline-block",
    },
    statIcon: {
      fontSize: "60px",
      position: "absolute",
      left: "80%",
      backgroundColor: "#9400D3",
      top: "-5%",
      color: "white",
    },
  }));
  const classes = useStyles();
  const icon = (type) => {
    switch (type) {
      case "money":
        return <AttachMoneyIcon className={classes.statIcon} />;
      case "won":
        return <CheckIcon className={classes.statIcon} />;
      case "lost":
        return <CloseIcon className={classes.statIcon} />;
      case "date":
        return <EventBusySharpIcon className={classes.statIcon} />;
      case "bet":
        return <CallMadeIcon className={classes.statIcon} />;
      case "people":
        return <PeopleOutlineIcon className={classes.statIcon} />;
      default:
        return null;
    }
  };

  return (
    <Card className={classes.myCard} elevation={3}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {head}
        </Typography>
        <Typography className={classes.stat} variant="h5" component="p">
          {number}
          {type === "money" ? "$" : ""}
        </Typography>
        {icon(type)}
      </CardContent>
    </Card>
  );
};
export default MyCard;
