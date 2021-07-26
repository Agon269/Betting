import React, { useEffect, useState } from "react";
import { Box, Container, TableSortLabel, Typography } from "@material-ui/core";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@material-ui/core";
import Row from "./Row";
import SearchBar from "./SearchBar";
import { heads } from "../util/bets";
import { getBets, ascSort, dscSort, search } from "../actions";
const useStyles = makeStyles((theme) => ({
  heads: {
    color: " #9400D3",
    fontSize: "28px",
  },
  empty: {
    padding: "40px",
    textAlign: "center",
    fontSize: "28px",
  },
  tableContainer: {
    marginBottom: "80px",
  },
}));

const MyTable = ({ bets, getBets, ascSort, dscSort, search }) => {
  const classes = useStyles();
  const [currentSort, setCurrentSort] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  const stableSort = (head) => {
    if (bets.length === 0) {
      return null;
    }
    if (head === currentSort) {
      //descending
      dscSort(head);
      setCurrentSort(null);
    } else {
      ascSort(head);
      setCurrentSort(head);
    }
  };

  const userSearched = () => {
    setHasSearched(true);
  };
  const unsecussfulSearch = () => {
    getBets();
    setHasSearched(false);
  };
  //fetchingbets
  if (bets.length === 0 && hasSearched === false) return <div>Loading...</div>;
  //render bets
  return (
    <Container
      maxWidth="md"
      className={classes.tableContainer}
      component={Paper}
    >
      <Box display="flex" alignItems="center">
        {" "}
        <SearchBar search={search} userSearched={userSearched} />
        {hasSearched && bets.length === 1 ? (
          <Box>
            <Button variant="contained" onClick={() => unsecussfulSearch()}>
              Show all
            </Button>
          </Box>
        ) : (
          ""
        )}
      </Box>
      <TableContainer>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell className={classes.heads}>Bet Title</TableCell>
              {heads.map((head) => (
                <TableCell key={head} align="right">
                  <TableSortLabel onClick={() => stableSort(head)}>
                    {head}
                  </TableSortLabel>
                </TableCell>
              ))}
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          {bets.length === 0 && hasSearched ? (
            <Box className={classes.empty}>
              <Typography>No bets by this id</Typography>{" "}
              <Button
                variant="contained"
                onClick={() => {
                  unsecussfulSearch();
                }}
              >
                Go back
              </Button>
            </Box>
          ) : (
            <TableBody>
              {bets.map((row, i) => (
                <Row key={i} row={row} />
              ))}
            </TableBody>
          )}
        </Table>
      </TableContainer>
    </Container>
  );
};

export default connect(null, { getBets, ascSort, dscSort, search })(MyTable);
