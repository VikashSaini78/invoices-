import React, { useState, useEffect } from "react";
import "./selectdata.css";
import { Link } from "react-router-dom";

const UaerTabel = () => {
  const [responseData, setResponseData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [recordsPerPage, setRecordsPerPage] = useState(10);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    applyFilter(searchQuery);
  }, [responseData, searchQuery]);

  // const fetchData = async () => {
  //   setError(null);
  //   setLoading(true);
  //   setResponseData([]);

  //   const data = new URLSearchParams();
  //   data.append("SecurityKey", "abcd");
  //   data.append("TableName", "masterdata");
  //   data.append("WhereCondition", "All");
  //   data.append("*", "*");

  //   try {
  //     const proxyUrl = "https://thingproxy.freeboard.io/fetch/";
  //     const apiUrl = "http://etour.responseinfoway.com/restapi/Selectdata.aspx";

  //     const response = await fetch(proxyUrl + apiUrl, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/x-www-form-urlencoded",
  //       },
  //       body: data.toString(),
  //     });

  //     if (!response.ok) throw new Error(`HTTP Error! Status: ${response.status}`);

  //   //         const jsonData = await response.json();
  //   //   console.log("Fetched Response Data:", jsonData);

  //     const jsonData = await response.json();
  //     console.log("Fetched Response Data:", jsonData);

  //     if (jsonData.Response) {
  //       setResponseData(jsonData.Response);
  //       setFilteredData(jsonData.Response);
  //     } else {
  //       setError("No data found.");
  //     }
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //     setError("Failed to fetch data.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const fetchData = async () => {
    setError(null);
    setLoading(true);
    setResponseData([]);

    const loggedInUserId = localStorage.getItem("userId"); // ✅ get userId from localStorage

    const data = new URLSearchParams();
    data.append("SecurityKey", "abcd");
    data.append("TableName", "masterdata");
    data.append("WhereCondition", `ID=${loggedInUserId}`); // ✅ filter for that specific ID
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
      console.log("Fetched Response Data:", jsonData);

      if (jsonData.Response) {
        setResponseData(jsonData.Response);
        setFilteredData(jsonData.Response);
      } else {
        setError("No data found.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to fetch data.");
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
          (value) =>
            value && value.toString().toLowerCase().includes(lowerQuery)
        )
      );
      setFilteredData(filtered);
    }
    setCurrentPage(1);
  };

  const handleToggleActive = async (id, currentActive) => {
    const newActive = currentActive === "1" ? "0" : "1";

    const updateData = new URLSearchParams({
      SecurityKey: "abcd",
      TableName: "masterdata",
      WhereCondition: `ID=${id}`,
      Active: newActive,
    });

    try {
      const apiUrl = "http://etour.responseinfoway.com/restapi/updatedata.aspx";

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: updateData.toString(),
      });

      const resText = await response.text();
      console.log("Update Response:", resText);

      // Refresh data after update
      fetchData();
    } catch (err) {
      console.error("Failed to update active status", err);
      alert("Error updating active status");
    }
  };

  //   togal

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
    // console.clear()
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

  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const currentRecords = filteredData.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(filteredData.length / recordsPerPage);

  return (
    <div className="masdata_container">
      {loading && <p className="loading-message">Loading data...</p>}
      {error && <p className="error-message">{error}</p>}

      {/* Search Filter */}
      <div className="Payment_div">
        <div className="payment_maintext">
          <h6>Users</h6>

          <div>
            <Link className="payment_breadcrumbs" to={"/selectdata"}>
              <p>Master</p>
            </Link>
            <span>
              <i className="fa-solid fa-chevron-right"></i>Users
            </span>
          </div>
        </div>
        <div className="button_search-payment">
          <Link to={"/masterdata"}>
            <button type="button" className="btn btn">
              <i className="fa-solid fa-plus"></i> Add New Users
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
      {/* <div className="search-container">
        <div className="records-per-page-container">
          <label htmlFor="recordsPerPage">Records Per Page:</label>
          <select
            id="recordsPerPage"
            value={recordsPerPage}
            onChange={(e) => setRecordsPerPage(Number(e.target.value))}
          >
            {[5, 10, 15, 20].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>
 

        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div> */}

      {!loading && filteredData.length === 0 && !error && (
        <p className="no-data-message">No data available.</p>
      )}

      {filteredData.length > 0 && (
        <div className="response-container-user">
          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Login Id</th>
                  <th>Password</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {currentRecords.map((item, index) => (
                  <tr key={index}>
                    <td>{item.MobileNo}</td>
                    <td>{item.Password}</td>
                    <td>
                      {/* Toggle Switch for Active Status */}
                      <div className="form-checku form-switch">
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
    </div>
  );
};

export default UaerTabel;
