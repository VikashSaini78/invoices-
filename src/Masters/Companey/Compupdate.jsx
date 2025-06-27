import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Helper to generate correct logo URL
const getLogoUrl = (fileName) => {
  if (!fileName || fileName === "null") return null;
  const cleanedPath = fileName.replace(/^~\//, "");
  return `http://etour.responseinfoway.com/${cleanedPath}`;
};

const CompUpdateData = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const initialData = location.state?.responseData || {};
  const [editableData, setEditableData] = useState(initialData);
  const [previewImage, setPreviewImage] = useState(getLogoUrl(initialData.LogoPath));

  useEffect(() => {
    console.log("Received Data for Update:", editableData);
  }, [editableData]);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "LogoPath" && files.length > 0) {
      const file = files[0];
      setEditableData((prevData) => ({
        ...prevData,
        [name]: file,
      }));
      // Set preview image
      setPreviewImage(URL.createObjectURL(file));
    } else {
      setEditableData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSaveChanges = async () => {
    if (!editableData.CompID || !editableData.Name) {
      toast.warn("CompID and Name are required.");
      return;
    }

    const formData = new FormData();
    formData.append("SecurityKey", "abcd");
    formData.append("TableName", "company");
    formData.append("WhereCondition", `CompID=${editableData.CompID}`);

    Object.entries(editableData).forEach(([key, value]) => {
      if (key !== "CompID" && value !== undefined && value !== null) {
        formData.append(key, value);
      }
    });

    try {
      const response = await fetch("http://etour.responseinfoway.com/restapi/updatedata.aspx", {
        method: "POST",
        body: formData,
      });

      const textResponse = await response.text();
      let jsonResponse;

      try {
        jsonResponse = JSON.parse(textResponse);
      } catch (error) {
        toast.warn("Update successful, but response format unknown.");
        navigate("/selectcompny", { state: { updatedItem: editableData } });
        return;
      }

      if (jsonResponse?.Response?.[0]?.Status === "Ok") {
        toast.success("🎉 Data updated successfully!");
        navigate("/selectcompny", { state: { updatedItem: editableData } });
      } else {
        toast.error("Update failed: " + (jsonResponse.message || "Unknown error"));
      }
    } catch (error) {
       toast.warn("Update successful, but response format unknown.");
        navigate("/selectcompny", { state: { updatedItem: editableData } });
    }
  };

  return (
    <div className="update-container mt-3 mb-3">
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
          {/* <div className="input-group">
          <label>StateID</label>
          <input
            type="number"
            name="StateID"
            value={editableData.StateID|| ""}
            onChange={handleInputChange}
          />
        </div> */}

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
          <input type="file" name="LogoPath" onChange={handleInputChange} />
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

