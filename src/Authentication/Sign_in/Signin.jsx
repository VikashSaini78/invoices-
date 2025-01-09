import { useState } from "react";
import "./Signin.css"
import { BiHide } from "react-icons/bi";
import { FaEye } from "react-icons/fa";
import { CiFacebook } from "react-icons/ci";
import { CiTwitter } from "react-icons/ci";
import { FaGoogle } from "react-icons/fa6";

import { Link } from "react-router-dom";
function Signin() {
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
  
    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };
  
    return ( 
        <>
           <div className="sign_in-container">
           <div className="signin_div">
           <div className="signin_logo">
            <img src="./media/response infoway_logo.jpg" alt=""/>

            </div>
           <div className="login_page">
           <h6>Welcome Back !</h6>
           <p>Sign in to continue to Invoika.</p>

           <label className="form-label">Username</label>
          <input type="text" className="form-control" placeholder="Enter Username"/>
           

      <label  className="form-label">Password:</label>
      <input
       className="form-control"
        type={showPassword ? "text" : "password"}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter password"
      
      />

      <div className="heide_show" onClick={togglePasswordVisibility}> 
        {showPassword ?  <BiHide />: <FaEye />}
       </div>

       <div className="rember_forgatepass"><div><input class="form-check-input" type="checkbox"/>Remember me</div><Link>  <p>Forgot your password ?</p></Link></div>
     

       <button type="button" class="btn btn" id="login_btn">Log in</button>

          <div className="hrsign-in"><hr className="signin-other-title"/> Sign in with</div>

          <div className="socalmedia_icons">
           <i className="facbook_i"> <CiFacebook/></i>
           <i className="twitter_i"><CiTwitter/></i>
           <i className="google_i"><FaGoogle/></i>
          </div>

          <div className="Don_have">Don't have an account ? <Link to={"/signup"}><p>Signup now</p></Link></div>
          
     
        </div>


           </div>

           </div>
        </>
     );
}

export default Signin;