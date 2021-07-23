import React, { useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Box, Container, InputBase, TableSortLabel } from "@material-ui/core";
import Row from "./Row";
import { allBets, heads } from "../util/bets";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  searchBox: {
    padding: "20px",
  },
  text: {
    border: "2px solid #9400D3 ",
    height: "6vh",
    padding: theme.spacing(2),
  },
  heads: {
    color: " #9400D3",
  },
}));
const MyTable = () => {
  const classes = useStyles();
  const [bets, setBets] = useState(allBets);
  const [order, setOrder] = useState();
  const [orderBy, setOrderBy] = useState();

  const stableSort = (head) => {
    const isAsc = order === head && order === "asc";
    setOrder(isAsc ? "dsc" : "asc");
    setOrderBy(head);

    function compare(a, b) {
      if (a.creater < b.creater) {
        return -1;
      }
      if (a.creater > b.creater) {
        return 1;
      }
      return 0;
    }
    let sortedBets = bets.sort(compare);
    console.log(sortedBets);
  };
  return (
    <Container maxWidth="md">
      <TableContainer component={Paper}>
        <Box className={classes.searchBox}>
          <InputBase
            placeholder="Search by Id"
            variant="outline"
            className={classes.text}
          />
        </Box>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />

              {heads.map((head) => (
                <TableCell
                  key={head}
                  align={head === "Bet Title" ? "left" : "right"}
                  className={classes.heads}
                >
                  <TableSortLabel
                    activ={orderBy === head}
                    dirction={orderBy === head ? order : "asc"}
                    onClick={() => stableSort(head)}
                  >
                    {head}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {bets.map((row, i) => (
              <Row key={i} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};
export default MyTable;
