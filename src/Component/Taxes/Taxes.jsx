import { BsThreeDotsVertical } from "react-icons/bs";
import "./Taxes.css";
import { useState } from "react";

function Taxes() {
  const [searchTerm, setSearchTerm] = useState("");
  const [taxes, setTaxes] = useState([]);
  const [taxName, setTaxName] = useState("");
  const [taxRate, setTaxRate] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);


  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (taxName.trim() === "" || taxRate.trim() === "") {
      return;
    }

    if (editIndex !== null) {
      const updatedTaxes = taxes.map((tax, index) =>
        index === editIndex ? { name: taxName, rate: taxRate } : tax
      );
      setTaxes(updatedTaxes);
      setEditIndex(null);
    } else {
      setTaxes([...taxes, { name: taxName, rate: taxRate }]);
    }
    
    setTaxName("");
    setTaxRate("");
    setShowEditModal(false);
  };

  const handleEdit = (index) => {
    setTaxName(taxes[index].name);
    setTaxRate(taxes[index].rate);
    setEditIndex(index);
    setShowEditModal(true);
  };

  const handleDelete = () => {
    setTaxes(taxes.filter((_, i) => i !== deleteIndex));
    setShowDeleteModal(false);
  };

  return (
    <>
      <div className="container-fluid">
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
              <div className="grid grid-cols-3 gap-3">
                {/* Taxes Name Input */}
                <div>
                  <label className="block text-gray-600 text-sm font-medium ">
                    Taxes Name
                  </label>
                  <input
                    type="text"
                    placeholder="Taxes Name"
                    value={taxName}
                    onChange={(e) => setTaxName(e.target.value)}
                    className="w-full border rounded outline outline-none  mt-2 "
                  />
                </div>

                {/* Taxes Rate Input */}

                <div>
                  <label className="block text-gray-600 text-sm font-medium">
                    Taxes Rate (%)
                  </label>
                  <input
                    type="text"
                    placeholder="Taxes Rate"
                    value={taxRate}
                    onChange={(e) => setTaxRate(e.target.value)}
                    className="w-full border rounded outline outline-none  mt-2 "
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
                      <td className="p-2 border">{tax.name}</td>
                      <td className="p-2 border">{tax.rate}</td>
                      <td
                        className="border"
                        data-bs-toggle="modal"
                        data-bs-target="#taxes_editmodel-taxes"
                      >
                        <i id="update_taxes" className="fa-solid fa-pen"
                           onClick={() => handleEdit(index)}
                        >
                        </i>
                      </td>
                      <td
                        className="border"
                        data-bs-toggle="modal"
                        data-bs-target="#taxes_deletmodelt-axes"
                      >
                        <i id="delet_taxes" className="fa-solid fa-trash"
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
              <i class="fa-solid fa-trash"></i>
            </div>
            <div className="taxes_pcolom">
              <h6>Confirm Delete</h6>
              <p>
                Are you sure you want to delete 
              </p>
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
                <input type="text" placeholder="Taxes Name" 
                  value={taxName} onChange={(e) => setTaxName(e.target.value)}
                />

                <input type="text" placeholder="Taxes Rate (%)" 
                   value={taxRate} onChange={(e) => setTaxRate(e.target.value)}
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
                onClick={handleSubmit}
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
