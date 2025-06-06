import { BsThreeDotsVertical } from "react-icons/bs";
import "./User.css";
import { AiOutlineEye } from "react-icons/ai";
import { MdOutlineModeEdit } from "react-icons/md";
import { FaFileDownload } from "react-icons/fa";
// import { Link } from "react-router-dom";
function User() {
  return (
    <>
      <div className="User">
        <div className="user_list">
          <h>User</h>
          {/* <Link to={"/taxe"}>user</Link> */}

          <div>
            <p>product</p>
            <span>
              <i className="fa-solid fa-chevron-right"></i>Product List
            </span>
          </div>
        </div>

        <div className="button_search-user">
          <button type="button" className="btn btn">
            <i className="fa-solid fa-plus"></i> Add New
          </button>

          <div>
            <input
              type="search"
              className="form-control"
              placeholder="Search for Result"
            />
            <span>
              <BsThreeDotsVertical />
            </span>
          </div>
        </div>

        <div className="user_table">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>MEMBER NAME</th>
                <th>EMAIL</th>
                <th>MOBILE</th>
                <th>REGISTERED ON</th>
                <th>STATUS</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <h6>
                    <img src="./media/avatar-2.jpg" alt="" /> Brody Holman
                  </h6>
                </td>

                <td>morbi.quis@protonmail.org</td>
                <td>309-300-9739</td>
                <td>12 Arl, 2022</td>
                <td>
                  <p className="status_failed-id">Failed</p>
                </td>
                <td>
                  <div className="use_table-action">
                    <p className="action_eye">
                      <AiOutlineEye />
                    </p>
                    <p className="action_edit">
                      <MdOutlineModeEdit />
                    </p>
                    <p className="action_file">
                      <FaFileDownload />
                    </p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default User;
