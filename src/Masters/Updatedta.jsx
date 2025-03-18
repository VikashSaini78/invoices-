import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const UpdateData = () => {
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
    if (!editableData || Object.keys(editableData).length === 0) {
      alert("No data to update.");
      return;
    }

    if (!editableData.ID) {
      alert("Error: ID field is missing.");
      return;
    }

    const updateData = new URLSearchParams();
    updateData.append("SecurityKey", "abcd");
    updateData.append("TableName", "masterdata");
    updateData.append("ID", editableData.ID);

    Object.entries(editableData).forEach(([key, value]) => {
      updateData.append(key, value?.toString() || "");
    });

    const updateUrl = "http://etour.responseinfoway.com/restapi/updatedata.aspx";

    try {
      console.log("Sending Update Request:", updateData.toString());

      const response = await fetch(updateUrl, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: updateData.toString(),
      });

      const textResponse = await response.text();
      console.log("Raw Update Response:", textResponse);

      if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
      }

      try {
        const jsonResponse = JSON.parse(textResponse);
        console.log("Parsed JSON Response:", jsonResponse);

        if (jsonResponse.status === "success") {
          alert("Data updated successfully!");
          navigate("/selectdata");
        } else {
          alert("Failed to update data: " + (jsonResponse.message || "Unknown error"));
        }
      } catch (error) {
        alert("Update successful, but response is not in JSON format.");
        navigate("/selectdata");
      }
    } catch (error) {
      console.error("Error updating data:", error);
      alert(`Failed to update data: ${error.message}`);
    }
  };

  // List of fields to hide (they will be submitted but not displayed)
  const hiddenFields = ["ID", "Active", "MaxCompanies", "CreationDate", "OTP", "PwdLinkValidity"];

  return (
    <div className="update-container">
      <h1>Update Data</h1>

      <form>
        {/* Hidden Fields (included in form submission but not visible) */}
        {hiddenFields.map((key) => (
          <input key={key} type="hidden" name={key} value={editableData[key] || ""} />
        ))}

        {/* Visible Input Fields (excluding hidden fields) */}
        {Object.keys(editableData)
          .filter((key) => !hiddenFields.includes(key)) // Exclude hidden fields
          .map((key) => (
            <div key={key} className="input-group">
              <label>{key}</label>
              <input
                type="text"
                name={key}
                value={editableData[key] || ""}
                onChange={handleInputChange}
              />
            </div>
          ))}

        <button type="button" className="save-changebtn" onClick={handleSaveChanges}>
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default UpdateData;
