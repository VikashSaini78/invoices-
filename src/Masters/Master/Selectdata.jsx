import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoSettingsSharp } from "react-icons/io5";
import "./selectdata.css";
// import { BsThreeDotsVertical } from "react-icons/bs";

const Selectdata = () => {
  const [responseData, setResponseData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteId, setDeleteId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [userId, setUserId] = useState(null);
  // const [userId, setUserId] = useState("");
  const [userType, setUserType] = useState(null);
  const loginUserId = localStorage.getItem("userId") || "";

  // const navigate = useNavigate();
  const hiddenColumns = [
    "ID",
    "OTP",
    "PwdResetString",
    "PwdLinkValidity",
    "Password",
    "Active",
    "usertype",
  ];

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    applyFilter(searchQuery);
  }, [responseData, searchQuery]);

  const fetchData = async () => {
    setError(null);
    setLoading(true);
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
      setError("Failed to fetch data. Please reference this page.");
    } finally {
      setLoading(false);
    }
  };

useEffect(() => {
  const storedUserType = localStorage.getItem("userType");
  console.log("UserType from localStorage:", storedUserType);
  setUserType(storedUserType);  // ✅ Fix: Set state properly

  if (storedUserType === "9") {
    fetchData(); // only fetch for admin
  } else {
    console.warn("Unauthorized User Type:", storedUserType);
  }
}, []);


useEffect(() => {
  const userType = localStorage.getItem("userType");
  console.log("UserType from localStorage:", userType);
  // You already handled this in the above useEffect
}, []);




  const applyFilter = (query) => {
    if (!query) {
      setFilteredData(responseData);
    } else {
      const lowerQuery = query.toLowerCase();
      const filtered = responseData.filter((item) =>
        Object.values(item).some(
          (value) =>
            value && value.toString().toLowerCase().includes(lowerQuery)
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

  const toggleStatus = async (id) => {
    const itemToUpdate = responseData.find((item) => item.ID === id);
    if (!itemToUpdate) return;

    const currentStatus = itemToUpdate.Active?.toString().toLowerCase();
    const newStatus = currentStatus === "true" ? "false" : "true";

    // Update local state optimistically
    setResponseData((prevData) =>
      prevData.map((item) =>
        item.ID === id ? { ...item, Active: newStatus } : item
      )
    );

    const requestBody = new URLSearchParams();
    requestBody.append("SecurityKey", "abcd");
    requestBody.append("TableName", "masterdata");
    requestBody.append("WhereCondition", `ID=${id}`);
    requestBody.append("Active", newStatus);

    try {
      const response = await fetch(
        "http://etour.responseinfoway.com/restapi/updatedata.aspx",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Accept: "application/json",
          },
          body: requestBody.toString(),
        }
      );

      const text = await response.text();
      console.log("📥 Raw Response Text:", text);

      let result;
      try {
        result = JSON.parse(text);
      } catch (e) {
        console.warn("⚠ JSON parse fail");
      }

      if (result?.Response?.[0]?.Status === "Ok") {
        console.log("Status updated");

        // ⬇Optional: Refresh latest data from API
        fetchLatestData();
      } else {
        console.error(" Failed to update:", result);
      }
    } catch (error) {
      console.error(" API error:", error);
    }
  };

  const fetchLatestData = async () => {
    try {
      const res = await fetch(
        "http://etour.responseinfoway.com/restapi/getalldata.aspx",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            SecurityKey: "abcd",
            TableName: "masterdata",
          }),
        }
      );
      const text = await res.text();
      const result = JSON.parse(text);
      if (result?.Response) {
        setResponseData(result.Response);
      }
    } catch (err) {
      console.error("Error fetching data", err);
    }
  };

  // date

  const formatDate = (value) => {
    if (!value) return "N/A";
    const dateOnly = value.split("T")[0];
    const [year, month, day] = dateOnly.split("-");
    return `${day}-${month}-${year}`;
  };


  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const currentRecords = filteredData.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(filteredData.length / recordsPerPage);

  return (

    <>
      {/* <h1>  usertype:{userType}</h1> */}
        <div>
    {userType === "9" ? (
      <div>
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {responseData.length > 0 ? (
         <>
           <div className="masdata_container">
      {loading && <p className="loading-message">Loading data...</p>}
      {error && <p className="error-message">{error}</p>}

      <div className="Payment_div">
        <div className="payment_maintext">
          <h6>Master</h6>
          {/* <h1>{userType}</h1> */}

          <div>
            <Link className="payment_breadcrumbs" to={"/selectcompny"}>
              <p>Company</p>
            </Link>

            <span>
              <i className="fa-solid fa-chevron-right"></i>Master
            </span>
          </div>
        </div>
        <div className="button_search-payment">
          <Link to={"/masterdata"}>
            <button type="button" className="btn btn">
              <i className="fa-solid fa-plus"></i> Add Master
            </button>
          </Link>
          <div className="search-input_box">
            <input
              type="search"
              className="form-control"
              placeholder="Search for name or designation..."
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="search-container mt-3">
        <div className="records-per-page-container">
          <label htmlFor="recordsPerPage">Records Per Page:</label>
          <select
            id="recordsPerPage"
            value={recordsPerPage}
            onChange={(e) => setRecordsPerPage(Number(e.target.value))}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
          </select>
        </div>
      </div>

      {!loading && filteredData.length === 0 && !error && (
        <p className="no-data-message">No data available.</p>
      )}

      {filteredData.length > 0 && (
        <div className="response-container">
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
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                      </th>
                    ))}
                  <th>Active</th>
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
                          style={
                            key === "Address"
                              ? { minWidth: "140px" }
                              : key === "emailID"
                              ? {
                                  maxWidth: "160px",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  whiteSpace: "nowrap",
                                }
                              : {}
                          }
                        >
                          {value !== null
                            ? key.toLowerCase().includes("date")
                              ? formatDate(value.toString())
                              : value.toString()
                            : "N/A"}
                        </td>
                      ))}
                    <td>
                      <div className="form-check form-switch">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={
                            item.Active?.toString().toLowerCase() === "true"
                          }
                          onChange={() => toggleStatus(item.ID)}
                        />
                      </div>
                    </td>
                    <td>
                      <div className="seletdata_edit-delet-btn">
                        <Link to={`/resetpass/${item.ID}/${item.Name}`}>
                          <button className="selet_reset-pass">
                            <IoSettingsSharp />
                          </button>
                        </Link>
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
          <div className="select_pagination mt-4">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span>
              &nbsp; {currentPage} of {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              &nbsp; Next
            </button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <div className="modal fade" id="deleteConfirmationModal">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="close_topbutton-taxes">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="delet_icon-boxtaxes">
              <i className="fa-solid fa-trash"></i>
            </div>
            <div className="taxes_pcolom">
              <h6>Confirm Delete</h6>
              <p>Are you sure you want to delete?</p>
            </div>
            <div className="close_bottombutton-taxes">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                className="delete_button"
                data-bs-dismiss="modal"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
         </>
        ) : (
          !loading && <p>No data to show.</p>
        )}
      </div>
    ) : (
      <p className="m-4">You are not authorized to view this data.</p>
    )}
  </div>



{/*  */}
 
    </>
    
    
  );
};

export default Selectdata;
