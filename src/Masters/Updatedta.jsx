import React, { useState } from "react";
import "./Masterdata.css";

const Updatedata = () => {
  const [formData, setFormData] = useState({
    TableName: "",
    WhereCondition: "",
    "*": ""
  });

  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setResponseData(null);

    console.log("Submitting Data:", formData);

    const data = new URLSearchParams();
    data.append("SecurityKey", "abcd");
    data.append("TableName", formData.TableName || "");
    data.append("WhereCondition", formData.WhereCondition || "");
    data.append("*", formData["*"] || "");

    console.log("Data being sent:", data.toString());

    try {
      const proxyUrl = "https://thingproxy.freeboard.io/fetch/";
      const apiUrl = "http://etour.responseinfoway.com/restapi/Selectdata.aspx";

      const response = await fetch(proxyUrl + apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
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
        setResponseData(jsonData);
      } catch (error) {
        console.warn("Response is not JSON. Displaying raw text.");
        setResponseData(responseText);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to fetch data. Please try again.");
    }
  };

  return (
    <div className="masdata_container">
      <form className="Columname-inputcolom" onSubmit={handleSubmit}>
        <h5 className="fw-bold mb-2 m-auto">Master Data</h5>

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

        <div className="input_text-labalname">
          <label>Field Name</label>
          <input
            type="text"
            name="*"
            placeholder="Enter Field Name"
            value={formData["*"]}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Submit</button>
      </form>

      {error && <p className="error-message">{error}</p>}

      {responseData && (
        <div className="response-container">
          <pre>
            {typeof responseData === "string"
              ? responseData
              : JSON.stringify(responseData, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default Updatedata;
