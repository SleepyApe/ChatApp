import React, { useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useUser } from "./UserContext";

const SocketContext = React.createContext();

// Custom hook to get access to contex
export function useSocket() {
  return useContext(SocketContext);
}

export function SocketProvider(props) {
  const [socket, setSocket] = useState(); // Store socket
  const { username } = useUser(); // Get username

  // Connect socket to server with username
  useEffect(() => {
    const s = io("http://localhost:3001", { query: { username } });
    setSocket(s);

    return () => s.disconnect();
  }, [username]);

  return (
    <SocketContext.Provider value={socket}>
      {props.children}
    </SocketContext.Provider>
  );
}
