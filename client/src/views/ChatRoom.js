import React, { useState, useEffect, useRef } from "react";
import { useSocket } from "../contexts/SocketContext";
import { useUser } from "../contexts/UserContext";

export default function ChatRoom() {
  // States
  const [msgs, setMsgs] = useState([]); // Messages
  const [inputValue, setInputValue] = useState(""); // The input value
  const [onLastMsg, setOnLastMsg] = useState(true); // If you are on the last message

  const lastMsgRef = useRef(null); // Controll bottom of messages
  const socket = useSocket(); // For communicating with server
  const { username } = useUser(); // Your username

  // Scroll to bottom of messages
  const scrollDown = () => {
    lastMsgRef.current?.scrollIntoView({ smooth: true });
  };

  // Checks if you're on last message
  const onScroll = (e) => {
    setOnLastMsg(
      e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight
    );
  };

  // Sends message to server
  const sendMessage = (e) => {
    e.preventDefault();

    const msg = {
      user: username,
      date: new Date(),
      message: inputValue,
    };

    socket.emit("send-message", msg);

    setInputValue("");
  };

  // Scroll down if you're on last message or if you sent last message
  useEffect(() => {
    if (onLastMsg || msgs[msgs.length - 1]?.user === username) scrollDown();
  }, [msgs]);

  // Get all the messages from server
  useEffect(() => {
    if (socket == null) return;

    socket.emit("get-messages");
    socket.once("recieve-messages", (msg) => setMsgs(msg));
  }, [socket]);

  // Recieve message from server, and add it to messages
  useEffect(() => {
    if (socket == null) return;

    const addMessage = (msg) => {
      setMsgs((prevMsgs) => {
        return [...prevMsgs, msg];
      });
    };

    socket.on("recieve-message", addMessage);

    return () => socket.off("recieve-message", addMessage);
  }, [socket]);

  return (
    <div className="chat-container">
      <div className="chat-title">
        <h1>Messages</h1>
      </div>
      <div className="box chat-box">
        <div className="chat-msgs" onScroll={onScroll}>
          {msgs.map((msg) => (
            <Message user={username} msg={msg} key={msg.msg_id} />
          ))}
          <div ref={lastMsgRef} />
        </div>
        <form className="form chat-form" onSubmit={sendMessage}>
          <input
            className="input"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Aa"
          />
          <button className="btn" type="submit" disabled={!inputValue}>
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

// Create message
function Message({ user, msg }) {
  // If message from user
  if (msg.user) {
    return (
      <div className="msg-container">
        <div className="msg-side">{msg.user === user ? "You" : msg.user}:</div>
        <div className="msg-main">{msg.message}</div>
      </div>
    );
  }
  // If message from server
  else {
    const message = msg.message[1] ? "entered the chat" : "left the chat";
    return (
      <div className="msg-server">
        --{msg.message[0] === user ? "You" : msg.message[0]} {message}--
      </div>
    );
  }
}
