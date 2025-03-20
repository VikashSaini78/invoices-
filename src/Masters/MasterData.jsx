import React, { useState, useEffect } from "react";
import "./Masterdata.css";

const MasterData = () => {
  const [formData, setFormData] = useState({
    TableName: "MasterData",
    name: "",
    emailid: "",
    mobileno: "",
    Address: "",
    active: "false", // Default to "false" (string)
    CreationDate: "",
    Password: "",
    otp: "",
    PwdResetstring: "",
    PwdLinkValidity: "",
  });

  // Generate a 4-digit OTP
  const generateOTP = () => Math.floor(1000 + Math.random() * 9000).toString();

  // Get the current date in YYYY-MM-DD format
  const getCurrentDate = () => new Date().toISOString().split("T")[0];

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      CreationDate: getCurrentDate(),
      otp: generateOTP(),
    }));
  }, []);

  const handleChange = (e) => {
    const { name, type, value } = e.target;
    setFormData({
      ...formData,
      [name]: value, // Handles text input and select dropdown
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting Data:", formData);

    const updatedFormData = {
      ...formData,
      CreationDate: getCurrentDate(),
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
      
    } catch (error) {
      console.error(error);
      alert("Successfully submitted!");
    }
    setFormData({
      TableName: "MasterData",
      name: "",
      emailid: "",
      mobileno: "",
      Address: "",
      active: "false", // Reset to "false"
      Password: "",
      PwdResetstring: "",
      PwdLinkValidity: "",
      CreationDate: getCurrentDate(),
      otp: generateOTP(),
    });
  };

  return (
    <div className="masdata_container">
      <form className="Columname-inputcolom" onSubmit={handleSubmit}>
        <h5 className="fw-bold mb-2 m-auto">Master Data</h5>

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

        {/* Password Field */}
        <div className="input_text-labalname">
          <label>Password</label>
          <input
            type="password"
            name="Password"
            placeholder="Password"
            value={formData.Password}
            onChange={handleChange}
          />
        </div>

        {/* Active Field as a Select Dropdown */}
        <div className="input_text-labalname">
          <label>Active</label>
          <select name="active" value={formData.active} onChange={handleChange}>
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
        </div>

        {/* Pwd Reset String */}
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

        <button className="masterdata_submit-btn" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default MasterData;
