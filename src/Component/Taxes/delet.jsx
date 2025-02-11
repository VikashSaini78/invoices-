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
    <div className="container-fluid">
      <div className="Taxes">
        <div className="Taxes_maintext">
          <h6>TAXES</h6>
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
          <h2>Add Tax Details</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label>Taxes Name</label>
                <input
                  type="text"
                  placeholder="Taxes Name"
                  value={taxName}
                  onChange={(e) => setTaxName(e.target.value)}
                />
              </div>

              <div>
                <label>Taxes Rate (%)</label>
                <input
                  type="text"
                  placeholder="Taxes Rate"
                  value={taxRate}
                  onChange={(e) => setTaxRate(e.target.value)}
                />
              </div>
              <div className="submit_button-taxes">
                <button type="submit">{editIndex !== null ? "Update" : "Save"}</button>
              </div>
            </div>
          </form>
        </div>

        {taxes.length > 0 && (
          <div className="text_rare-table">
            <table>
              <thead>
                <tr>
                  <th>Taxes Name</th>
                  <th>Taxes Rate (%)</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {taxes.map((tax, index) => (
                  <tr key={index}>
                    <td>{tax.name}</td>
                    <td>{tax.rate}</td>
                    <td>
                      <i
                        className="fa-solid fa-pen"
                        onClick={() => handleEdit(index)}
                      ></i>
                    </td>
                    <td>
                      <i
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

      {showEditModal && (
        <div className="modal">
          <h6>Edit Taxes</h6>
          <input type="text" value={taxName} onChange={(e) => setTaxName(e.target.value)} />
          <input type="text" value={taxRate} onChange={(e) => setTaxRate(e.target.value)} />
          <button onClick={() => setShowEditModal(false)}>Cancel</button>
          <button onClick={handleSubmit}>Save</button>
        </div>
      )}

      {showDeleteModal && (
        <div className="modal">
          <h6>Confirm Delete</h6>
          <p>Are you sure you want to delete this tax entry?</p>
          <button onClick={() => setShowDeleteModal(false)}>Cancel</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}
    </div>
  );
}

export default Taxes;
