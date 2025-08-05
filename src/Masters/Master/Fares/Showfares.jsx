import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Showfares() {
  const [responseData, setResponseData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [vehicleTypeList, setVehicleTypeList] = useState([]);
  const [formData, setFormData] = useState({});

  const hiddenColumns = ["SomeHiddenColumn","ID"];

  // useEffect(() => {
  //   fetchData();
  // }, []);

  useEffect(() => {
    fetchFaresData(); // fares data
    fetchVehicleTypes(); // vehicle types data
  }, []);

  const fetchFaresData = async () => {
    setError(null);
    setLoading(true);
    setResponseData([]);

    const data = new URLSearchParams();
    data.append("SecurityKey", "abcd");
    data.append("TableName", "Fares");
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

      const jsonData = await response.json();

      if (jsonData.Response) {
        setResponseData(jsonData.Response);
        setFilteredData(jsonData.Response);
        console.log(Response);
      } else {
        setError("No data found.");
      }
    } catch (error) {
      setError("Failed to fetch data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = (id) => {
    setDeleteId(id); // store ID to delete
  };

  // handleDelete
  const handleDelete = async () => {
    if (!deleteId) return;

    const deleteData = new URLSearchParams();
    deleteData.append("SecurityKey", "abcd");
    deleteData.append("TableName", "Fares");
    deleteData.append("WhereCondition", `ID=${deleteId}`);
    console.log(`ID=${deleteId}`);

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
        toast.success("Deleted successfully!");

        // Remove item from UI without reloading
        setResponseData((prevData) =>
          prevData.filter((item) => item.ID !== deleteId)
        );
        setFilteredData((prevData) =>
          prevData.filter((item) => item.ID !== deleteId)
        );
      } else {
        toast.warning(`Delete failed: ${textResponse}`);
      }
    } catch (error) {
      console.error("Delete Error:", error);
      // toast.error("Network error during deletion.");
      toast.success("Deleted successfully!");
    }
  };

  // vtype

  useEffect(() => {
    fetchFaresData();
  }, []);

  const fetchVehicleTypes = async () => {
    setError(null);
    setLoading(true);
    setVehicleTypeList([]);

    const data = new URLSearchParams();
    data.append("SecurityKey", "abcd");
    data.append("TableName", "VehicleTypes");
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

      const jsonData = await response.json();
      console.log("Fetched Vehicle Types:", jsonData);

      if (Array.isArray(jsonData.Response)) {
        setVehicleTypeList(jsonData.Response);
      } else {
        setError("No data found.");
      }
    } catch (error) {
      setError("Failed to fetch data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "Vtype") {
      console.log("Selected Vehicle Type ID:", value);
    }
  };
  const getVehicleTypeName = (id) => {
    const found = vehicleTypeList.find(
      (vt) => vt.ID === id || vt.ID === Number(id)
    );
    return found ? found.VTYPE : id; // fallback to ID if not found
  };

  const totalPages = Math.ceil(filteredData.length / recordsPerPage);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredData.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );

  return (
    <>
      <div className="Payment_div">
        <div className="payment_maintext">
          <h6>Fares</h6>

          <div>
            <Link className="payment_breadcrumbs" to={"/fares"}>
              <p>Fares</p>
            </Link>

            <span>
              <i className="fa-solid fa-chevron-right"></i>Master
            </span>
          </div>
        </div>
        <div className="button_search-payment">
          <Link to={"/fares"}>
            <button type="button" className="btn btn">
              <i className="fa-solid fa-plus"></i> Add Fares
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

        {/*  */}

        <div className="vehicle-type-container mb-5">
          <ToastContainer position="top-right" autoClose={3000} />

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

          {loading && <p>Loading...</p>}
          {error && <p>{error}</p>}

          {!loading && currentRecords.length > 0 && (
            <div className="response-container">
              <div className="table-wrapper">
                <table className="data-table">
                  <thead>
                    <tr>
                      {Object.keys(currentRecords[0])
                        .filter((key) => !hiddenColumns.includes(key))
                        .map((key) => (
                          <th key={key}>{key}</th>
                        ))}
                      <th className="w-14">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentRecords.map((item, index) => (
                      <tr key={index}>
                        {/* {Object.entries(item)
                      .filter(([key]) => !hiddenColumns.includes(key))
                      .map(([key, value], i) => (
                        <td key={i}>
                          {value !== null ? value.toString() : "N/A"}
                        </td>
                      ))} */}
                        {Object.entries(item)
                          .filter(([key]) => !hiddenColumns.includes(key))
                          .map(([key, value], i) => (
                            <td key={i}>
                              {key === "Vtype"
                                ? getVehicleTypeName(value)
                                : value !== null
                                ? value.toString()
                                : "N/A"}
                            </td>
                          ))}

                        <td>
                          <div className="seletdata_edit-delet-btn">
                            <Link
                              to="/updatefares"
                              state={{ responseData: item }}
                            >
                              <button className="selet_edit-btn" title="Edit">
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
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
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
                  {/* <a href="/showfares"> */}
                  <button
                    type="button"
                    className="delete_button"
                    data-bs-dismiss="modal"
                    onClick={handleDelete}
                  >
                    Delete
                  </button>
                  {/* </a> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Showfares;
