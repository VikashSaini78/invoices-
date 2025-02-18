import React, { useState } from "react";
import "./Masterdata.css";
const MasterData = () => {
  const [formData, setFormData] = useState({
    name: "",
    emailid: "",
    mobileno: "",
    TableName: "",
    Address: "",
    Mobileno: "",
    active: "",
    MaxCompanies: "",
    CreationDate: "",
    Password: "",
    otp: "",
    PwdResetstring: "",
    PwdLinkValidity: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Log the data before sending it
    console.log("Data being submitted:", formData);

    const data = new URLSearchParams();
    data.append("SecurityKey", "abcd"); // Fixed SecurityKey
    data.append("TableName", formData.TableName);
    data.append("name", formData.name);
    data.append("emailid", formData.emailid);
    data.append("mobileno", formData.mobileno);
    data.append("Address", formData.Address);
    data.append("Mobileno", formData.Mobileno);
    data.append("active", formData.active);
    data.append("MaxCompanies", formData.MaxCompanies);
    data.append("CreationDate", formData.CreationDate);
    data.append("Password", formData.Password);
    data.append("otp", formData.otp);
    data.append("PwdResetstring", formData.PwdResetstring);
    data.append("PwdLinkValidity", formData.PwdLinkValidity);

    try {
      const response = await fetch(
        "http://etour.responseinfoway.com/restapi/insertdata.aspx",
        {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: data.toString(),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
      }

      let result;
      try {
        result = await response.json();
      } catch (jsonError) {
        result = await response.text(); // Fallback for plain text response
      }

      console.log("Success:", result);
      alert("Data submitted successfully!");
    } catch (error) {
      console.error("Error:", error);
      alert(`Failed to submit data: ${error.message}`);
    }
  };

  return (
    <div>
      <div>
        <div className="masdata_container">
          <form className="Columname-inputcolom" onSubmit={handleSubmit}>
            <h5 className="fw-bold mb-2">Master Data</h5>
            <input
              type="text"
              name="TableName"
              placeholder="Enter Table Name"
              value={formData.TableName}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="name"
              placeholder="Enter Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="emailid"
              placeholder="Enter Email"
              value={formData.emailid}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="Address"
              placeholder="Enter Address"
              value={formData.Address}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="Mobileno"
              placeholder="Enter Mobile Number"
              value={formData.Mobileno}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="active"
              placeholder="Active"
              value={formData.active}
              onChange={handleChange}
            />
            <input
              type="number"
              name="MaxCompanies"
              placeholder="Max Companies"
              value={formData.MaxCompanies}
              onChange={handleChange}
            />
            <input
              type="date"
              name="CreationDate"
              value={formData.CreationDate}
              onChange={handleChange}
            />
            <input
              type="password"
              name="Password"
              placeholder="Password"
              value={formData.Password}
              onChange={handleChange}
            />
            <input
              type="text"
              name="otp"
              placeholder="OTP"
              value={formData.otp}
              onChange={handleChange}
            />
            <input
              type="text"
              name="PwdResetstring"
              placeholder="Pwd Reset String"
              value={formData.PwdResetstring}
              onChange={handleChange}
            />
            <input
              type="text"
              name="PwdLinkValidity"
              placeholder="Pwd Link Validity"
              value={formData.PwdLinkValidity}
              onChange={handleChange}
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MasterData;
