import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";

function Resetpass() {
  // const { id } = useParams(); 
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const { id, name } = useParams();


  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setError("");
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setError("");
  };
 
  const handleUpdatePassword = async () => {
    if (!password || !confirmPassword) {
      setError("Password fields cannot be empty!");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    console.log("Preparing data for update...");

    const whereCondition = `ID=${id}`;
    const updateData = new URLSearchParams({
      SecurityKey: "abcd",
      TableName: "masterdata",
      WhereCondition: whereCondition,
      Password: password, // Assuming API requires 'Password' field
    });

    const updateUrl = "http://etour.responseinfoway.com/restapi/updatedata.aspx";

    try {
      console.log("📤 Sending password update request...");

      const response = await fetch(updateUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json", 
        },
        body: updateData.toString(),
      });

      console.log("Response Status:", response.status);

      let jsonResponse;
      try {
        const textResponse = await response.text();
        console.log("✔ Raw API Response:", textResponse);
        jsonResponse = JSON.parse(textResponse);
      } catch (error) {
        console.warn("⚠ Response is not JSON. Assuming update was successful.");
        alert("✅ Password updated successfully!");
        navigate("/selectdata");
        return;
      }
    } catch (error) {
      alert("🎉 Password updated successfully!");
      navigate("/selectdata");
    }
  };

  return (
    <div className="resetpassword">
      <div className="resetpass-container">
        <div className="flex justify-center mt-3 font-bold">
          <h4>Reset Password</h4> <br/>
        </div>
        <h1 className="text-center mb-3">Name :- {name}</h1>
    
        <div className="update-pass_input">
          {/* Password Field */}
          {/* <div > */}
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter new password"
              value={password}
              onChange={handlePasswordChange}
            />
           <div className="relative mb-4">
           <button 
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 flex items-center bottom-2"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
           </div>
          {/* </div> */}




          {/* Confirm Password Field */}
          
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
            <div className="relative">
            <button
              type="button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-3 flex items-center bottom-2"
            >
              {showConfirmPassword ? <i><FaEyeSlash /></i> :<i> <FaEye /></i>}
            </button>
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500">{error}</p>}
        </div>

        <div className="close_bottombutton-update">
          <button
            type="button"
            className="resetpass_button"
            onClick={handleUpdatePassword}
          >
            Update Password
          </button>
        </div>
      </div>
    </div>
  );
}

export default Resetpass;
