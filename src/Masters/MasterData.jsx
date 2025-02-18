import React, { useState } from "react";
import "./Masterdata.css";

function MasterData() {
  const [formData, setFormData] = useState({
    SecurityKey: "",
    TableName: "",
    emailid: "",
    mobileno: "",
    Name: "", 
    Address: "",
    Active: "true",
    MaxCompanies: "",
    CreationDate: "",
    Password: "",
    OTP: "",
    PwdResetString: "",
    PwdLinkValidity: "",
  }); 

    const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

    const submitValue = async (e) => {
    e.preventDefault();
    console.log("🚀 Sending Data:", formData);

    try {
      const response = await fetch("http://localhost:5000/api/proxy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log("🎯 Full API Response:", JSON.stringify(result, null, 2));

      if (result.Response && result.Response[0]?.Message) {
        console.log("🎯 API Message:", result.Response[0].Message);
      } else {
        console.log("API Response did not contain a Message field.");
      }
    } catch (error) {
      console.error("Error sending data:", error);
      alert("Failed to send data. Check Proxy and API availability.");
    }
  };

  return (
    <div className="masdata_container">
      <form className="Columname-inputcolom" onSubmit={submitValue}>
        <h5 className="fw-bold mb-2">Master Data Form</h5>

        <input
          type="text"
          name="SecurityKey"
          placeholder="Security Key"
          value={formData.SecurityKey}
          onChange={handleChange}
        />
        <input
          type="text"
          name="TableName"
          placeholder="Table Name"
          value={formData.TableName}
          onChange={handleChange}
        />
        <input
          type="text"
          name="Address"
          placeholder="Address"
          value={formData.Address}
          onChange={handleChange}
        />
        <input
          type="email"
          name="emailid"
          placeholder="Email ID"
          value={formData.emailid}
          onChange={handleChange}
        />

      
        <input
          type="text"
          name="Name"
          placeholder="Name"
          value={formData.Name}
          onChange={handleChange}
        />
        <input
          type="tel"
          name="mobileno"
          placeholder="Mobile No."
          value={formData.mobileno}
          onChange={handleChange}
        />
        <select name="Active" value={formData.Active} onChange={handleChange}>
          <option value="true">Active</option>
          <option value="false">Inactive</option>
        </select>
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
          placeholder="Creation Date"
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
          name="OTP"
          placeholder="OTP"
          value={formData.OTP}
          onChange={handleChange}
        />
        <input
          type="text"
          name="PwdResetString"
          placeholder="Pwd Reset String"
          value={formData.PwdResetString}
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
  );
}

export default MasterData;
