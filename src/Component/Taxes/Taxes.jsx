import { BsThreeDotsVertical } from "react-icons/bs";
import "./Taxes.css";
import { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";

function Taxes() {
  const [searchTerm, setSearchTerm] = useState("");
  const [taxes, setTaxes] = useState([]);
  const [taxName, setTaxName] = useState("");
  const [taxRate, setTaxRate] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [responseData, setResponseData] = useState([]);
  const [selectedCompID, setSelectedCompID] = useState("");
  const [selectedCompName, setSelectedCompName] = useState("");

  const [editableData, setEditableData] = useState({});

  const handleEdit = (index) => {
    const selectedTax = taxes[index];
    setEditableData({ ...selectedTax });
    setEditIndex(index);
    setShowEditModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedCompID || taxName.trim() === "" || taxRate.trim() === "") {
      toast.error("Please select company and enter Tax Name & Rate.");
      return;
    }
 
    const proxyUrl = "https://thingproxy.freeboard.io/fetch/"; // Or use your own proxy
    const apiUrl = "http://etour.responseinfoway.com/restapi/insertdata.aspx";

    const formData = new FormData();
    formData.append("SecurityKey", "abcd");
    formData.append("TableName", "taxmaster");
    formData.append("CompID", selectedCompID); 
    // formData.append("TaxName", taxName);
    formData.append("TaxName", taxName.trimEnd());

    formData.append("TaxRate", taxRate);
      

    try {
      const response = await fetch(proxyUrl + apiUrl, {
        method: "POST",
        body: formData,
        
      });

      const text = await response.text();
      console.log("🧾 Raw Server Response:", text);

      let result; 
      try {
        result = JSON.parse(text);
      } catch (err) {
        // toast.error("Server response is not valid JSON.");
        return;
      }

      if (result?.Status === "Success" || result?.Response === "OK") {
        toast.success("Tax submitted successfully!");
        resetForm();
      } else {
        toast.success("Tax submitted successfully!");
      }
      console.log(Response);
    } catch (error) {
      console.warn("❌ Network error:", error);
      toast.error("Network error. Please try again.");
    }
  };

  useEffect(() => {
    const fetchTaxes = async () => {
      const proxyUrl = "https://thingproxy.freeboard.io/fetch/";
      const apiUrl = "http://etour.responseinfoway.com/restapi/Selectdata.aspx";

      const data = new URLSearchParams();
      data.append("SecurityKey", "abcd");
      data.append("TableName", "Taxmaster");
      data.append("WhereCondition", "All");
      data.append("*", "*");

      try {
        const response = await fetch(proxyUrl + apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: data.toString(),
        });

        const text = await response.text();

        let result;
        try {
          result = JSON.parse(text);
        } catch (err) {
          console.error("❌ Failed to parse JSON:", err);
          return;
        }

        if (Array.isArray(result.Response)) {
          console.log("📦 Taxes Data:", result.Response); 
          setTaxes(result.Response);
        } else {
          console.warn("⚠️ Unexpected structure in response:", result);
        }
      } catch (err) {
        console.error("❌ Network error while fetching taxes:", err);
      }
    };

    fetchTaxes();
  }, []);


  // edit 
     

  const handleSaveChanges = async () => {
    const taxId = taxes[editIndex]?.ID;

    if (!taxId) return toast.error("Invalid Tax ID.");

    if (!editableData.TaxName || !editableData.TaxRate) {
      return toast.warn("Please enter both Tax Name and Rate.");
    }

    const formData = new URLSearchParams();
    formData.append("SecurityKey", "abcd");
    formData.append("TableName", "Taxmaster");
    formData.append("WhereCondition", `ID=${taxId}`);
    formData.append("TaxName", editableData.TaxName);
    formData.append("TaxRate", editableData.TaxRate);

    try {
      const response = await fetch(
        "http://etour.responseinfoway.com/restapi/updatedata.aspx",
        {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: formData.toString(),
        }
      );

      const textResponse = await response.text();
      console.log("Edit Response:", textResponse);

      if (textResponse.toLowerCase().includes("ok")) {
        toast.success("✅ Tax updated successfully!");
        window.location.reload();
      } else {
        toast.error("❌ Update failed: " + textResponse);
      }
    } catch (error) {
      console.error("Update Error:", error);
      toast.success("✅ Tax updated successfully!");
    }
  };

  // delet

  const handleDelete = async () => {
    if (deleteIndex === null || !taxes[deleteIndex]) return;

    const deleteId = taxes[deleteIndex].ID; // 👈 adjust if ID is named differently

    const deleteData = new URLSearchParams();
    deleteData.append("SecurityKey", "abcd");
    deleteData.append("TableName", "Taxmaster");
    deleteData.append("WhereCondition", `ID=${deleteId}`); // 👈 critical line

    try {
      const response = await fetch(
        "http://etour.responseinfoway.com/restapi/deletedata.aspx",
        {
          method: "POST",
          headers: {"Content-Type":"application/x-www-form-urlencoded"},
          body: deleteData.toString(),
        }
      );

      const textResponse = await response.text();
      console.log("Delete Response:", textResponse);

      if (
        textResponse.toLowerCase().includes("deleted") ||
        textResponse.toLowerCase().includes("success")
      ) {
        // Filter out deleted tax from state
        setTaxes((prevTaxes) => prevTaxes.filter((_, i) => i !== deleteIndex));
        // setShowDeleteModal(false);
      } else {
        throw new Error(`API responded with failure: ${textResponse}`);
      }
    } catch (error) {
      console.error("Delete Error:", error);
    }
  };

  // Compney

  useEffect(() => {
    const loggedInUserId = localStorage.getItem("userId");

    const fetchCompanies = async () => {
      const proxyUrl = "https://thingproxy.freeboard.io/fetch/";
      const apiUrl = "http://etour.responseinfoway.com/restapi/Selectdata.aspx";

      const data = new URLSearchParams();
      data.append("SecurityKey", "abcd");
      data.append("TableName", "company");
      data.append("WhereCondition", `MasterId=${loggedInUserId}`);
      data.append("*", "*");

      try {
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
        } else {
          toast.error("No companies found.");
        }
      } catch (error) {
        console.error("Error fetching companies:", error);
        // toast.error("Failed to fetch companies.");
      }
    };

    fetchCompanies();
  }, []);

  const handleCompanyChange = (e) => {
    const compId = e.target.value;
    setSelectedCompID(compId);

    const selected = responseData.find((c) => c.CompID.toString() === compId);
    setSelectedCompName(selected?.Name || "");
  };

  const resetForm = () => {
    setTaxName("");
    setTaxRate("");
    setSelectedCompID("");
    setSelectedCompName("");
  };

  return (
    <>
      <div className="container-fluid">
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar />

        <div className="Taxes">
          <div className="Taxes_maintext">
            <h6>TAXES</h6>
            <div>
              <p>Taxes</p>
              <span>
                <i className="fa-solid fa-chevron-right"></i>Invoice
              </span>
            </div>
          </div>
          <div className="button_search-text">
            <button type="button" className="btn btn">
              <i className="fa-solid fa-plus"></i> Add Taxes
            </button>

            <div>
              <input
                type="search"
                className="form-control"
                placeholder="Search for name or designation..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <span>
                <BsThreeDotsVertical />
              </span>
            </div>
          </div>

          <div className="Addtext_Details-colom">
            <h2 className="text-xl font-semibold text-gray-700 mb-4 ">
              Add Tax Details
            </h2>
            {/* Form */}
            <form onSubmit={handleSubmit}>
              <div className="form_table-container">
                {/* Taxes Name Input */}
                <div className=" w-40 ">
                  <label className="block text-gray-600 text-sm font-medium ">
                    Select Compny
                  </label>

                  <select
                    className="w-full border rounded outline outline-none  mt-2 text-sm p-1  text-gray-600 "
                    value={selectedCompID}
                    onChange={handleCompanyChange}
                  >
                    <option value="">Select Company</option>
                    {responseData.map((company) => (
                      <option key={company.CompID} value={company.CompID}>
                        {company.Name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className=" w-20 ml-10">
                  <label className="block text-gray-600 text-sm font-medium ">
                    Taxes Name
                  </label>
                  <input
                    type="text"
                    placeholder="Taxes Name"
                    value={taxName}
                    onChange={(e) => setTaxName(e.target.value)}
                    className="w-20 border rounded outline outline-none m-0 mt-2 "
                  />
                </div>

                {/* Taxes Rate Input */}

                <div className=" w-24">
                  <label className="block text-gray-600 text-sm font-medium">
                    Taxes Rate (%)
                  </label>
                  <input
                    type="text"
                    placeholder="Taxes Rate"
                    value={taxRate}
                    onChange={(e) => setTaxRate(e.target.value)}
                    className="w-20 border rounded outline outline-none  mt-2 "
                  />
                </div>
                <div className="submit_button-taxes">
                  <button type="submit">Save</button>
                </div>
              </div>
            </form>
          </div>

          {taxes.length > 0 && (
            <div className="text_rare-table">
              <table className="w-full border border-gray-300">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="p-2 border text-center">Taxes Name</th>
                    <th className="p-2 border text-center">Taxes Rate (%)</th>
                    <th className="p-2 border text-center">Edit</th>
                    <th className="p-2 border text-center">Delete</th>
                  </tr>
                </thead>

                <tbody>
                  {taxes.map((tax, index) => (
                    <tr key={index} className="text-center">
                      <td className="p-2 border">{tax.TaxName}</td>
                      <td className="p-2 border">{tax.TaxRate}</td>
                      <td
                        className="border"
                        data-bs-toggle="modal"
                        data-bs-target="#taxes_editmodel-taxes"
                      >
                        <i
                          id="update_taxes"
                          className="fa-solid fa-pen"
                          onClick={() => handleEdit(index)}
                        ></i>
                      </td>
                      <td
                        className="border"
                        data-bs-toggle="modal"
                        data-bs-target="#taxes_deletmodelt-axes"
                      >
                        <i
                          id="delet_taxes"
                          className="fa-solid fa-trash"
                          onClick={() => {
                            setDeleteIndex(index);
                            setShowDeleteModal(true);
                          }}
                        ></i>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* delet model  */}

      <div
        className="modal fade"
        id="taxes_deletmodelt-axes"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="close_topbutton-taxes">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="delet_icon-boxtaxes">
              <i className="fa-solid fa-trash"></i>
            </div>
            <div className="taxes_pcolom">
              <h6>Confirm Delete</h6>
              <p>Are you sure you want to delete</p>
            </div>

            <div className="close_bottombutton-taxes">
              <button
                type="button"
                className="cencle_button"
                data-bs-dismiss="modal"
                onClick={() => setShowDeleteModal(false)}
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

      {/* Edit model */}

      <div
        className="modal fade"
        id="taxes_editmodel-taxes"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content adit_model-container">
            <div className="close_topbutton-taxes">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="taxes_modal-body">
              <h6>Edit Taxes</h6>
              <div className="taxes_modal-input">
                <input
                  type="text"
                  placeholder="Taxes Name"
                  value={editableData.TaxName}
                  onChange={(e) =>
                    setEditableData({
                      ...editableData,
                      TaxName: e.target.value,
                    })
                  }
                />

                <input
                  type="text"
                  placeholder="Taxes Rate (%)"
                  value={editableData.TaxRate || ""}
                  onChange={(e) =>
                    setEditableData({
                      ...editableData,
                      TaxRate: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div className="edit_bottombutton-taxes">
              <button
                type="button"
                className="cencl_button"
                data-bs-dismiss="modal"
                onClick={() => setShowEditModal(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="edit_button"
                data-bs-dismiss="modal"
                onClick={handleSaveChanges}
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Taxes;
