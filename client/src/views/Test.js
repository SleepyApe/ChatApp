import React, { useEffect, useRef, useState } from "react";
import { useUser } from "../contexts/UserContext";

export default function Test() {
  const { username } = useUser();
  const [input, setInput] = useState("");
  const msgRef = useRef(null);
  const [msgs, setMsgs] = useState([
    {
      id: 1,
      user: "John",
      msg: "Hi",
    },
    {
      id: 2,
      user: "Alex",
      msg: "Hello",
    },
  ]);

  useEffect(() => {
    msgRef.current?.scrollIntoView({ smooth: true });
  }, [msgs]);

  function handleSubmit(e) {
    e.preventDefault();

    const msg = {
      id: msgs.length + 1,
      user: username,
      msg: input,
    };

    setMsgs((prevMsgs) => {
      return [...prevMsgs, msg];
    });

    setInput("");
  }

  return (
    <div className="chat-container">
      <div className="chat-title">
        <h1>Test</h1>
      </div>
      <div className="chat-box">
        <div className="chat-msgs">
          {msgs.map((msg) => {
            return (
              <div className="msg-container" key={msg.id}>
                <div className="msg-side">
                  {msg.user === username ? "You" : msg.user}:
                </div>
                <div className="msg-main"> {msg.msg}</div>
              </div>
            );
          })}
          <div ref={msgRef} />
        </div>
        <form className="msg-form">
          <input
            className="msg-form-input"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Aa"
          />
          <button className="msg-form-btn" onClick={handleSubmit}>
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
