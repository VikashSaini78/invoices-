import React, { useState, useRef, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation, useNavigate } from "react-router-dom";

function VehicleType() {
  const formRef = useRef(null);

  const [formData, setFormData] = useState({
    VTYPE: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const location = useLocation();
  // const navigate = useNavigate();

  useEffect(() => {
    if (location.state?.responseData) {
      setFormData({
        VTYPE: location.state.responseData.VTYPE || "",
        ID: location.state.responseData.ID || "", // store ID for update
      });
    }
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const proxyUrl = "https://thingproxy.freeboard.io/fetch/";
    const apiUrl = "http://etour.responseinfoway.com/restapi/insertdata.aspx";

    const data = new FormData();
    data.append("SecurityKey", "abcd");
    data.append("TableName", "VehicleTypes");
    // data.append("ID", "");
    data.append("VTYPE", formData.VTYPE);

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
        toast.success("Vehicle type submitted successfully!");
        setTimeout(() => {
          window.location.href = "/showvehicletype";
        }, 1500);
      } else {
        toast.success("Vehicle type submitted successfully!");
        setTimeout(() => {
          window.location.href = "/showvehicletype";
        }, 1000);
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
        <h5 className="text-center font-bold m-3">Vehicle Type</h5>

        <div className="compney_input_div">
          <label>Vehicle Type</label>
          <input
            type="text"
            name="VTYPE"
            value={formData.VTYPE}
            onChange={handleChange}
            placeholder="Enter Vehicle Type"
            required
          />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default VehicleType;
