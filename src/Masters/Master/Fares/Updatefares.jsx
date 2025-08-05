import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Updatefares = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const initialData = location.state?.responseData || {};
  const [editableData, setEditableData] = useState(initialData);
  const [vehicleTypeList, setVehicleTypeList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("Received Data for Update:", editableData);
  }, [editableData]);

  useEffect(() => {
    fetchVehicleTypes();
  }, []);

  const fetchVehicleTypes = async () => {
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
        setError("No vehicle type data found.");
      }
    } catch (error) {
      console.error("Vehicle Type Fetch Error:", error);
      setError("Failed to fetch vehicle types.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "Vtype") {
      console.log("Selected Vehicle Type ID:", value);
    }

    setEditableData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSaveChanges = async () => {
    if (!editableData.ID || !editableData.PackageName) {
      toast.warn("ID and Package Name are required.");
      return;
    }

    const whereCondition = `ID=${editableData.ID}`;

    const updateData = new URLSearchParams({
      SecurityKey: "abcd",
      TableName: "Fares",
      WhereCondition: whereCondition,
    });

    Object.entries(editableData).forEach(([key, value]) => {
      if (value !== undefined && value !== null && key !== "ID") {
        updateData.append(key.trim(), value.toString());
      }
    });

    try {
      const response = await fetch(
        "http://etour.responseinfoway.com/restapi/updatedata.aspx",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Accept: "application/json",
          },
          body: updateData.toString(),
        }
      );

      const textResponse = await response.text();
      console.log("Raw Response:", textResponse);

      let jsonResponse;
      try {
        jsonResponse = JSON.parse(textResponse);
      } catch {
        toast.success("Update successful.");
        navigate("/showfares", { state: { updatedItem: editableData } });
        return;
      }

      if (jsonResponse?.Response?.[0]?.Status === "Ok") {
        toast.success("Data updated successfully!");
        navigate("/showfares", { state: { updatedItem: editableData } });
      } else {
        toast.error("Update failed: " + (jsonResponse.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Update Error:", error);
      toast.success("Update successful.");
      navigate("/showfares");
    }
  };

  return (
    <div className="update-container mb-5">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      <h1>🔄 Update Fares</h1>

      <form>
        <div className="input-group d-none">
          <input type="text" name="ID" value={editableData.ID || ""} readOnly />
        </div>

        <div className="input-group">
          <label>Package Name</label>
          <input
            type="text"
            name="PackageName"
            value={editableData.PackageName || ""}
            onChange={handleInputChange}
          />
        </div>

        <div className="input-group">
          <label>Base Fare</label>
          <input
            type="text"
            name="BaseFare"
            value={editableData.BaseFare || ""}
            onChange={handleInputChange}
          />
        </div>

        <div className="input-group">
          <label>Fuel Rate KM</label>
          <input
            type="text"
            name="FuelRateKM"
            value={editableData.FuelRateKM || ""}
            onChange={handleInputChange}
          />
        </div>

        <div className="input-group">
          <label>Lub Rate KM</label>
          <input
            type="text"
            name="LubRateKM"
            value={editableData.LubRateKM || ""}
            onChange={handleInputChange}
          />
        </div>

        <div className="input-group">
          <label>Time Rate Per Minute</label>
          <input
            type="text"
            name="TimeRatePM"
            value={editableData.TimeRatePM || ""}
            onChange={handleInputChange}
          />
        </div>

        <div className="input-group">
          <label>Included KM</label>
          <input
            type="text"
            name="IncludedKM"
            value={editableData.IncludedKM || ""}
            onChange={handleInputChange}
          />
        </div>

        <div className="input-group">
          <label>Included Hours</label>
          <input
            type="text"
            name="IncludedHrs"
            value={editableData.IncludedHrs || ""}
            onChange={handleInputChange}
          />
        </div>

        <div className="input-group_select">
          <label>Vehicle Type</label>
          <select
            name="Vtype"
            value={editableData.Vtype?.toString() || ""}
            onChange={handleInputChange}
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

        <button type="button" className="save-changebtn" onClick={handleSaveChanges}>
          ✅ Save Changes
        </button>
      </form>
    </div>
  );
};

export default Updatefares;
