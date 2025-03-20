import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./selectdata.css";

const Selectdata = () => {
  const [responseData, setResponseData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteId, setDeleteId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const recordsPerPage = 5;
  const hiddenColumns = ["ID", "OTP", "PwdResetString", "PwdLinkValidity","Password"];

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    applyFilter(searchQuery);
  }, [responseData, searchQuery]);

  const fetchData = async () => {
    setError(null);
    setResponseData([]);

    console.log("Fetching Data...");

    const data = new URLSearchParams();
    data.append("SecurityKey", "abcd");
    data.append("TableName", "masterdata");
    data.append("WhereCondition", "All");
    data.append("*", "*");

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
      console.log("Fetched Response Data:", jsonData);

      if (jsonData.Response) {
        setResponseData(jsonData.Response);
        setFilteredData(jsonData.Response);
      } else {
        setError("No data found.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to fetch data. Please try again.");
    }
  };

  const applyFilter = (query) => {
    if (!query) {
      setFilteredData(responseData);
    } else {
      const lowerQuery = query.toLowerCase();
      const filtered = responseData.filter((item) =>
        Object.values(item).some(
          (value) =>
            value &&
            value.toString().toLowerCase().includes(lowerQuery)
        )
      );
      setFilteredData(filtered);
    }
    setCurrentPage(1);
  };

  const confirmDelete = (id) => {
    setDeleteId(id);
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    const deleteData = new URLSearchParams();
    deleteData.append("SecurityKey", "abcd");
    deleteData.append("TableName", "masterdata");
    deleteData.append("WhereCondition", `ID=${deleteId}`);

    const deleteUrl =
      "http://etour.responseinfoway.com/restapi/deletedata.aspx";

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

      if (
        textResponse.toLowerCase().includes("deleted") ||
        textResponse.toLowerCase().includes("success")
      ) {
        setResponseData((prevData) =>
          prevData.filter((item) => item.ID !== deleteId)
        );
      } else {
        throw new Error(`API responded with failure: ${textResponse}`);
      }
    } catch (error) {
      console.error("Delete Error:", error);
    }
  };

  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const currentRecords = filteredData.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(filteredData.length / recordsPerPage);

  return (
    <div className="masdata_container">
      {error && <p className="error-message">{error}</p>}

      {/* Search Filter */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {filteredData.length > 0 && (
        <div className="response-container">
          <h5>Response Data:</h5>

          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  {Object.keys(filteredData[0])
                    .filter((key) => !hiddenColumns.includes(key))
                    .map((key) => (
                      <th
                        key={key}
                        className={
                          key === "MaxCompanies" ? "max-companies-column" : ""
                        }
                      >
                        {key}
                      </th>
                    ))}
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {currentRecords.map((item, index) => (
                  <tr key={index}>
                    {Object.entries(item)
                      .filter(([key]) => !hiddenColumns.includes(key))
                      .map(([key, value], i) => (
                        <td
                          key={i}
                          className={
                            key === "MaxCompanies" ? "max-companies-column" : ""
                          }
                        >
                          {value !== null ? value.toString() : "N/A"}
                        </td>
                      ))}
                    <td>
                      <div className="seletdata_edit-delet-btn">
                      <button className="selet_reset-pass">
                            Resetpass..
                          </button>
                        <Link to="/updatedata" state={{ responseData: item }}>
                          <button className="selet_edit-btn">
                            <i className="fa-solid fa-pen-to-square"></i>
                          </button>
                        </Link>
                        <button
                          className="select_delete-btn"
                          data-bs-toggle="modal"
                          data-bs-target="#deleteConfirmationModal"
                          onClick={() => confirmDelete(item.ID)}
                        >
                          <i className="fa-solid fa-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className="select_pagination">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <div className="modal fade" id="deleteConfirmationModal">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="close_topbutton-taxes">
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="delet_icon-boxtaxes">
              <i className="fa-solid fa-trash"></i>
            </div>
            <div className="taxes_pcolom">
              <h6>Confirm Delete</h6>
              <p>Are you sure you want to delete?</p>
            </div>
            <div className="close_bottombutton-taxes">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button type="button" className="delete_button" data-bs-dismiss="modal" onClick={handleDelete}>Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Selectdata;
  