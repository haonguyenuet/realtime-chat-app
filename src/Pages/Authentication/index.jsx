import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Login from "./Login";
import Signup from "./Signup";

import "./index.css";
function Authentication() {
  return (
    <Router>
      <div className="auth__page">
        <div className="auth__container">
          {/* Logo */}
          <div className="logo">
            <img src={require("images/logo.png")} alt="logo" />
          </div>
          <Route path="/" exact component={Login} />
          <Route path="/signup" component={Signup} />
        </div>
      </div>
    </Router>
  );
}

export default Authentication;
