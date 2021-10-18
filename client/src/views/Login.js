import { useState } from "react";
import { useUser } from "../contexts/UserContext";

export default function Login() {
  const [inputValue, setInputValue] = useState("");
  const { dispatch } = useUser();

  function handleSubmit(e) {
    e.preventDefault();
    dispatch({ type: "LOGIN", user: inputValue });
  }

  return (
    <div className="login-container">
      <div className="box login">
        <form className="form login-form" onSubmit={handleSubmit}>
          <input
            className="input login-input"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            type="text"
            placeholder="username"
            required
          />
          <button className="btn login-btn" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
