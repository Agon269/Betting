import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../Auth";
const ProtectedRoute = ({ component: RouteComponent, ...rest }) => {
  const {
    user: { currentUser },
  } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={(routerProps) =>
        !!currentUser ? (
          <RouteComponent {...routerProps} />
        ) : (
          <Redirect to={"/"} />
        )
      }
    />
  );
};
export default ProtectedRoute;
