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
import Row from "./Row";
import { makeStyles } from "@material-ui/core";
import { heads, allBets } from "../util/bets";
const UserTable = () => {
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
            <TableCell />
            <TableCell className={classes.heads}>Bet Title</TableCell>
            {heads.map((head) => (
              <TableCell key={head}>
                <TableSortLabel>{head}</TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {allBets.map((row, i) => (
            <Row key={i} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default UserTable;
