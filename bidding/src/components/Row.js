import React from "react";

import { makeStyles } from "@material-ui/core/styles";

import {
  Table,
  Typography,
  IconButton,
  TableBody,
  TableCell,
  Button,
  TableHead,
  TableRow,
  Collapse,
  Box,
} from "@material-ui/core";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
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
const Row = ({ row }) => {
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        {/* drop down button */}
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        {/* name of row */}
        <TableCell align="left" scope="row">
          {row.title}
        </TableCell>
        {/*   properties */}

        <TableCell>{row.owner.username}</TableCell>
        <TableCell>{row.endTime}</TableCell>
        <TableCell>{row.category}</TableCell>
        <TableCell>
          <Button
            className={classes.btn}
            onClick={() => routeTo(`/room/${row.id}`)}
            variant="contained"
          >
            view
          </Button>
        </TableCell>
      </TableRow>
      {/* more details section for the row sub bets here */}
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Bets
              </Typography>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Creater</TableCell>
                    <TableCell>Side</TableCell>
                    <TableCell>Bet Amount</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.bets.map((subBet) => (
                    <TableRow key={subBet.id}>
                      <TableCell>{subBet.bettor}</TableCell>
                      {subBet.side ? (
                        <TableCell>
                          <Typography className={classes.for}>For</Typography>
                        </TableCell>
                      ) : (
                        <TableCell>
                          <Typography className={classes.against}>
                            Against
                          </Typography>
                        </TableCell>
                      )}

                      <TableCell>{subBet.amountBet}</TableCell>
                      <TableCell>
                        <Button
                          className={classes.btn}
                          onClick={() => routeTo(`/bet/${subBet.id}`)}
                        >
                          View bet
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};
export default Row;
