import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../Master/selectdata.css";
// import { BsThreeDotsVertical } from "react-icons/bs";

const Selectcompny = () => {
  const [responseData, setResponseData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteId, setDeleteId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [states, setStates] = useState([]);

  // const [paymenticon, setpaymenticon] = useState("");

  const hiddenColumns = ["StateCode", "MasterId", "CompID"];

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
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: data.toString(),
      });

      if (!response.ok)
        throw new Error(`HTTP Error! Status: ${response.status}`);

      const jsonData = await response.json();
      if (jsonData.Response) {
        setResponseData(jsonData.Response);
        setFilteredData(jsonData.Response);
        console.log("📦 Response Data:", jsonData.Response);
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

  const applyFilter = (query) => {
    if (!query) {
      setFilteredData(responseData);
    } else {
      const lowerQuery = query.toLowerCase();
      const filtered = responseData.filter((item) =>
        Object.values(item).some(
          (val) => val && val.toString().toLowerCase().includes(lowerQuery)
        )
      );
      setFilteredData(filtered);
    }
    setCurrentPage(1);
  };

  const confirmDelete = (compId) => setDeleteId(compId);

  const handleDelete = async () => {
    if (!deleteId) return;

    const deleteData = new URLSearchParams();
    deleteData.append("SecurityKey", "abcd");
    deleteData.append("TableName", "company");
    deleteData.append("WhereCondition", `CompID=${deleteId}`);

    try {
      const response = await fetch(
        "http://etour.responseinfoway.com/restapi/deletedata.aspx",
        {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: deleteData.toString(),
        }
      );

      if (!response.ok)
        throw new Error(`API error! HTTP Status: ${response.status}`);

      const textResponse = await response.text();
      console.log("Delete Response:", textResponse);

      if (
        textResponse.toLowerCase().includes("deleted") ||
        textResponse.toLowerCase().includes("success")
      ) {
        setResponseData((prevData) =>
          prevData.filter((item) => item.CompID !== deleteId)
        );
        setFilteredData((prevData) =>
          prevData.filter((item) => item.CompID !== deleteId)

        );
        // alert("Data deleted successfully!")
      } else {
        throw new Error(`API responded with failure: ${textResponse}`);
      }
      // alert("Data deleted falid!");
    } 
    catch (error) {
      console.error("Delete Error:", error);
    }
    // alert("Data deleted successfully ✅");

  };



  useEffect(() => {
    fetchData();
    fetchStates();
  }, []);

  const fetchStates = async () => {
    const data = new URLSearchParams();
    data.append("SecurityKey", "abcd");
    data.append("TableName", "gststates");
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

      const json = await response.json();
      if (json.Response) {
        setStates(json.Response);
        console.log("✅ States fetched:", json.Response); // Debug here
      }
    } catch (error) {
      console.error("Failed to fetch states:", error);
    }
  };

  // console.log("🧾 Matching StateID:", id);
  console.log("🧾 States List:", states);

  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const currentRecords = filteredData.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(filteredData.length / recordsPerPage);

  const getStateName = (id) => {
    const match = states.find((state) => String(state.ID) === String(id));
    return match ? match.State : id;
  };

  return (
    <div className="masdata_container">
      {loading && <p className="loading-message">Loading data...</p>}
      {error && <p className="error-message">{error}</p>}

      <div className="Payment_div">
        <div className="payment_maintext">
          <h6>Company</h6>

          <div>
            <p>Company</p>
            <span>
              <i className="fa-solid fa-chevron-right"></i>Company
            </span>
          </div>
        </div>
        <div className="button_search-payment">
          <Link to={"/compney"}>
            <button type="button" className="btn btn">
              <i className="fa-solid fa-plus"></i> Add Company
            </button>
          </Link>
          <div className="search-input_box">
            <input
              type="search"
              className="form-control"
              placeholder="Search for name or designation..."
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {/* <span onClick={()=>{setpaymenticon(!paymenticon)}}>
             <BsThreeDotsVertical />
             </span> */}
          </div>
        </div>

        {/* {
              paymenticon && (
              
                <div className='payment_three-icons'>
              <ul>All</ul>
              <ul>Last Week</ul>
              <ul>Last Month</ul>
              <ul>Last Year</ul>
              
              </div>
              )
            } */}
      </div>

      <div className="search-container mt-3">
        <div className="records-per-page-container">
          <label htmlFor="recordsPerPage">Records Per Page :</label>
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

      {filteredData.length > 0 && (
        <div className="response-container">
          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  {Object.keys(filteredData[0])
                    .filter((key) => !hiddenColumns.includes(key))
                    .map((key) => (
                      <th key={key}>
                        {key.charAt(0).toUpperCase() + key.slice(1)}
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
                      .map(([key, val], i) => (
                        <td key={i}>
                          {key === "StateID"
                            ? getStateName(val)
                            : val?.toString() || "N/A"}
                        </td>
                      ))}

                    <td>
                      <div className="seletdata_edit-delet-btn">
                        <Link
                          to="/compupdatedata"
                          state={{ responseData: item }}
                        >
                          <button className="selet_edit-btn">
                            <i className="fa-solid fa-pen-to-square"></i>
                          </button>
                        </Link>
                  
                       <button
                          className="select_delete-btn"
                          data-bs-toggle="modal"
                          data-bs-target="#deleteConfirmationModal"
                          onClick={() => confirmDelete(item.CompID)}
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

          <div className="select_pagination mt-4">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span>
              {" "}
              {currentPage} of {totalPages}{" "}
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
                className="btn btn-danger"
                data-bs-dismiss="modal"
                onClick={(e) => handleDelete(e)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Selectcompny;
