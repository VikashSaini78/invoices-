import React, { useState } from "react";
import "./Masterdata.css";

const Deletdata = () => {
  const [formData, setFormData] = useState({
    TableName: "",
    WhereCondition: "",
    Name: "",
  });

  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
  
    console.log("Submitting Data:", formData);
  
    const data = new URLSearchParams();
    data.append("SecurityKey", "abcd"); 
    data.append("TableName", formData.TableName);
    data.append("WhereCondition", formData.WhereCondition);
    data.append("Name", formData.Name);
  
    console.log("Data being sent:", data.toString());
  
    try {
      const apiUrl = "http://etour.responseinfoway.com/restapi/deletedata.aspx";
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: data.toString(),
      });
  
      console.log("Full Response:", response);
  
      if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
      }
  
      const responseText = await response.text();
      console.log("Raw Server Response:", responseText);
  
      try {
        const jsonData = JSON.parse(responseText);
        console.log("Parsed Response Data (JSON):", jsonData);
  
        if (jsonData.success || jsonData.status === "success" || responseText.toLowerCase().includes("deleted")) {
          setMessage("Data deleted successfully.");
          setFormData({ TableName: "", WhereCondition: "", Name: "" }); // Reset input values
        } else {
          setMessage("Deletion failed: " + (jsonData.message || "Unknown error"));
        }
      } catch (error) {
        console.warn("Response is not JSON. Displaying raw text.");
        if (responseText.toLowerCase().includes("deleted")) {
          setMessage("Data deleted successfully.");
          setFormData({ TableName: "", WhereCondition: "", Name: "" }); // Reset input values
        } else {
          setMessage("API response error: " + responseText);
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Data deleted");
      setFormData({ TableName: "", WhereCondition: "", Name: "" }); // Reset input values
    }
  };
  

  return (
    <div className="masdata_container">
      <form className="Columname-inputcolom" onSubmit={handleSubmit}>
        <h5 className="fw-bold mb-2 m-auto">Delete Data</h5>

        <div className="input_text-labalname">
          <label>Table Name</label>
          <input
            type="text"
            name="TableName"
            placeholder="Enter Table Name"
            value={formData.TableName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input_text-labalname">
          <label>Where Condition</label>
          <input
            type="text"
            name="WhereCondition"
            placeholder="Enter Where Condition"
            value={formData.WhereCondition}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Delete</button>
      </form>

      {message && <p className={message.includes("") ? "error-message" : "success-message"}>{message}</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default Deletdata;

