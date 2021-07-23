import React, { useEffect, useState } from "react";
import { Box, Container, InputBase, TableSortLabel } from "@material-ui/core";
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
} from "@material-ui/core";
import Row from "./Row";
import { heads } from "../util/bets";
import { getBets, ascSort, dscSort } from "../actions";

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

const MyTable = ({ bets, getBets, ascSort, dscSort }) => {
  const classes = useStyles();
  const [currentSort, setCurrentSort] = useState("");
  //fetching bets
  useEffect(() => {
    getBets();
  }, [getBets]);

  const stableSort = (head) => {
    if (head === currentSort) {
      //descending
      dscSort(head);
      setCurrentSort(null);
    } else {
      ascSort(head);
      setCurrentSort(head);
    }
  };

  //error

  //waiting for bets to render
  if (bets.length === 0) return <div>Loading ...</div>;

  //render bets
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
                  <TableSortLabel onClick={() => stableSort(head)}>
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

const mapStateToProps = (state) => {
  return { bets: state.bets };
};
export default connect(mapStateToProps, { getBets, ascSort, dscSort })(MyTable);
