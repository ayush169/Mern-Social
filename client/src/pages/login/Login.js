import React, { useRef, useContext } from "react";

import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";

import CircularProgress from "@mui/material/CircularProgress";

import "./login.css";

export default function Login() {
  const email = useRef();
  const password = useRef();
  const { user, isFetching, error, dispatch } = useContext(AuthContext);

  const handleClick = (e) => {
    e.preventDefault();
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
    // console.log();
  };

  console.log(user);
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Alphasocial</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Alphasocial.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input
              placeholder="Email"
              type="email"
              required
              className="loginInput"
              ref={email}
            />
            <input
              placeholder="Password"
              type="password"
              required
              minLength="5"
              className="loginInput"
              ref={password}
            />
            <button className="loginButton">
              {isFetching ? (
                <CircularProgress color="inherit" size={25} />
              ) : (
                "Login"
              )}
            </button>
            <span className="loginForgot">Forgot Password?</span>
            <button className="loginRegisterButton">
              {isFetching ? (
                <CircularProgress color="inherit" size={25} />
              ) : (
                "Create a New Account"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
