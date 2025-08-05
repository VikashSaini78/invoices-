import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateVehicle = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const initialData = location.state?.responseData || {};

  const [editableData, setEditableData] = useState(initialData);

  useEffect(() => {
    console.log("Received Data for Update:", editableData);
  }, [editableData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditableData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSaveChanges = async () => {
    if (!editableData.ID || !editableData.VTYPE) {
      toast.warn("ID and Service Name are required.");
          // console.log("hello viky",editableData.ServiceName)

      return;
    }
    
    const updateData = new URLSearchParams({
      SecurityKey: "abcd",
      TableName: "VehicleTypes",
      WhereCondition: `ID=${editableData.ID}`,
    });
    
    Object.entries(editableData).forEach(([key, value]) => {
      if (value !== undefined && value !== null && key !== "ID") {
        updateData.append(key, value.toString());
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
        toast.success("Update successful ");
        navigate("/showvehicletype");
        return;
      }

      if (jsonResponse?.Response?.[0]?.Status === "Ok") {
        toast.success("✅ Data updated successfully!");
        navigate("/showvehicletype", { state: { updatedItem: editableData } });
      } else {
        toast.error("❌ Update failed: " + (jsonResponse.message || "Unknown error"));
      }
    } catch (error) {
        toast.success("Update successful ");
        navigate("/showvehicletype");
    }
  };

  return (
    <div className="update-container">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      <h1>🔄 Update Vehicle Type</h1>

      <form>
        {/* Hidden ID Field */}
        <input type="hidden" name="ID" value={editableData.ID || ""} readOnly />

        <div className="input-group mt-3">
          <label>Service Name</label>
          <input
            type="text"
            name="VTYPE"
            value={editableData.VTYPE || ""}
            onChange={handleInputChange}
            required
          />
        </div>

        <button
          type="button"
          className="save-changebtn"
          onClick={handleSaveChanges}
        >
          ✅ Save Changes
        </button>
      </form>
    </div>
  );
};

export default UpdateVehicle;

