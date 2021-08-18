import React, { useState, useContext } from "react";
import {
  makeStyles,
  Paper,
  Container,
  Box,
  Typography,
  Button,
} from "@material-ui/core";
import Loading from "../components/Loading";
import MatchBetModal from "../components/MatchBetModal";
import { useQuery, useMutation } from "react-query";
import { AuthContext } from "../Auth";
import { matchBet, editBetCall, getBet } from "../api/api";

const useStyles = makeStyles((theme) => ({
  cont: {
    marginTop: "30px",

    paddingBottom: "15px",
  },
  userHeader: {
    paddingTop: "40px",
  },
  tableHeader: {
    margin: "40px",
    paddingTop: "20px",
  },
  tableCont: {
    marginTop: "40px",
    marginBottom: "60px",
    paddingBottom: "40px",
  },
  for: {
    backgroundColor: "green",
    color: "white",
    padding: "10px",
    textAlign: "center",
    borderRadius: "5px",
    display: "inline",
    marginTop: "10px",
  },
  against: {
    backgroundColor: "red",
    color: "white",
    padding: "10px",
    textAlign: "center",
    borderRadius: "5px",
    display: "inline",
    marginTop: "10px",
  },
  chip: {
    padding: "10px",
    textAlign: "center",
    borderRadius: "5px",
    display: "inline",
    border: "1px solid #9400D3",
    marginLeft: "5px",
    marginTop: "10px",
  },
  tags: {
    marginTop: "20px",
    display: "flex",
    flexWrap: "wrap",
  },
  selc: {
    width: "100%",
    border: "1px solid #9400D3 ",
    padding: theme.spacing(2),
    marginTop: theme.spacing(1),
    borderRadius: "4px",
    marginBottom: "10px",
    font: "inherit",
    "&:focus": {
      outline: "none!important",
      border: "1px solid #9400D3!important",
    },
  },
  btn: {
    backgroundColor: "transparent",
    marginLeft: "5px",
    color: "#9400D3",
    borderColor: "#9400D3",
    marginTop: "10px",
  },
}));
function BetPage({ match }) {
  const classes = useStyles();
  const { user } = useContext(AuthContext);

  const { id } = match.params;
  const [params, setParams] = useState({
    amount: "",
    side: "",
  });
  const {
    data: bet,
    error,
    isLoading,
    isError,
  } = useQuery(["bets", { id }], getBet);

  const { mutateAsync, isLoading: isMutating } = useMutation(matchBet, {
    onSuccess: (data) => {
      //send popup
      //need to invalidate cache to refreseh
      console.log(data);
    },
  });
  const { mutateAsync: editBet, isLoading: editing } = useMutation(
    editBetCall,
    {
      onSuccess: (data) => {
        //send popup
        //need to invalidate cache to refreseh
        console.log(data);
      },
    }
  );

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <div>Error {error.message}</div>;
  }

  //query here
  const handleMatch = async () => {
    await mutateAsync(id);
  };
  const onChangeHandler = ({ target }) => {
    setParams((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  //query here
  const editHandler = (e) => {
    e.preventDefault();
    //validate here
    console.log(params);
    editBet({ id, params });
  };

  return (
    <>
      <Container component={Paper} className={classes.cont} maxWidth="md">
        <Typography className={classes.userHeader} variant="h4">
          {bet.room.title}
        </Typography>
        <Box maxWidth="600px">
          <Typography variant="subtitle1">{bet.room.description}</Typography>
        </Box>

        <Box className={classes.tags}>
          {bet.side ? (
            <Typography className={classes.for}>Side: For </Typography>
          ) : (
            <Typography className={classes.against}>Side: Against</Typography>
          )}
          <Typography className={classes.chip}>
            Amount : {bet.amountBet}$
          </Typography>
          <Typography className={classes.chip}>User : name</Typography>
        </Box>

        <Box>
          {user.isSignedIn &&
          !bet.opposingBet &&
          user.currentUser.id !== bet.bettor ? (
            <MatchBetModal isMutating={isMutating} action={handleMatch} />
          ) : null}
        </Box>
        <Box>
          {user.isSignedIn &&
          user.currentUser.id === bet.bettor &&
          !bet.opposingBet ? (
            <>
              <Box
                display="flex"
                flexDirection="column"
                className={classes.tags}
                maxWidth={"300px"}
              >
                <form onSubmit={(e) => editHandler(e)}>
                  <Box>
                    <label>Change side</label>
                    <select
                      name="side"
                      className={classes.selc}
                      onChange={(e) => {
                        onChangeHandler(e);
                      }}
                    >
                      <option value={""}>none</option>
                      <option value={true}>For</option>
                      <option value={false}>Against</option>
                    </select>
                  </Box>
                  <Box>
                    <label>Change Amount</label>
                    <input
                      className={classes.selc}
                      name="amount"
                      type="number"
                      placeholder={bet.amountBet}
                      value={params.amountBet}
                      onChange={(e) => {
                        onChangeHandler(e);
                      }}
                    />
                  </Box>
                  <Button
                    className={classes.btn}
                    disabled={editing}
                    type="submit"
                  >
                    Submit
                  </Button>
                </form>
              </Box>
            </>
          ) : (
            ""
          )}
        </Box>
      </Container>
    </>
  );
}

export default BetPage;
