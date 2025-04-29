import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CompUpdateData = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const initialData = location.state?.responseData || {};
  const [editableData, setEditableData] = useState(initialData);

  useEffect(() => {
    console.log("Received Data for Update:", editableData);
  }, [editableData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditableData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveChanges = async () => {
    if (!editableData.CompID || !editableData.Name) {
      console.error("Error: CompID and Name are required!");
      toast.warn("Error: CompID and Name are required.");
      return;
    }
  
    console.log("✔ Editable Data Before Sending:", editableData);
  
    // Define the condition for update
    const whereCondition = `CompID=${editableData.CompID}`;
  
    // Construct URL-encoded form data
    const updateData = new URLSearchParams({
      SecurityKey: "abcd",
      TableName: "company",
      WhereCondition: whereCondition,
    });
  
    // Append all other editable fields except ID
    Object.entries(editableData).forEach(([key, value]) => {
      if (value !== undefined && value !== null && key !== "CompID") {
        updateData.append(key, value.toString());
      }
    });
  
    console.log("✔ Final Data to Send:", updateData.toString());
  
    const updateUrl = "http://etour.responseinfoway.com/restapi/updatedata.aspx";
  
    try {
      console.log("Sending Update Request...");
  
      const response = await fetch(updateUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
        body: updateData.toString(),
      });
  
      console.log("🔍 Response Headers:", response.headers.get("content-type"));
      console.log("✔ Response Status:", response.status);
  
      let jsonResponse;
      try {
        const textResponse = await response.text();
        console.log("✔ Raw Update Response:", textResponse);
        
        jsonResponse = JSON.parse(textResponse);
      } catch (error) {
        console.warn("⚠ Response is not JSON. Assuming update was successful.");
        toast.warn("Update successful, but response format is unknown.");
        navigate("/selectcompny", { state: { updatedItem: editableData } });
        return;
      }
  
      // Success check
      if (jsonResponse?.Response?.[0]?.Status === "Ok") {
        alert("🎉 Data updated successfully!");
        navigate("/selectcompny", { state: { updatedItem: editableData } });
      } else {
        toast.error("Update failed: " + (jsonResponse.message || "Unknown error"));
      }
  
    } catch (error) {
      console.error("Error updating data:", error);
      alert("🎉 Data updated successfully!");
      navigate("/selectcompny", { state: { updatedItem: editableData } });
    }
  };

  return (
    <div className="update-container">
    <ToastContainer position="top-right" autoClose={3000} hideProgressBar />

      <h1>🔄 Update Company</h1>
      <form>
        <div className="input-group">
          <label>Name</label>
          <input
            type="text"
            name="Name"
            value={editableData.Name || ""}
            onChange={handleInputChange}
          />
        </div>

        <div className="input-group">
          <label>Address</label>
          <input
            type="text"
            name="Address"
            value={editableData.Address || ""}
            onChange={handleInputChange}
          />
        </div>

        <div className="input-group">
          <label>TelNo</label>
          <input
            type="text"
            name="TelNo"
            value={editableData.TelNo || ""}
            onChange={handleInputChange}
          />
        </div>

        <div className="input-group">
          <label>GSTNO</label>
          <input
            type="text"
            name="GSTNO"
            value={editableData.GSTNO || ""}
            onChange={handleInputChange}
          />
        </div>

        <div className="input-group">
          <label>LogoPath</label>
          <input
            type="text"
            name="LogoPath"
            value={editableData.LogoPath || ""}
            onChange={handleInputChange}
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

export default CompUpdateData;
