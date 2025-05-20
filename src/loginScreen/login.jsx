import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./login.css";
import loginImage from "./assets/images/loginImage.jpg";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault(); // Prevent default form submission

    try {
      const response = await fetch(
        "http://176.27.1.10:5200/api/Account/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userName: username,
            password: password,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();

      if (data.token) {
        localStorage.setItem("token", data.token); // Store token
        navigate("/home"); // Redirect to homepage
      } else {
        alert("Invalid credentials. Please try again.");
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login failed. Please check your credentials and try again.");
    }
  };
  return (
    <div className="container">
      <form onSubmit={handleLogin} className="wrapper">
        <img src={loginImage} alt="Login Logo" className="login-image" />
        <h1>Login</h1>
        <div className="input-box">
          <input
            type="text"
            placeholder="Enter Username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="input-box">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span
            onClick={() => setShowPassword((prev) => !prev)}
            className="toggle-password"
          >
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </span>
        </div>
        <div className="remember-forget">
          <label>
            <input type="checkbox" /> Remember me
          </label>
        </div>
        <button type="submit">Login</button>
        <div className="email-link">
          <a href="#">Forget password?</a>
        </div>
      </form>
    </div>
  );
};

export default Login;
