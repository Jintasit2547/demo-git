import React from "react";
import "./LoginPage.css";

const LoginPage = () => {
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:5000/auth/google";
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="title">StudentPort.com</h1>

        <input type="email" placeholder="Email" className="input-field" />
        <input type="password" placeholder="Password" className="input-field" />

        <div className="link-row">
          <a href="#" className="link">forgot password</a>
          <a href="#" className="link">change password</a>
        </div>

        <button className="login-btn">Log in</button>
        <div className="divider">or</div>

        <button className="google-btn" onClick={handleGoogleLogin}>
          Login with Google
        </button>

        <div className="signup-text">
          Don't have an account? <a href="#">Sign up here</a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;