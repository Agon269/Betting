import React from "react";

import { makeStyles } from "@material-ui/core/styles";

import { TableCell, Button, TableRow, Typography } from "@material-ui/core";

import routeTo from "../util/btnrouting";
const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
      btn: {
        margin: "20px",
        color: "white",
      },
    },
  },
  btn: {
    backgroundColor: "#9400D3",
    color: "white",
    "&:hover": {
      backgroundColor: "#9400D3",
    },
  },
  for: {
    backgroundColor: "green",
    color: "white",
    padding: "2px",
    textAlign: "center",
    borderRadius: "5px",
  },
  against: {
    backgroundColor: "red",
    color: "white",
    padding: "2px",
    textAlign: "center",
    borderRadius: "5px",
  },
});
//just for rows
const BetRow = ({ row }) => {
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        {/* name of row */}
        <TableCell align="left" scope="row">
          {row.bettor.username}
        </TableCell>
        {/*   properties */}

        {row.side ? (
          <TableCell>
            <Typography className={classes.for}>For</Typography>
          </TableCell>
        ) : (
          <TableCell>
            <Typography className={classes.against}>Against</Typography>
          </TableCell>
        )}
        <TableCell>{row.amountBet}$</TableCell>
        <TableCell>
          <Button
            className={classes.btn}
            onClick={() => routeTo(`/bet/${row.id}`)}
            variant="contained"
          >
            view
          </Button>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};
export default BetRow;
