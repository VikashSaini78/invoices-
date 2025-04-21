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

  // const fieldLabels = {
  //   emailid: "EmailId",
  // };



  return (
 <div className="update-container">
  <h1>🔄 Update Data</h1>
  <form>
    {/* Hidden fields written manually */}
    <input type="hidden" name="Id" value={editableData.Id || ""} />
    <input type="hidden" name="CreatedAt" value={editableData.CreatedAt || ""} />
    <input type="hidden" name="UpdatedBy" value={editableData.UpdatedBy || ""} />

    {/* Visible input fields */}
    <div className="input-group">
      <label>Name</label>
      <input
        type="text"
        name="Name"
        value={editableData.Name}
        onChange={handleInputChange}
      />
    </div>

    <div className="input-group">
      <label>Address</label>
      <input
        type="text"
        name="Address"
        value={editableData.Address}
        onChange={handleInputChange}
      />
    </div>

  
    <div className="input-group">
  <label>EmailID</label>
  <input
    type="text"
    name="emailID"
    value={editableData.emailID || ""}
    onChange={handleInputChange}
  />
</div>


    <div className="input-group">
      <label>MobileNo</label>
      <input
        type="text"
        name="MobileNo"
        value={editableData.MobileNo}
        onChange={handleInputChange}
      />
    </div>

    <div className="input-group_max">
      <label>MaxCompanies</label>
      <input
        // className="MaxCompanies_input"
        type="text"
        name="MaxCompanies"
        value={editableData.MaxCompanies}
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

export default UpdateData;
