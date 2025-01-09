import { BsThreeDotsVertical } from "react-icons/bs";
import "./Taxes.css";
import { useState } from "react";
import { Link } from "react-router-dom";

function Taxes() {
  const [texticon, settexticon] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Sample data for the table
  const taxes = [
    { name: "Sales Tax", country: "United States", region: "(any)", rate: "10%", status: "Enabled" },
    { name: "Value Added Tax", country: "India", region: "Maharashtra", rate: "18%", status: "Enabled" },
    { name: "Luxury Tax", country: "United States", region: "California", rate: "15%", status: "Enabled" },
    { name: "Luxury Tax", country: "United States", region: "California", rate: "15%", status: "Enabled" },
    { name: "Luxury Tax", country: "United States", region: "California", rate: "15%", status: "Enabled" },
    { name: "Luxury Tax", country: "United States", region: "California", rate: "15%", status: "Enabled" },
    { name: "Luxury Tax", country: "United States", region: "California", rate: "15%", status: "Enabled" },

  ];

  // Filter rows based on search term
  const filteredTaxes = taxes.filter((tax) =>
    tax.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tax.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tax.region.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="container-fluid">
        <div className="Taxes">
          <div className="Taxes_maintext">
            <h6>INVOICE</h6>
            <div>
              <p>Invoice</p>
              <span>
                <i className="fa-solid fa-chevron-right"></i>Invoice
              </span>
            </div>
          </div>
          <div className="button_search-text">
            <button type="button" className="btn btn" data-bs-toggle="modal" data-bs-target="#Addtaxes">
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
              <span onClick={() => settexticon(!texticon)}>
                <BsThreeDotsVertical />
              </span>
            </div>
          </div>

          {texticon && (
            <div className="texts_three-icons">
              <ul>All</ul>
              <ul>Last Week</ul>
              <ul>Last Month</ul>
              <ul>Last Year</ul>
            </div>
          )}
        </div>

        <div className="TExt_table">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>TAX NAME</th>
                <th>COUNTRY</th>
                <th>REGION</th>
                <th>TAX RATE(%)</th>
                <th>STATUS</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredTaxes.length > 0 ? (
                filteredTaxes.map((tax, index) => (
                  <tr key={index}>
                    <td>{tax.name}</td>
                    <td>{tax.country}</td>
                    <td>{tax.region}</td>
                    <td>{tax.rate}</td>
                    <td>
                      <p className={tax.status === "Enabled" ? "status_Enabled-id" : "status_Disabled-id"}>
                        {tax.status}
                      </p>
                    </td>
                    <td>
                      <div className="form-check form-switch">
                        <input className="form-check-input custom-switch" type="checkbox" />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">
                    No results found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Taxes Modal */}
      <div
        className="modal fade"
        id="Addtaxes"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="texts_model-closeicons">
              <h6>Add Payment</h6>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <div className="textes_table-model">
              <label className="form-label">Test Name</label>
              <input type="text" className="form-control" placeholder="Enter Name" />
              <div className="model_selected-option">
                <p>
                  <label htmlFor="inputState" className="form-label">
                    Country
                  </label>
                  <select id="inputState" className="form-select">
                    <option selected>select Country</option>
                    <option>India</option>
                  </select>
                </p>
                <p>
                  <label htmlFor="inputState" className="form-label">
                    Region
                  </label>
                  <select id="inputState" className="form-select">
                    <option selected>Select Region</option>
                    <option>(Any)</option>
                  </select>
                </p>
              </div>

              <label className="form-label">Tax Rate</label>
              <input type="text" className="form-control" placeholder="Enter Tax Rate" />
            </div>

            <div id="model_closebtn-text">
              <button id="btn_1" type="button" className="btn btn" data-bs-dismiss="modal">
                Close
              </button>
              <button id="btn_2" type="button" className="btn btn">
                Add Taxes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Taxes;
