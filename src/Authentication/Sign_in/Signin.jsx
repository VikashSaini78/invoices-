import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signin.css";
import { BiHide } from "react-icons/bi";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";

function Signin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async () => {
    setError("");

    if (!username || !password) {
      alert("Please enter both username and password.");
      return;
    }

    const data = new URLSearchParams();
    data.append("SecurityKey", "abcd");
    data.append("TableName", "masterdata");
    data.append("WhereCondition", "All");
    data.append("*", "*");

    try {
      const proxyUrl = "https://thingproxy.freeboard.io/fetch/";
      const apiUrl = "http://etour.responseinfoway.com/restapi/Selectdata.aspx";

      const res = await fetch(proxyUrl + apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: data.toString(),
      });

      const result = await res.json();

      console.log("Fetched Users:", result.Response);
      console.log("Entered Username:", username);
      console.log("Entered Password:", password);

      
      const matchedUser = result.Response.find(
        (user) =>
          (user.MobileNo?.toLowerCase() === username.toLowerCase() ||
           user.Name?.toLowerCase() === username.toLowerCase()) &&
          user.Password === password &&
          (user.Active === "true" || user.Active === true || user.Active === "1" || user.Active === 1)
      );
      

      // if (matchedUser) {
      //   navigate("/");
      // }
      if (matchedUser) {
        const cleanUsername = matchedUser.Name?.trim() || matchedUser.MobileNo;
        localStorage.setItem("username", cleanUsername); // ✅ Save username
        navigate("/home");
      }
      
      
       else {
        alert("Invalid username or password.");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Login failed. Please try again.");
    }
  };

  return (
    <div className="sign_in-container">
      <div className="signin_div">
        <div className="signin_logo">
          <img src="./media/response_info.jpg" alt="error" />
        </div>
        <div className="login_page">
          <h6>Welcome Back !</h6>
          <p>Login in to continue to e-tour.</p>

          <label className="form-label">Username</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter Username"
          />

          <label className="form-label">Password</label>
          <input
            className="form-control"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />

          <div className="heide_show" onClick={togglePasswordVisibility}>
            {showPassword ? (
              <i>
                <BiHide />
              </i>
            ) : (
              <i>
                <FaEye />
              </i>
            )}
          </div>

          {error && <p className="error-text">{error}</p>}

          <div className="rember_forgatepass">
            <div>
              <input
                className="form-check-input cursor-pointer"
                type="checkbox"
              />
              Remember me
            </div>
            <Link>
              <p>Forgot your password?</p>
            </Link>
          </div>

          <button
            type="button"
            className="btn btn"
            id="login_btn"
            onClick={handleLogin}
          >
            Log in
          </button>

          <div className="hrsign-in">
            <hr className="signin-other-title" /> Sign in with
          </div>

          <div className="Don_have">
            Don't have an account ?{" "}
            <Link to={"/signup"}>
              <p>Signup now</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signin;
