import "./Productlist.css";
import { BsThreeDotsVertical } from "react-icons/bs";
import Rating from "@mui/material/Rating";
function ProductList() {
  return (
    <>
      <div className="container-fluid">
        <div className="product_list">
          <div className="product_maintext">
            <h6>PRODUCT LIST</h6>

            <div>
              <p>product</p>
              <span>
                <i class="fa-solid fa-chevron-right"></i>Product List
              </span>
            </div>
          </div>

          <div className="button_search-product">
            <button type="button" class="btn btn">
              <i class="fa-solid fa-plus"></i> Add product
            </button>

            <div>
              <input
                type="search"
                class="form-control"
                placeholder="Search for Result"
              />
              <span>
                <BsThreeDotsVertical />
              </span>
            </div>
          </div>
        </div>

        <div className="product_list-table">
          <table class="table table-striped table-sm">
            <thead>
              <tr>
                <th>
                  <input class="form-check-input" type="checkbox" />
                </th>
                <th>PRODUCT NAME</th>
                <th>CATEGORY</th> 
                <th>IN STOCK</th>
                <th>RATE</th>
                <th>PRICE</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <input class="form-check-input" type="checkbox" />
                </td>
                <td>
                  <div class="d-flex align-items-center">
                    <img src="./media/tshart.png" alt="tshart Image" />
                    <h6 className="mb-0">World's most expensive t-shirt</h6>
                  </div>
                </td>
                <td>Fashion</td>
                <td> 65 / 125</td>
                <td>
                  <i class="fa-regular fa-star"></i>
                  3.5
                </td>
                <td>$742.00</td>
                <td>
                  <p class="action_product">
                    <i class="fa-solid fa-ellipsis"></i>
                  </p>
                </td>
              </tr>

              <tr>
                <td>
                  <input class="form-check-input" type="checkbox" />
                </td>
                <td>
                  <div class="d-flex align-items-center">
                    <img src="./media/tshart.png" alt="tshart Image" />
                    <h6 className="mb-0">World's most expensive t-shirt</h6>
                  </div>
                </td>
                <td>Fashion</td>
                <td>65 / 125</td>
                <td>3.5</td>
                <td>$742.00</td>
                <td>
                  <p class="action_product">
                    <i class="fa-solid fa-ellipsis"></i>
                  </p>
                </td>
              </tr>

              <tr>
                <td>
                  <input class="form-check-input" type="checkbox" />
                </td>
                <td>
                  <div class="d-flex align-items-center">
                    <img src="./media/tshart.png" alt="tshart Image" />
                    <h6 className="mb-0">World's most expensive t-shirt</h6>
                  </div>
                </td>
                <td>Fashion</td>
                <td>65 / 125</td>
                <td>3.5</td>
                <td>$742.00</td>
                <td>
                  <p class="action_product">
                    <i class="fa-solid fa-ellipsis"></i>
                  </p>
                </td>
              </tr>

              <tr>
                <td>
                  <input class="form-check-input" type="checkbox" />
                </td>
                <td>
                  <div class="d-flex align-items-center">
                    <img src="./media/tshart.png" alt="tshart Image" />
                    <h6 className="mb-0">World's most expensive t-shirt</h6>
                  </div>
                </td>
                <td>Fashion</td>
                <td>65 / 125</td>
                <td>3.5</td>
                <td>$742.00</td>
                <td>
                  <p class="action_product">
                    <i class="fa-solid fa-ellipsis"></i>
                  </p>
                </td>
              </tr>

              <tr>
                <td>
                  <input class="form-check-input" type="checkbox" />
                </td>
                <td>
                  <div class="d-flex align-items-center">
                    <img src="./media/tshart.png" alt="tshart Image" />
                    <h6 className="mb-0">World's most expensive t-shirt</h6>
                  </div>
                </td>
                <td>Fashion</td>
                <td>65 / 125</td>
                <td>3.5</td>
                <td>$742.00</td>
                <td>
                  <p class="action_product">
                    <i class="fa-solid fa-ellipsis"></i>
                  </p>
                </td>
              </tr>

              <tr>
                <td>
                  <input class="form-check-input" type="checkbox" />
                </td>
                <td>
                  <div class="d-flex align-items-center">
                    <img src="./media/tshart.png" alt="tshart Image" />
                    <h6 className="mb-0">World's most expensive t-shirt</h6>
                  </div>
                </td>
                <td>Fashion</td>
                <td>65 / 125</td>
                <td>3.5</td>
                <td>$742.00</td>
                <td>
                  <p class="action_product">
                    <i class="fa-solid fa-ellipsis"></i>
                  </p>
                </td>
              </tr>

              <tr>
                <td>
                  <input class="form-check-input" type="checkbox" />
                </td>
                <td>
                  <div class="d-flex align-items-center">
                    <img src="./media/tshart.png" alt="tshart Image" />
                    <h6 className="mb-0">World's most expensive t-shirt</h6>
                  </div>
                </td>
                <td>Fashion</td>
                <td>65 / 125</td>
                <td>3.5</td>
                <td>$742.00</td>
                <td>
                  <p class="action_product">
                    <i class="fa-solid fa-ellipsis"></i>
                  </p>
                </td>
              </tr>
            </tbody>
          </table>

          <div className="pagination">
            <div className="Showing_results">
              <p>Showing</p> <h6>1 </h6> <h6>5</h6> <h6>10</h6>{" "}
              <pre>results</pre>
            </div>
            <div className="previous_next">
              <pre className="Previous">Previous</pre>{" "}
              <pre className="previous_next-fix">1</pre> <p>2</p> <p>3</p>{" "}
              <pre className="Next">Next</pre>{" "}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductList;
