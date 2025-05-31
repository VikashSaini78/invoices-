import React, { useState, useEffect } from "react";
import "./Compney.css";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Compney() {
  const [formData, setFormData] = useState({
    Name: "",
    Address: "",
    TelNo: "",
    GstNo: "",
    LogoPath: "",
    StateID: "",
  });

  const [stateList, setStateList] = useState([]);
  const naviget = useNavigate();

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prev) => ({
  //     ...prev,
  //     [name]: value,
  //   }));
  // };   
       
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "LogoPath" && files.length > 0) {
      const fileName = files[0].name;
      console.log("Selected file name:", fileName); // 👈 Check yahan
      setFormData((prev) => ({
        ...prev,
        LogoPath: fileName,
      }));
    }
    
    else {
      setFormData((prev) => ({
        ...prev,
        [name]  : value,
      }));
    }
  };

  useEffect(() => {
    const fetchStates = async () => {
      const proxyUrl = "https://thingproxy.freeboard.io/fetch/";
      const apiUrl = "http://etour.responseinfoway.com/restapi/Selectdata.aspx";

      const data = new URLSearchParams();
      data.append("SecurityKey", "abcd");
      data.append("TableName", "gststates");
      data.append("Where", "All");
      data.append("*", "*");

      try {
        const response = await fetch(proxyUrl + apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: data.toString(),
        });

        const result = await response.json();
        // console.log("Fetched States:", result);

        if (Array.isArray(result.Response)) {
          setStateList(result.Response); // ✅ load states into dropdown
        } else {
          console.error("Invalid response format:", result);
        }
      } catch (err) {
        console.error("Error fetching states:", err);
      }
    };

    fetchStates();
  }, []);

  // ⬇️ Submit form
 
  const handleSubmit = async (e) => {
  e.preventDefault();

  // Get logged-in userId from localStorage
  const loggedInUserId = localStorage.getItem("userId");

  // Check if loggedInUserId is null or undefined
  if (!loggedInUserId) {
    toast.error("User not logged in!");
    console.log("Error: No userId found in localStorage");
    return;
  }

  const proxyUrl = "https://thingproxy.freeboard.io/fetch/";
  const insertApiUrl = "http://etour.responseinfoway.com/restapi/insertdata.aspx";

  try {
    const data = new FormData();
    data.append("SecurityKey", "abcd");
    data.append("TableName", "Company");
    data.append("MasterId", loggedInUserId); // Use dynamic user ID
    data.append("Name", formData.Name);
    data.append("Address", formData.Address);
    data.append("TelNo", formData.TelNo);
    data.append("GstNo", formData.GstNo);
    // data.append("LogoPath", "testimage.png");

    // If LogoPath is a file, append it correctly
    // if (formData.LogoPath) {
    //   data.append("LogoPath", formData.LogoPath);
    // }
    console.log("Data being sent:", formData.LogoPath); // 👈 Isme string hona chahiye

    data.append("LogoPath", formData.LogoPath);
    
    

    data.append("StateID", formData.StateID);

    const response = await fetch(proxyUrl + insertApiUrl, {
      method: "POST",
      body: data,
    });

    const responseText = await response.text();
    console.log("Insert Response:", responseText);

    if (!response.ok || responseText.includes('"Status":"Error"')) {
      throw new Error("API error");
    }

    toast.success("Successfully submitted!");
    naviget("/selectcompny");

    // Reset form after successful submission
    setFormData({
      Name: "",
      Address: "",
      TelNo: "",
      GstNo: "",
      LogoPath: "",
      StateID: "",
    });
  } catch (error) {
    console.error("Error during submission:", error);
    toast.error("Submit failed! Please check your data.");
  }
};

  

  return (
    <div className="compney_container">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      <form className="compney_form" onSubmit={handleSubmit}>
        <h5 className="text-center font-bold m-3">Company Data</h5>

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
            type="file"
            name="LogoPath"
            onChange={handleChange}
            placeholder="LogoPath"
            required
          />
        </div>

        <div className="compney_input_div">
          <label>State</label>
          <select
            className="cursor-pointer"
            name="StateID"
            value={formData.StateID}
            onChange={handleChange}
            required
          >
            <option value="">Select State</option>
            {stateList.map((state) => (
              <option key={state.ID} value={state.ID}>
                {state.State}
              </option>
            ))}
          </select>
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Compney;

