import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Fares() {
  const formRef = useRef(null);
  const navaiget = useNavigate();
  const [vehicleTypeList, setVehicleTypeList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    PackageName: "",
    BaseFare: "",
    FuelRateKM: "",
    LubRateKM: "",
    TimeRatePM: "",
    IncludedKM: "",
    IncludedHrs: "",
    Vtype: "",
  });

  // vtype
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setError(null);
    setLoading(true);
    setVehicleTypeList([]);

    const data = new URLSearchParams();
    data.append("SecurityKey", "abcd");
    data.append("TableName", "VehicleTypes");
    data.append("WhereCondition", "All");
    data.append("*", "*");

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

      const jsonData = await response.json();
      console.log("Fetched Vehicle Types:", jsonData);

      if (Array.isArray(jsonData.Response)) {
        setVehicleTypeList(jsonData.Response);
      } else {
        setError("No data found.");
      }
    } catch (error) {
      setError("Failed to fetch data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "Vtype") {
      console.log("Selected Vehicle Type ID:", value);
    }
  };

  const resetForm = () => {
    setFormData({
      PackageName: "",
      BaseFare: "",
      FuelRateKM: "",
      LubRateKM: "",
      TimeRatePM: "",
      IncludedKM: "",
      IncludedHrs: "",
      Vtype: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const proxyUrl = "https://thingproxy.freeboard.io/fetch/";
    const apiUrl = "http://etour.responseinfoway.com/restapi/insertdata.aspx";

    const data = new URLSearchParams();
    data.append("SecurityKey", "abcd");
    data.append("TableName", "Fares");
    // data.append("ID", "");
    data.append("PackageName", formData.PackageName);
    data.append("BaseFare", formData.BaseFare);
    data.append("FuelRateKM", formData.FuelRateKM);
    data.append("LubRateKM", formData.LubRateKM);
    data.append("TimeRatePM", formData.TimeRatePM);
    data.append("IncludedKM", formData.IncludedKM);
    data.append("IncludedHrs", formData.IncludedHrs);
    data.append("Vtype", formData.Vtype);

    try {
      const response = await fetch(proxyUrl + apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: data.toString(),
      });

      const result = await response.json();
      console.log("API Response:", result);

      if (Array.isArray(result?.Response)) {
        const responseItem = result.Response[0];
        if (responseItem.Response === "OK") {
          toast.success("Fares submitted successfully!");
          resetForm();
          navaiget("/showfares");
        } else {
  toast.success("Fares submitted successfully!");
          resetForm();
          navaiget("/showfares");        }
      } else {
  toast.success("Fares submitted successfully!");
          resetForm();
          navaiget("/showfares");      }
    } catch (err) {
      console.error("Fetch error:", err);
      toast.error("Failed to submit data.");
    }
  };

  return (
    <div className="compney_container mb-5">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      <form className="compney_form" ref={formRef} onSubmit={handleSubmit}>
        <h5 className="text-center font-bold m-3">Fares</h5>

        <div className="compney_input_div">
          <label>Package Name</label>
          <input
            type="text"
            name="PackageName"
            value={formData.PackageName}
            onChange={handleChange}
            placeholder="Enter Package Name"
            required
          />
        </div>

        <div className="compney_input_div">
          <label>Base Fare</label>
          <input
            type="number"
            name="BaseFare"
            value={formData.BaseFare}
            onChange={handleChange}
            placeholder="Enter Base Fare"
            required
          />
        </div>

        <div className="compney_input_div">
          <label>Fuel Rate per KM</label>
          <input
            type="number"
            name="FuelRateKM"
            value={formData.FuelRateKM}
            onChange={handleChange}
            placeholder="Enter Fuel Rate per KM"
            required
          />
        </div>

        <div className="compney_input_div">
          <label>Lub Rate per KM</label>
          <input
            type="number"
            name="LubRateKM"
            value={formData.LubRateKM}
            onChange={handleChange}
            placeholder="Enter Lub Rate per KM"
            required
          />
        </div>

        <div className="compney_input_div">
          <label>Time Rate per Minute</label>
          <input
            type="number"
            name="TimeRatePM"
            value={formData.TimeRatePM}
            onChange={handleChange}
            placeholder="Enter Time Rate per Minute"
            required
          />
        </div>

        <div className="compney_input_div">
          <label>Included KM</label>
          <input
            type="number"
            name="IncludedKM"
            value={formData.IncludedKM}
            onChange={handleChange}
            placeholder="Enter Included KM"
            required
          />
        </div>

        <div className="compney_input_div">
          <label>Included Hours</label>
          <input
            type="number"
            name="IncludedHrs"
            value={formData.IncludedHrs}
            onChange={handleChange}
            placeholder="Enter Included Hours"
            required
          />
        </div>

        <div className="compney_input_div">
          <label>Vehicle Type (Vtype)</label>

          <select
            id="vtype"
            name="Vtype"
            value={formData.Vtype}
            onChange={handleChange}
            required
          >
            <option value="">Select Vehicle Type</option>
            {vehicleTypeList.map((type) => (
              <option key={type.ID} value={type.ID}>
                {type.VTYPE}
              </option>
            ))}
          </select>
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Fares;
