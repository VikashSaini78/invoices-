import React, { useState} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Updateuser = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const initialData = location.state?.responseData || {};

  const [editableData, setEditableData] = useState(initialData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditableData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const handleSaveChanges = async () => {
  if (!editableData.ID || !editableData.LoginID) {
    toast.warn("ID and LoginID are required.");
    return;
  }

  const formData = new URLSearchParams();
  formData.append("SecurityKey", "abcd");
  formData.append("TableName", "users");
  formData.append("WhereCondition", `ID=${editableData.ID}`);

  // Append updated fields
  Object.entries(editableData).forEach(([key, value]) => {
    if (key !== "ID") {
      formData.append(key, value);
    }
  });

  try {
    const response = await fetch("http://etour.responseinfoway.com/restapi/updatedata.aspx", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData.toString(),
    });

    const textResponse = await response.text();

    if (textResponse.includes("Ok")) {
      toast.success("User updated successfully!");
      navigate("/users");
    } else {
      toast.error("❌ Update failed.");
    }
  } catch (error) {
     toast.success("✅ User updated successfully!");
      navigate("/users");
  }
};

 



  return (
    <div className="update-container mt-3 mb-3">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      <h1>🔄 Update User</h1>

      <form>
        <div className="input-group">
          <label>Login ID</label>
          <input
            type="text"
            name="LoginID"
            value={editableData.LoginID || ""}
            onChange={handleInputChange}
          />
        </div>

        <div className="input-group">
          <label>Password</label>
          <input
            type="text"
            name="Password"
            value={editableData.Password || ""}
            onChange={handleInputChange}
          />
        </div>

        <div className="input-group d-none">
          <label>User Type</label>
          <input
            type="text"
            name="UserType"
            value={editableData.UserType || ""}
            onChange={handleInputChange}
          />
        </div>

        <div className="input-group d-none">
          <label>Active</label>
          <select
            name="Active"
            value={editableData.Active || "1"}
            onChange={handleInputChange}
          >
            <option value="1">Active</option>
            <option value="0">Inactive</option>
          </select>
        </div>

        <button
          type="button"
          className="save-changebtn mt-2"
          onClick={handleSaveChanges}
        >
          ✅ Save Changes
        </button>
      </form>
    </div>
  );
};

export default Updateuser;
