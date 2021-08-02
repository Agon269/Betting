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
        <TableCell component="th" scope="row">
          {row.title}
        </TableCell>
        {/*   properties */}

        <TableCell align="right">{row.creater}</TableCell>
        <TableCell align="right">{row.expireDate}</TableCell>
        <TableCell align="right">{row.betAmount}</TableCell>
        <TableCell align="right">{row.category}</TableCell>
        <TableCell align="right">
          <Button className={classes.btn} variant="contained">
            Bet
          </Button>
        </TableCell>
      </TableRow>
      {/* more details section for the row */}
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Sub bets
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Creater</TableCell>
                    <TableCell>Bet Amount</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.subBets.map((subBet) => (
                    <TableRow key={subBet.creater}>
                      <TableCell>{subBet.creater}</TableCell>
                      <TableCell>{subBet.betAmount}</TableCell>
                      <TableCell>
                        <Button className={classes.btn}>Bet</Button>
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
