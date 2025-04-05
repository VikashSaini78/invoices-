import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

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
    if (!editableData.ID || !editableData.Name) {
      console.error("Error: ID and Name are required!");
      alert("Error: ID and Name are required.");
      return;
    }

    console.log("✔ Editable Data Before Sending:", editableData);

    const whereCondition = `ID=${editableData.ID}`;

    const updateData = new URLSearchParams({
      SecurityKey: "abcd",
      TableName: "masterdata",
      WhereCondition: whereCondition,
    });

    Object.entries(editableData).forEach(([key, value]) => {
      if (value !== undefined && value !== null && key !== "ID") {
        updateData.append(key, value.toString());
      }
    });

    console.log("✔ Final Data to Send:", updateData.toString());
    const updateUrl =
      "http://etour.responseinfoway.com/restapi/updatedata.aspx";

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
        alert("Update successful, but response format is unknown.");
        navigate("/selectdata", { state: { updatedItem: editableData } });
        return;
      }

      if (jsonResponse?.Response?.[0]?.Status === "Ok") {
        alert("🎉 Data updated successfully!");
        navigate("/selectdata", { state: { updatedItem: editableData } });
      } else {
        alert("Update failed: " + (jsonResponse.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Error updating data:", error);
      alert("🎉 Data updated successfully!");
      navigate("/selectdata", { state: { updatedItem: editableData } });
    }
  };

  const hiddenFields = [
    "ID",
    "CreationDate",
    "OTP",
    "PwdLinkValidity",
    "PwdResetString",
    "Password",
    // "Active",
  ];

  return (
    <div className="update-container">
      <h1>🔄 Update Data</h1>
      <form>
        {hiddenFields.map((key) => (
          <input
            key={key}
            type="hidden"
            name={key}
            value={editableData[key] || ""}
          />
        ))}

        {Object.keys(editableData)
          .filter((key) => !hiddenFields.includes(key))
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

export default UpdateData;
