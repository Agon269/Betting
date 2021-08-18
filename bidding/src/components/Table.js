import React, { useState } from "react";
import { Box, Container, TableSortLabel, Typography } from "@material-ui/core";
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

import Loading from "./Loading";

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
    marginBottom: "40px",
    marginTop: "30px",
  },
}));

const MyTable = ({ rooms, getBets }) => {
  const classes = useStyles();

  const [hasSearched, setHasSearched] = useState(false);

  const userSearched = () => {
    setHasSearched(true);
  };
  const unsecussfulSearch = () => {
    getBets();
    setHasSearched(false);
  };
  //fetchingbets
  if (rooms.length === 0 && hasSearched === false) return <Loading />;
  //render bets

  return (
    <Container className={classes.tableContainer} component={Paper}>
      <Box display="flex" alignItems="center">
        <SearchBar userSearched={userSearched} />
        {hasSearched && rooms.length === 1 ? (
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
              <TableCell></TableCell>
              <TableCell className={classes.heads}>Bet Title</TableCell>
              {heads.map((head) => (
                <TableCell key={head}>
                  <TableSortLabel>{head}</TableSortLabel>
                </TableCell>
              ))}
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          {rooms.length === 0 && hasSearched ? (
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
              {rooms.map((row, i) => (
                <Row key={i} row={row} />
              ))}
            </TableBody>
          )}
        </Table>
      </TableContainer>
    </Container>
  );
};

export default MyTable;
