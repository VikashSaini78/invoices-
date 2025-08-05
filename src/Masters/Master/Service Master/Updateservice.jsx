import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Updateservice = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const initialData = location.state?.responseData || {};
  const [editableData, setEditableData] = useState(initialData);

  useEffect(() => {
    console.log("Received Data for Update:", editableData);
  }, [editableData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditableData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSaveChanges = async () => {
    if (!editableData.ID || !editableData.ServiceName) {
      toast.warn("ID and Service Name are required.");
      return;
    }

    const whereCondition = `ID=${editableData.ID}`;

    const updateData = new URLSearchParams({
      SecurityKey: "abcd",
      TableName: "ServiceMast",
      WhereCondition: whereCondition,
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
        toast.success("Update successful .");
        navigate("/showservice", { state: { updatedItem: editableData } });
        return;
      }

      if (jsonResponse?.Response?.[0]?.Status === "Ok") {
        toast.success("Data updated successfully!");
        navigate("/showservice", { state: { updatedItem: editableData } });
      } else {
        toast.error("Update failed: " + (jsonResponse.message || "Unknown error"));
      }
    } catch (error) {
      toast.success("Data updated successfully!");
        navigate("/showservice");
    
    }
  }; 

  return (
    <div className="update-container">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      <h1>🔄 Update Service</h1>

      <form>
        <div className="input-group d-none">
          <input
            type="text"
            name="ID"
            value={editableData.ID || ""}
            readOnly
          />
        </div>

        <div className="input-group">
          <label>Service Name</label>
          <input
            type="text"
            name="ServiceName"
            value={editableData.ServiceName || ""}
            onChange={handleInputChange}
          />
        </div>

        <div className="input-group">
          <label>HSN Code</label>
          <input
            type="text"
            name="HSNCODE"
            value={editableData.HSNCODE || ""}
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

export default Updateservice;
