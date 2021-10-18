import React from "react";
import { useHistory } from "react-router";
import { useUser } from "../contexts/UserContext";

export default function NavBar() {
  const { dispatch, isAuth } = useUser();
  const history = useHistory();

  const Logout = () => dispatch({ type: "LOGOUT" });
  const Login = () => history.push("/login");
  const Room = () => history.push("/room");
  const Test = () => history.push("/test");

  return (
    <div className="nav-container">
      <h3 className="nav-header">Chat App</h3>
      <div className="nav-btn" onClick={Room}>
        Room
      </div>
      <div className="nav-btn" onClick={Test}>
        Test
      </div>
      {isAuth ? (
        <div className="nav-btn nav-btn-end" onClick={Logout}>
          Logout
        </div>
      ) : (
        <div className="nav-btn nav-btn-end" onClick={Login}>
          Login
        </div>
      )}
    </div>
  );
}
