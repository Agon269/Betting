import React, { useState, useEffect } from "react";

import betty from "./api/betty";
import Loading from "./components/Loading";
export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [coo, setCoo] = useState(localStorage.getItem("jwtToken"));

  const auth = async (token) => {
    if (token) {
      localStorage.setItem("jwtToken", token);
      setCoo(token);
      const { data } = await betty.get("/users/userdata");
      setUser({ isSignedIn: true, currentUser: data });
      setLoading(false);
    } else {
      setUser({ isSignedIn: false, currentUser: null });
    }
  };

  useEffect(() => {
    const authenticate = async () => {
      const { data } = await betty.get("/users/userdata");
      setUser({ isSignedIn: true, currentUser: data.user });
      setLoading(false);
    };
    if (coo) {
      authenticate();
    } else {
      setUser({ isSignedIn: false, currentUser: null });
      setLoading(false);
    }
  }, [coo]);

  const logOut = async () => {
    localStorage.removeItem("jwtToken");
  };

  if (loading) {
    return <Loading />;
  }
  return (
    <AuthContext.Provider value={{ user, onAuthChange: auth, logOut: logOut }}>
      {children}
    </AuthContext.Provider>
  );
};
