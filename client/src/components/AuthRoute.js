import React from "react";
import { Redirect, Route } from "react-router";
import { useUser } from "../contexts/UserContext";

// Must be authenticated to enter certain paths
export default function AuthRoute(props) {
  const { isAuth } = useUser();
  const { needAuth = true } = props;

  if (needAuth) {
    if (!isAuth && props.path !== "/login") return <Redirect to="/login" />;
    else if (isAuth && props.path === "/login") return <Redirect to="/room" />;
  }

  return <Route {...props} />;
}
