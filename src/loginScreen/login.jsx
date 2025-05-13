import React from "react";
import './login.css';
// import {FaUser } from  "react-icons/fa";


const Login =() =>{

return ( 
    <div className ='wrapper'>
            <h1>Login</h1>
            <div className ="input-box">
    <input type ="text" placeholder =' Enter Username'required/>
    {/* <FaUser  /> */}
            </div>

            <div className ="input-box">
                <input type ="password " placeholder =' Enter Password' required/>
                {/* <FaLock /> */}
            </div>
        <div className ="remember-forget"> 
        <label> <input  type ="checkbox"/> Remember me</label>
       
        </div>

<button type="submit">Login </button>
<div className="email-link">
   <p> Do you forget password?<a href="#">onclick</a></p> 
</div>
    </div>
)

}

export default Login