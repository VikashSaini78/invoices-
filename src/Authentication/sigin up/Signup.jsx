import { useState } from "react";
import "./Signup.css"
import { BiHide } from "react-icons/bi";
import { FaEye } from "react-icons/fa";
import { CiFacebook } from "react-icons/ci";
import { CiTwitter } from "react-icons/ci";
import { FaGoogle } from "react-icons/fa6";


import { Link } from "react-router-dom";
function Signup() {
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
  
    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };
  
    return ( 
        <>
           <div className="sign_up-container">

        


           <div className="signup_div">
           <div className="sign_logo">
            <img src="./media/response infoway_logo.jpg" alt=""/>

            </div>
           <div className="lognup_page">
           <h6>Create New Account !</h6>
           <p>Get your free Invoika account now</p>

           <label className="form-label">Email</label>
          <input type="email" className="form-control" placeholder="Enter Email id / Mobole No."/>

          <label className="form-label">Mobile Number</label>
          <input type="Number" className="form-control no-spinner" placeholder="Mobile Number"/>
           

      <label  className="form-label">Password:</label>
      <input
       className="form-control"
        type={showPassword ? "text" : "password"}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter password"
      
      />

      <div className="heide_show" onClick={togglePasswordVisibility}> 
        {showPassword ?<BiHide />: <FaEye />}
       </div>

       <div className="rember_forgatepassup"><p>By registering you agree to the Invoika</p><Link>  <h6> Terms of Use</h6></Link></div>
     

       <button type="button" class="btn btn" id="login_btn">Sign Up</button>

          <div className="hrsign-in"><hr className="signin-other-title"/> Create account with</div>

          <div className="socalmedia_icons">
           <i className="facbook_i"> <CiFacebook/></i>
           <i className="twitter_i"><CiTwitter/></i>
           <i className="google_i"><FaGoogle/></i>
          </div>

          <div className="Don_have">Don't have an account ? <Link to={"/signin"}><p>Signin</p></Link></div>

        
     
        </div>


           </div>

           </div>
        </>
     );
}

export default Signup;