import React, { useContext, useReducer } from "react";
import { userReducer } from "../reducers/UserReducer";

const UserContext = React.createContext();

// Custom hook to get access to contex
export function useUser() {
  return useContext(UserContext);
}

export default function UserProvider(props) {
  // Get user from localstorage
  const [user, dispatch] = useReducer(userReducer, {}, () => {
    return {
      isAuth: !!localStorage.getItem("usr"),
      username: JSON.parse(localStorage.getItem("usr")) || "",
    };
  });

  return (
    <UserContext.Provider value={{ ...user, dispatch }}>
      {props.children}
    </UserContext.Provider>
  );
}
