import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Cookies from "universal-cookie";
import { getUser } from "./actions";

const Auth = ({ getUser, user }) => {
  const cookies = new Cookies();
  const [loading, setLoading] = useState(true);
  const [coo, setCoo] = useState(cookies.get("user"));

  useEffect(() => {
    const authenticate = async () => {
      //FETCH USER USING COOKIE
      const { data } = await fetch("user/currentuser", {
        headers: { user: coo },
      });

      getUser(data);
      setLoading(false);
    };
    authenticate();
  }, [coo, getUser]);

  if (user.isSignedIn === false) return <div>Loading</div>;
  return null;
};
const mapStateToProps = (state) => {
  return { user: state.user };
};

export default connect(mapStateToProps, { getUser })(Auth);
