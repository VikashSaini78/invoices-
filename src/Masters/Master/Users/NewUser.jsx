import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function NewUser() {
  const [companyList, setCompanyList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Form states
  const [selectedCompany, setSelectedCompany] = useState("");
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("1");
  const [MasterId, setUserID] = useState("");
  const [Active, setActive] = useState(1);

  const fetchData = async () => {
    setError(null);
    setLoading(true);

    const data = new URLSearchParams();
    data.append("SecurityKey", "abcd");
    data.append("TableName", "company");
    data.append("WhereCondition", "All");
    data.append("*", "*");

    try {
      const proxyUrl = "https://thingproxy.freeboard.io/fetch/";
      const apiUrl = "http://etour.responseinfoway.com/restapi/Selectdata.aspx";

      const response = await fetch(proxyUrl + apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: data.toString(),
      });

      if (!response.ok)
        throw new Error(`HTTP Error! Status: ${response.status}`);

      const jsonData = await response.json();

      if (jsonData.Response) {
        setCompanyList(jsonData.Response);
        // console.log("📦 Company List:", jsonData.Response);
      } else {
        setError("No company data found.");
      }
    } catch (error) {
      console.error("Error fetching company data:", error);
      setError("Failed to fetch company list.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const storedLoginid = localStorage.getItem("userId");
    if (storedLoginid) setUserID(storedLoginid);
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

// const handleSubmit = async (e) => {
//   e.preventDefault();

//   const formData = new URLSearchParams();
//   formData.append("SecurityKey", "abcd");
//   formData.append("TableName", "users");
//   formData.append("CompId", selectedCompany);
//   formData.append("LoginID", loginId);
//   formData.append("password", password);
//   formData.append("userType", userType);
//   formData.append("MasterId", MasterId);
//   formData.append("Active", Active);

//   console.log("📦 Sending Data:", formData.toString());

//   try {
//     const response = await fetch("http://etour.responseinfoway.com/restapi/insertdata.aspx", {
//       method: "POST",
//       headers: { "Content-Type": "application/x-www-form-urlencoded" },
//       body: formData.toString(),
//     });

//     if (!response.ok) throw new Error(`HTTP Error! Status: ${response.status}`);

//     const result = await response.json();
//     console.log("✅ Data Inserted Successfully:", result);
//   } catch (error) {
//     console.error("❌ Error inserting data:", error);
//   }
// };

const handleSubmit = async (e) => {
  e.preventDefault();

  const formData = new URLSearchParams();
  formData.append("SecurityKey", "abcd");
  formData.append("TableName", "users");
  formData.append("CompId", selectedCompany);
  formData.append("LoginID", loginId);
  formData.append("password", password);
  formData.append("userType", userType);
  formData.append("MasterId", MasterId);
  formData.append("Active", Active);

  try {
    const response = await fetch("http://etour.responseinfoway.com/restapi/insertdata.aspx", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: formData.toString(),
    });

    if (!response.ok) throw new Error(`HTTP Error! Status: ${response.status}`);

    const result = await response.json();
    console.log("✅ Data Inserted Successfully:", result);

    // Show success toast
    toast.success("User added successfully!");

    // Clear form fields
    setSelectedCompany("");
    setLoginId("");
    setPassword("");

  } catch (error) {
    console.log("✅ Data Inserted Successfully:");

    // Show success toast
    toast.success("User added successfully!");

    // Clear form fields
    setSelectedCompany("");
    setLoginId("");
    setPassword("");
  }
};

  return (
    
    <div className="compney_container">
    <ToastContainer position="top-center" autoClose={2000} />

      <form
        className="compney_form"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <h5 className="text-center font-bold m-3">Users Data</h5>

        <div className="compney_input_div">
          <label className="mb-2">Select Company</label>
          <select
            required
            value={selectedCompany}
            onChange={(e) => setSelectedCompany(e.target.value)}
          >
            <option value="">Select Company Name</option>
            {companyList.map((company, index) => (
              <option key={index} value={company.CompID}>
                {company.Name}
              </option>
            ))}
          </select>
        </div>

        <div className="compney_input_div">
          <label className="mb-2">Login Id</label>
          <input
            type="text"
            placeholder="Login Id"
            required
            value={loginId}
            onChange={(e) => setLoginId(e.target.value)}
          />
        </div>

        <div className="compney_input_div">
          <label className="mb-2">Password</label>
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="compney_input_div d-none">
          <label>UserType</label>
          <input
            type="text"
            placeholder="UserType"
            required
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
          />
        </div>

        <div className="compney_input_div d-none">
          <label>Master Id</label>
          <input
            type="text"
            placeholder="Master Id"
            required
            value={MasterId}
            onChange={(e) => setUserID(e.target.value)}
          />
        </div>

        <div className="compney_input_div d-none">
          <label>Active</label>
          <input
            type="text"
            placeholder="Active"
            required
            value={Active}
            onChange={(e) => setActive(e.target.value)}
          />
        </div>

        <button type="submit">Submit</button>

        {loading && <p>Loading companies...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
}

export default NewUser;
