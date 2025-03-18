import React, { useState, useEffect } from "react";
import "./Masterdata.css";
import { Link } from "react-router-dom";

const MasterData = () => {
  const [formData, setFormData] = useState({
    TableName: "MasterData",
    name: "",
    emailid: "",
    mobileno: "",
    Address: "",
    active: "",
    CreationDate: "",
    Password: "",
    otp: "",
    PwdResetstring: "",
    PwdLinkValidity: "",
  });

  // Function to generate a 4-digit OTP
  const generateOTP = () => {
    return Math.floor(1000 + Math.random() * 9000).toString();
  };

  // Function to get the current date and time in YYYY-MM-DD HH:MM:SS format
  const getCurrentDateTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      CreationDate: getCurrentDateTime(),
      otp: generateOTP(), 
    }));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting Data:", formData);
  
    const updatedFormData = {
      ...formData,
      CreationDate: getCurrentDateTime(),
      otp: generateOTP(),
    };
  
    const data = new URLSearchParams();
    data.append("SecurityKey", "abcd");
  
    Object.keys(updatedFormData).forEach((key) => {
      data.append(key, updatedFormData[key] || "");
    });
  
    console.log("Data to be sent:", data.toString());
  
    try {
      const response = await fetch(
        "http://etour.responseinfoway.com/restapi/insertdata.aspx",
        {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: data.toString(),
        }
      );
  
      const responseText = await response.text();
      console.log("Server Response:", responseText);
  
      if (!response.ok) {
        throw new Error(
          `HTTP Error! Status: ${response.status}, Response: ${responseText}`
        );
      }
  
      alert("Successfully submitted!");
  
      // Reset form fields properly
      setFormData({
        TableName: "MasterData",
        name: "",
        emailid: "",
        mobileno: "",
        Address: "",
        active: "",
        Password: "",
        PwdResetstring: "",
        PwdLinkValidity: "",
        CreationDate: getCurrentDateTime(), // Keep updated timestamp
        otp: generateOTP(), // Generate new OTP
      });
  
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };
  
  const alrtval=()=>{
    alert("Successfully submitted!");
  }


  return (
    <div className="masdata_container">
      <form className="Columname-inputcolom" onSubmit={handleSubmit}>
        <h5 className="fw-bold mb-2 m-auto">Master Data</h5>

        {/* Table Name (Hidden but Sent) */}
        <input type="hidden" name="TableName" value={formData.TableName} />

        <div className="input_text-labalname">
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input_text-labalname">
          <label>Email ID</label>
          <input
            type="email"
            name="emailid"
            placeholder="Ex.engi@gmail.com"
            value={formData.emailid}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input_text-labalname">
          <label>Mobile No.</label>
          <input
            type="text"
            name="mobileno"
            placeholder="Ex.8000000000"
            value={formData.mobileno}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input_text-labalname">
          <label>Address</label>
          <input
            type="text"
            name="Address"
            placeholder="Address"
            value={formData.Address}
            onChange={handleChange}
            required
          />
        </div>

        {/* Creation Date (Read-Only) */}
        <div className="input_text-labalname d-none">
          <label>Creation Date</label>
          <input
            type="text"
            name="CreationDate"
            value={formData.CreationDate}
            readOnly
          />
        </div>

        <div className="input_text-labalname">
          <label>Password</label>
          <input
            type="password"
            name="Password"
            placeholder="password"
            value={formData.Password}
            onChange={handleChange}
          />
        </div>

        {/* OTP Field (Read-Only) */}
        <div className="input_text-labalname d-none">
          <label>OTP</label>
          <input type="text" name="otp" value={formData.otp} readOnly />
        </div>

        {/* Pwd Reset String (Editable) */}
        <div className="input_text-labalname">
          <label>Pwd Reset String</label>
          <input
            type="text"
            name="PwdResetstring"
            placeholder="Enter PwdResetstring"
            value={formData.PwdResetstring}
            onChange={handleChange}
          />
        </div>
        <button className="masterdata_submit-btn" type="submit" onClick={alrtval}>
       {/* <Link to={"/masterdata"}> */}
      Submit
       {/* </Link> */}
       </button>
      </form>
    </div>
  );
};

export default MasterData;

