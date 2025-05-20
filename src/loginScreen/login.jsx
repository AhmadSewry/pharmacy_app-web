import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./login.css";
import loginImage from "./assets/images/loginImage.jpg"

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate(); // Initialize navigation

  const handleLogin = () => {
    navigate("/home"); // Redirect to Homepage
  };

  return (
    <form onSubmit={handleLogin} className="wrapper">
      <img src={loginImage} alt="Login Logo" className="login-image" />
      <h1>Login</h1>
      <div className="input-box">
        <input type="text" placeholder="Enter Username" required />
      </div>

      <div className="input-box">
        <input type={showPassword ? "text" : "password"} placeholder="Enter Password" required />
        <span onClick={() => setShowPassword((prev) => !prev)} className="toggle-password">
          {showPassword ? <FaEye />:<FaEyeSlash />  }
        </span>
      </div>

      <div className="remember-forget">
        <label><input type="checkbox" /> Remember me</label>
      </div>

      <button type="submit">Login</button> {/* Navigate to Homepage */}
      
      <div className="email-link">
        <p>Do you forget password? <a href="#">onclick</a></p>
      </div>
    </form>
  );
};

export default Login;