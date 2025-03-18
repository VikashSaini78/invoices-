import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./selectdata.css";

const Selectdata = () => {
  const [formData, setFormData] = useState({
    TableName: "",
    WhereCondition: "",
    "*": "*",
  });

  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setResponseData(null);

    console.log("Submitting Data:", formData);

    const data = new URLSearchParams();
    data.append("SecurityKey", "abcd");
    data.append("TableName", formData.TableName || "");
    data.append("WhereCondition", formData.WhereCondition || "");
    data.append("*", formData["*"] || "");

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

      if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
      }

      const jsonData = await response.json();
      console.log("Parsed Response Data:", jsonData);

      if (jsonData.Response) {
        setResponseData(jsonData.Response);
      } else {
        setError("No data found.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to fetch data. Please try again.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this record?")) return;

    const deleteData = new URLSearchParams();
    deleteData.append("SecurityKey", "abcd");
    deleteData.append("TableName", formData.TableName);
    deleteData.append("WhereCondition", `ID=${id}`);

    const deleteUrl = "http://etour.responseinfoway.com/restapi/deletedata.aspx";

    try {
      const response = await fetch(deleteUrl, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: deleteData.toString(),
      });

      if (!response.ok) {
        throw new Error(`API error! HTTP Status: ${response.status}`);
      }

      const textResponse = await response.text();
      console.log("Delete Response:", textResponse);

      if (textResponse.toLowerCase().includes("deleted") || textResponse.toLowerCase().includes("success")) {
        alert("Data deleted successfully!");
        setResponseData((prevData) => prevData.filter((item) => item.ID !== id));
      } else {
        throw new Error(`API responded with failure: ${textResponse}`);
      }
    } catch (error) {
      console.error("Delete Error:", error);
    }
  };

  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const currentRecords = responseData ? responseData.slice(firstIndex, lastIndex) : [];
  const totalPages = responseData ? Math.ceil(responseData.length / recordsPerPage) : 1;

  return (
    <div className="masdata_container">
      <form className="Columname-inputcolom" onSubmit={handleSubmit}>
        <h5 className="fw-bold mb-2 m-auto">Select Data</h5>
        <div className="input_text-labalname">
          <label>Table Name</label>
          <input type="text" name="TableName" placeholder="Enter Table Name" value={formData.TableName} onChange={handleChange} required />
        </div>
        <div className="input_text-labalname">
          <label>Where Condition</label>
          <input type="text" name="WhereCondition" placeholder="Enter mobileno=8000000000, or All" value={formData.WhereCondition} onChange={handleChange} required />
        </div>
        <button className="selectdat-submit_btn" type="submit">Submit</button>
      </form>

      {error && <p className="error-message">{error}</p>}

      {responseData && responseData.length > 0 && (
        <div className="response-container">
          <h5>Response Data:</h5>
          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  {Object.keys(responseData[0]).map((key) => (
                    <th key={key}>{key}</th>
                  ))}
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentRecords.map((item, index) => (
                  <tr key={index}>
                    {Object.values(item).map((value, i) => (
                      <td key={i}>{value !== null ? value.toString() : "N/A"}</td>
                    ))}
                    <td>
                      <div className="seletdata_edit-delet-btn">
                        <Link to="/updatedata" state={{ responseData: item }}>
                          <button className="selet_edit-btn"><i className="fa-solid fa-pen-to-square"></i></button>
                        </Link>
                        <button className="select_delete-btn" onClick={() => handleDelete(item.ID)}>
                          <i className="fa-solid fa-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <nav aria-label="Page navigation example">
              <ul className="pagination justify-content-center">
                <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                  <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>
                </li>
                {[...Array(totalPages)].map((_, i) => (
                  <li key={i} className={`page-item ${currentPage === i + 1 ? "active" : ""}`}>
                    <button className="page-link" onClick={() => setCurrentPage(i + 1)}>{i + 1}</button>
                  </li>
                ))}
                <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                  <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
};

export default Selectdata;