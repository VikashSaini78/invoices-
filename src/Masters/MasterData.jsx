import React, { useState, useEffect } from "react";
import "./Masterdata.css";

const MasterData = () => {
  const [formData, setFormData] = useState({
    TableName: "",
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


  useEffect(() => {
    const updateCurrentDateTime = () => {
      const now = new Date();
      const options = { timeZone: "Asia/Kolkata", hour12: false };
      const formatter = new Intl.DateTimeFormat("en-GB", {
        ...options,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });

      const formattedDateTime = formatter.format(now).replace(",", "");

      setFormData((prevFormData) => ({
        ...prevFormData,
        CurrentDateTime: formattedDateTime,
      }));
    };

    updateCurrentDateTime();
    const interval = setInterval(updateCurrentDateTime, 1000);

    return () => clearInterval(interval);
  },[]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value});
  };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     console.log("Submitting Data:", formData);

//     // Ensure no field is undefined (convert to empty string if necessary)
//     const data = new URLSearchParams({
//         SecurityKey: "abcd",
//         TableName: formData.TableName || "",
//         name: formData.name || "",
//         emailid: formData.emailid || "",
//         mobileno: formData.mobileno || "",
//         Address: formData.Address || "",
//         Password: formData.Password || "",
//         otp: formData.otp || "",
//         PwdResetstring: formData.PwdResetstring || "",
//         PwdLinkValidity: formData.PwdLinkValidity || "",
//     });

//     try {
//         const response = await fetch(
//             "http://etour.responseinfoway.com/restapi/insertdata.aspx",
//             {
//                 method: "POST",
//                 headers: { 
//                     "Content-Type": "application/x-www-form-urlencoded"
//                 },
//                 body: data.toString(),
//             }
//         );



//         // Log raw response text to debug
//         const responseText = await response.text();
//         console.log("Server Response:", responseText);

//         if (!response.ok) {
//             throw new Error(`HTTP Error! Status: ${response.status}, Response: ${responseText}`);
//         }

//         alert("Successfully submitted!");
//     } catch (error) {
//         console.error("Error submitting data:", error);
//         // alert("Error submitting data. Check the console for details.");
//     }
// };
   
const handleSubmit = async (e) => {
  e.preventDefault();

  console.log("Submitting Data:", formData);

  const data = new URLSearchParams();
  data.append("SecurityKey", "abcd");
  data.append("TableName", formData.TableName || "");
  data.append("Name", formData.name || "");            
  data.append("emailID", formData.emailid || "");         
  data.append("MobileNo", formData.mobileno || "");       
  data.append("Address", formData.Address || "");
  data.append("Password", formData.Password || "");
  data.append("OTP", formData.otp || "");                  
  data.append("PwdResetString", formData.PwdResetstring || "");  
  data.append("PwdLinkValidity", formData.PwdLinkValidity || "");

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
      throw new Error(`HTTP Error! Status: ${response.status}, Response: ${responseText}`);
    }

    alert("Successfully submitted!");
  } catch (error) {
    console.error("Error submitting data:", error);
   
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
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input_text-labalname">
          <label>Email id</label>
          <input
            type="email"
            name="emailid"
            placeholder="Enter Email"
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
            placeholder="Enter Mobile Number"
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
            placeholder="Enter Address"
            value={formData.Address}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input_text-labalname">
          <label>Active</label>
          <input
            type="text"
            name="active"
            placeholder="Active"
            value={formData.active}
            onChange={handleChange}
          />
        </div>
        <div className="input_text-labalname">
          <label>Date</label>
          <input
            type="date"
            name="CreationDate"
            value={formData.CreationDate}
            onChange={handleChange}
          />
        </div>

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
        <div className="input_text-labalname">
          <label>OTP</label>
          <input
            type="text"
            name="otp"
            placeholder="OTP"
            value={formData.otp}
            onChange={handleChange}
          />
        </div>
        <div className="input_text-labalname">
          <label>Pwd Reset string</label>
          <input
            type="text"
            name="PwdResetstring"
            placeholder="Pwd Reset String"
            value={formData.PwdResetstring}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default MasterData;
