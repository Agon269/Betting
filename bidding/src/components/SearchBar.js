import React, { useState } from "react";
import { Box, Button, InputBase } from "@material-ui/core";
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
  btn: {
    backgroundColor: "#9400D3",
    color: "white",
    marginLeft: "10px",
    "&:hover": {
      backgroundColor: "#9400D3",
    },
  },
}));
const SearchBar = ({ search, userSearched }) => {
  const classes = useStyles();
  const [searchText, setSearchText] = useState("");
  const searchHandler = (text) => {
    userSearched();
    search(text);
  };
  return (
    <Box className={classes.searchBox}>
      <InputBase
        placeholder="Search by Id"
        variant="outline"
        className={classes.text}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <Button className={classes.btn} onClick={() => searchHandler(searchText)}>
        Search
      </Button>
    </Box>
  );
};
export default SearchBar;
