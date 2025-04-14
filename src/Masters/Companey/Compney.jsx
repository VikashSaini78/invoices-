import React, { useState } from "react";
import "./Compney.css";

function Compney() {
  const [formData, setFormData] = useState({
    Name: "",
    Address: "",
    TelNo: "",
    GstNo: "",
    LogoPath: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const proxyUrl = "https://thingproxy.freeboard.io/fetch/";
    const insertApiUrl =
      "http://etour.responseinfoway.com/restapi/insertdata.aspx";

    try {
      const data = new URLSearchParams();
      data.append("SecurityKey", "abcd");
      data.append("TableName", "Company");
      data.append("MasterId", "1151");
      data.append("Name", formData.Name);
      data.append("Address", formData.Address);
      data.append("TelNo", formData.TelNo);
      data.append("GstNo", formData.GstNo);
      data.append("LogoPath", formData.LogoPath); 

      console.log("Sending data:", data.toString());

      const response = await fetch(proxyUrl + insertApiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: data.toString(),
      });

      const responseText = await response.text();
      console.log("Insert Response:", responseText);

      if (!response.ok || responseText.includes('"Status":"Error"')) {
        throw new Error("API error");
      }

      alert("Successfully Submit!");
      setFormData({
        Name: "",
        Address: "",
        TelNo: "",
        GstNo: "",
        LogoPath: "",
      });
      
    } catch (error) {
      console.error("Error during submission:", error);
      alert("Submit failed! Please check your data.");
    }
  };

  return (
    <div className="compney_container">
      <form className="compney_form" onSubmit={handleSubmit}>
        <h5 className="text-center font-bold m-3">Update Company (ID: 1151)</h5>

        <div className="compney_input_div">
          <label>Name</label>
          <input
            type="text"
            name="Name"
            value={formData.Name}
            onChange={handleChange}
            placeholder="Name"
            required
          />
        </div>

        <div className="compney_input_div">
          <label>Address</label>
          <input
            type="text"
            name="Address"
            value={formData.Address}
            onChange={handleChange}
            placeholder="Address"
            required
          />
        </div>

        <div className="compney_input_div">
          <label>TelNo.</label>
          <input
            type="text"
            name="TelNo"
            value={formData.TelNo}
            onChange={handleChange}
            placeholder="TelNo."
            required
          />
        </div>

        <div className="compney_input_div">
          <label>GstNo</label>
          <input
            type="text"
            name="GstNo"
            value={formData.GstNo}
            onChange={handleChange}
            placeholder="GstNo"
            required
          />
        </div>

        <div className="compney_input_div">
          <label>LogoPath</label>
          <input
            type="text"
            name="LogoPath"
            value={formData.LogoPath}
            onChange={handleChange}
            placeholder="LogoPath"
            required
          />
        </div>

        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default Compney;
