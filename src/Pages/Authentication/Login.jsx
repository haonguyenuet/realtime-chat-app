// Import
import React, { useState } from "react";
import { Link } from "react-router-dom";

import { signIn } from "actions/auth.action";
import { useDispatch, useSelector } from "react-redux";

// Component
export default function Login() {
  const dispatch = useDispatch();
  const { emailError, passwordError } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function clearInputs() {
    setEmail("");
    setPassword("");
  }

  // Handle Login
  function handleLogin(e) {
    // prevent page reloads
    e.preventDefault();
    // Check input
    const user = {
      email,
      password,
    };
    dispatch(signIn(user));
    clearInputs();
  }

  return (
    <form onSubmit={handleLogin}>
      {/* Title */}
      <h2 className="auth__title">Login</h2>
      <div className="auth__form-control">
        <label htmlFor="email">Email</label>
        <input
          type="text"
          required
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <p className="errorMsg">{emailError}</p>
      </div>
      <div className="auth__form-control">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          required
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p className="errorMsg">{passwordError}</p>
      </div>
      {/* Direct */}
      <div className="btnContainer">
        <button type="submit">Log in</button>
        <p>
          You don't have an account ? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </form>
  );
}
