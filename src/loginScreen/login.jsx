import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./login.css";
import HomePage from "../homePageScreen/homePage";
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate(); // Initialize navigation

  const handleLogin = () => {
    navigate("/home"); // Redirect to Homepage
  };

  return (
    <div className="wrapper">
      <h1>Login</h1>
      <div className="input-box">
        <input type="text" placeholder="Enter Username" required />
      </div>

      <div className="input-box">
        <input type={showPassword ? "text" : "password"} placeholder="Enter Password" required />
        <span onClick={() => setShowPassword((prev) => !prev)} className="toggle-password">
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </span>
      </div>

      <div className="remember-forget">
        <label><input type="checkbox" /> Remember me</label>
      </div>

      <button type="submit" onClick={handleLogin}>Login</button> {/* Navigate to Homepage */}
      
      <div className="email-link">
        <p>Do you forget password? <a href="#">onclick</a></p>
      </div>
    </div>
  );
};

export default Login;