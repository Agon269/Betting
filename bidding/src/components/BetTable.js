import React from "react";
import {
  TableHead,
  Table,
  TableContainer,
  Paper,
  TableCell,
  TableSortLabel,
  TableBody,
  TableRow,
} from "@material-ui/core";

import BetRow from "./BetRow";
import { makeStyles } from "@material-ui/core";
import { heads } from "../util/bets";
const BetTable = ({ bets }) => {
  const useStyles = makeStyles((theme) => ({
    table: {
      minWidth: 650,
    },
    tableContainer: {},
    heads: {
      color: " #9400D3",
      fontSize: "28px",
    },
  }));
  const classes = useStyles();

  return (
    <TableContainer
      component={Paper}
      className={classes.tableContainer}
      elevation={3}
    >
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.heads}>Creater</TableCell>

            <TableCell>
              <TableSortLabel>Side</TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel>Amount</TableSortLabel>
            </TableCell>

            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bets.map((row, i) => (
            <BetRow key={i} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default BetTable;
