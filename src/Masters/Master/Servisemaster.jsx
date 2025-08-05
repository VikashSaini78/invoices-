import React, { useState, useRef } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ServiceMasterForm() {
  const formRef = useRef(null);

  const [formData, setFormData] = useState({
    ServiceName: "",
    ShortCode: "",
    HSNCODE: "",
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
  const apiUrl = "http://etour.responseinfoway.com/restapi/insertdata.aspx";

  const data = new FormData();
  data.append("SecurityKey", "abcd");
  data.append("TableName", "ServiceMast");
  data.append("CompID", "1147");
  data.append("ServiceName", formData.ServiceName);
  data.append("ShortCode", "code");
  data.append("HSNCODE", formData.HSNCODE);
  data.append("deleted", "1");

  // Log data
  for (let [key, value] of data.entries()) {
    console.log(`${key}: ${value}`);
  }

  try {
    const response = await fetch(proxyUrl + apiUrl, {
      method: "POST",
      body: data,
    });

    const result = await response.json();
    console.log("API Response:", result);

    const responseItem = Array.isArray(result?.Response)
      ? result.Response[0]
      : result.Response;

    if (
      responseItem?.Status === "Success" ||
      responseItem?.Response === "OK"
    ) {
      toast.success("Service data submitted successfully!");
      setTimeout(() => {
        window.location.href = "/showservice";
      }, 1500);
    } else {
          toast.success("Service data submitted successfully!");
 setTimeout(() => {
        window.location.href = "/showservice";
      }, 1500);
    }
  } catch (err) {
    console.error("Network or fetch error:", err);
    toast.error("Network or server error!");
  }
};


  return (
    <div className="compney_container">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      <form className="compney_form" ref={formRef} onSubmit={handleSubmit}>
        <h5 className="text-center font-bold m-3">Service Master</h5>

        <div className="compney_input_div">
          <label>Service Name</label>
          <input
            type="text"
            name="ServiceName"
            value={formData.ServiceName}
            onChange={handleChange}
            placeholder="Enter Service Name"
            required
          />
        </div>

        <div className="compney_input_div">
          <label>Short Code</label>
          <input
            type="text"
            name="ShortCode"
            value={formData.ShortCode}
            onChange={handleChange}
            placeholder="Enter Short Code"
            required
          />
        </div>

        <div className="compney_input_div">
          <label>HSN Code</label>
          <input
            type="text"
            name="HSNCODE"
            value={formData.HSNCODE}
            onChange={handleChange}
            placeholder="Enter HSN Code"
            required
          />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default ServiceMasterForm;
