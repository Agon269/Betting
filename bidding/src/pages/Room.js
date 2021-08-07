import React, { useEffect } from "react";
import {
  makeStyles,
  Paper,
  Container,
  Box,
  Typography,
} from "@material-ui/core";
import { connect } from "react-redux";
import { getRoom } from "../actions/room-actions";
import { createSubBet } from "../actions/bet-actions";
import MyCard from "../components/MyCard";
import Loading from "../components/Loading";
import BetTable from "../components/BetTable";
import SubBetModal from "../components/SubBetModal";
const useStyles = makeStyles((theme) => ({
  cont: {
    marginTop: "30px",
    padding: "20px",
  },
  secondBtn: {
    backgroundColor: "transparent",
    marginLeft: "5px",
    color: "#9400D3",
    borderColor: "#9400D3",
    marginTop: "20px",
    marginBottom: "20px",
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
}));
function Room({ room, getRoom, match, user, createSubBet }) {
  const { id } = match.params;

  useEffect(() => {
    getRoom(id);
  }, [getRoom, id]);
  const classes = useStyles();

  if (!room) {
    return <Loading />;
  }

  const creater = (formValues) => {
    //create sub bet here
    createSubBet(id, formValues);
  };
  return (
    <>
      <Container component={Paper} className={classes.cont} maxWidth="md">
        <Typography className={classes.userHeader} variant="h4">
          {room.title}
        </Typography>
        <Box maxWidth="600px">
          <Typography variant="subtitle1">{room.description}</Typography>
        </Box>
        {user.isSignedIn ? (
          <Box className={classes.btnBox}>
            <SubBetModal creater={creater} />
          </Box>
        ) : null}
      </Container>
      <Container component={Paper} className={classes.cont} maxWidth="md">
        <Typography className={classes.userHeader} variant="h4">
          Bet Stats
        </Typography>
        <Box
          display="flex"
          flexWrap="wrap"
          justifyContent="space-between"
          alignItems="center"
        >
          <MyCard
            head={"People betting"}
            number={room.bets.length}
            type={"people"}
          />
          <MyCard
            head={"Sub bets"}
            number={Math.floor(room.bets.length / 2)}
            type={"bet"}
          />

          <MyCard head={"End date"} number={room.endTime} type={"date"} />
        </Box>
      </Container>
      <Container className={classes.cont} maxWidth="md">
        <BetTable bets={room.bets} />
      </Container>
    </>
  );
}
const mapStateToProps = (state, ownProps) => {
  return {
    room: state.room[ownProps.match.params.id],
    user: state.user,
  };
};
export default connect(mapStateToProps, { getRoom, createSubBet })(Room);
