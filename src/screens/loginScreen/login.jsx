import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./login.css";
import loginImage from "./assets/images/loginImage.jpg";
import { host } from "../../App";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        host+"/api/Account/login",
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
      console.log(data);
      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("refreshToken", data.refreshToken);
        localStorage.setItem("role", data.role);
      
        // 👇 نفرض أن الـ API بيرجع userId مع بيانات تسجيل الدخول
        const userId = data.id;
      
        console.log("cccccccc",userId);
        
        if (userId) {
          console.log("hi");
          try {
            const empResponse = await fetch(
              host+`/api/Employee/by-user-id/${userId}`,
              {
                headers: {
                  "Authorization": `Bearer ${data.token}`,
                  
                  "Content-Type": "application/json",
                },
                
              }
              
            
            );
            console.log("data", data);

      
            if (!empResponse.ok) throw new Error("Failed to fetch employee");
      
            const empData = await empResponse.json();
      
            // 👇 حفظ الاسم في localStorage
            localStorage.setItem("personName", empData.personName);
            localStorage.setItem("userId", userId);
            localStorage.setItem("employeeID", empData.employeeID);
            //localStorage.setItem("employeName", empData.employeNmae);

          } catch (err) {
            console.error("Error fetching employee:", err);
          }
        }
      
        navigate("/home");
      
      
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

// === Refresh Token Utility ===

export const refreshToken = async () => {
  const token = localStorage.getItem("token");
  const refreshToken = localStorage.getItem("refreshToken");

  try {
    const response = await fetch(host+"/api/Account", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: token,
        refreshToken: refreshToken,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to refresh token");
    }

    const data = await response.json();

    localStorage.setItem("token", data.token);
    localStorage.setItem("refreshToken", data.refreshToken);

    return data.token;
  } catch (error) {
    console.error("Token refresh error:", error);
    localStorage.clear();
    window.location.href = "/";
  }
};
