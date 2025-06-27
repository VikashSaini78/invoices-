import React, { useState, useEffect, useRef } from "react";
import "./Compney.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Compney() {
  const formRef = useRef(null);

  const [formData, setFormData] = useState({
    Name: "",
    Address: "",
    TelNo: "",
    GstNo: "",
    StateID: "",
  });

  const [logoFile, setLogoFile] = useState(null);
  const [stateList, setStateList] = useState([]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "LogoPath" && files.length > 0) {
      setLogoFile(files[0]);
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
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
        if (Array.isArray(result.Response)) {
          setStateList(result.Response);
        }
      } catch (err) {
        console.error("Error fetching states:", err);
      }
    };

    fetchStates();
  }, []);

const handleSubmit = (e) => {
  e.preventDefault();

  const loggedInUserId = localStorage.getItem("userId");
  if (!loggedInUserId) {
    toast.error("User not logged in!");
    return;
  }

  const apiUrl = "http://etour.responseinfoway.com/restapi/insertdata.aspx";
  const data = new FormData();
  data.append("SecurityKey", "abcd");
  data.append("TableName", "Company");
  data.append("MasterId", loggedInUserId);
  data.append("Name", formData.Name);
  data.append("Address", formData.Address);
  data.append("TelNo", formData.TelNo);
  data.append("GstNo", formData.GstNo);
  data.append("StateID", formData.StateID);

  if (logoFile) {
    data.append("LogoPath", logoFile);
  }

  fetch(apiUrl, {
    method: "POST",
    body: data,
  })
    .then(async (response) => {
      const contentType = response.headers.get("content-type");
      let result = null;

      if (contentType && contentType.includes("application/json")) {
        result = await response.json();
      } else {
        const text = await response.text();
        try {
          result = JSON.parse(text);
        } catch {
          toast.success("Data submitted successfully!");
          setTimeout(() => {
            window.location.href = "/selectcompny";
          }, 1500);
          return;
        }
      }
  
      if (result?.Status === "Success" || result?.Response === "OK") {
        if (result?.LogoPath) {
          const cleanPath = result.LogoPath.replace("~", "http://etour.responseinfoway.com");
          localStorage.setItem("userLogo", cleanPath); 
        }

        localStorage.setItem("username", formData.Name);
        localStorage.setItem("userMobile", formData.TelNo);

        toast.success("Data submitted successfully!");
        setTimeout(() => {
          window.location.href = "/selectcompny";
        }, 1500);
      } else {
        toast.error("Submission failed: " + (result?.Response || "Unknown error"));
      }
    })
    .catch((error) => {
      console.warn("Warning:", error);
      toast.success("Data submitted (server response issue)");
      setTimeout(() => {
        window.location.href = "/selectcompny";
      }, 1500);
    });
};


  return (
    <div className="compney_container">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />

      <form
        className="compney_form"
        ref={formRef}
        encType="multipart/form-data"
        onSubmit={handleSubmit}
      >
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
            required
          />
        </div>

        <div className="compney_input_div">
          <label>State</label>
          <select
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
