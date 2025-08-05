import { useState, useEffect, useRef } from "react";
import "./Navbar.css";
import "../Admin_panal/Admin_panal.css";
import { MdKeyboardArrowRight } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import Service from "../../Service";
import { Link } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";
import { GrFormDown } from "react-icons/gr";

function Navbar() {
  const [value, setvalue] = useState("");
  const [admin, setadmin] = useState(false);
  const [liitem, setliitem] = useState(false);
  const [list, setlist] = useState("");
  const [report, setreport] = useState("");
  const [Transaction, settransaction] = useState("");
  const [Authentication, setAuthentication] = useState("");
  const [Bootstrap, setbootstrap] = useState("");
  const [Advance, setadvance] = useState("");
  const [table, settable] = useState("");
  const [Apexcharts, setApexcharts] = useState("");
  const [Notifications, setNotifications] = useState("");
  const [isDown, setIsDown] = useState(false);
  const [auth, setauth] = useState(false);
  const [mst, setsmt] = useState(false);
  const [ent, setent] = useState(false);
  const [rep, setrep] = useState(false);
  const [uti, setuti] = useState(false);
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");

  const notificationRef = useRef(null);
  const profileRef = useRef(null);
  const sidebarRef = useRef(null);

  const handleClick = () => {
    setIsDown(!isDown);
  };
  const autoClick = () => {
    setauth(!auth);
  };
  const mstclick = () => {
    setsmt(!mst);
  };
  const entclick = () => {
    setent(!ent);
  };
  const repclick = () => {
    setrep(!rep);
  };
  const uticlick = () => {
    setuti(!uti);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close notifications

      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setNotifications(false);
      }

      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setvalue(false);
      }

      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setNotifications(false);
      }

      // Close profile
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setvalue(false);
      }

      // Close sidebar if clicked outside AND on mobile screen
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        window.innerWidth <= 750 &&
        !event.target.closest(".admin_close-btn") // allow clicking the close icon
      ) {
        setadmin(true); // This means collapsed sidebar
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (window.innerWidth <= 750) {
      setadmin(true);
    }
  }, []);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    const storedUserId = localStorage.getItem("userId");

    if (storedUsername) setUsername(storedUsername);
    if (storedUserId) setUserId(storedUserId);
  }, []);

  return (
    <>
      {/* Dashboard */}

      <div className="nav_dashbord">
        <div className="dashbord">
          <div
            ref={sidebarRef}
            className={`sidebar ${admin ? "collapsed" : ""} bg-white`}
          >
            <div
              className={`${
                admin
                  ? " w-7 m-auto h-2 flex justify-center items-center"
                  : "w-auto"
              } flex justify-center items-center mt-2`}
            >
              <Link
                to={"/home"}
                onClick={() => {
                  if (window.innerWidth <= 750) {
                    setadmin(!admin);
                  }
                }}
              >
                <img
                  className={`${admin ? "next-logo" : "admin_panal-logo"}`}
                  src={
                    admin ? "./media/logo.webp" : "./media/response_info.jpg"
                  }
                  alt={admin ? "Next Logo" : "Admin Panel Logo"}
                />
              </Link>

              <div
                className="admin_close-btn"
                onClick={() => {
                  setadmin(!admin);
                }}
              >
                <IoMdClose />
              </div>
            </div>

            {/* manu */}
            <div className="dashbord_text-div">
              <div className="paragraph">
                <p className={`${admin ? "hidden" : "block"}`}>e Tour</p>
              </div>
              <Link to={"/home"}>
                <div className={`das_menu ${admin ? "mt-2" : ""}`}>
                  <i
                    className={`fa-solid fa-house ${admin ? "m-auto" : ""}`}
                  ></i>
                  <p
                    className={`${admin ? "hidden" : "block"}`}
                    onClick={() => {
                      if (window.innerWidth <= 750) {
                        setadmin(!admin);
                      }
                    }}
                  >
                    Dashboard
                  </p>
                </div>
              </Link>
            </div>

            <div onClick={handleClick}>
              <div
                className="das_management"
                onClick={() => {
                  setliitem(!liitem);
                }}
              >
                <i
                  className={`fa-solid fa-file-invoice ${
                    admin ? "m-auto mt-2" : ""
                  }`}
                ></i>
                <p className={`${admin ? "hidden" : "block"}`}>
                  Invoices Manag..
                </p>
                <pre
                  onClick={handleClick}
                  className={`${admin ? "hidden" : "block"}`}
                >
                  {isDown ? <GrFormDown /> : <MdKeyboardArrowRight />}
                </pre>
              </div>
            </div>

            {/* Main Das Management */}

            {liitem && (
              <div className={`${admin ? "hidden" : "block"}`}>
                <div className="management_list-items">
                  <div className={`${admin ? "hidden" : "block"}`}>
                    <Link to={"/invoice"}>
                      <li
                        onClick={() => {
                          if (window.innerWidth <= 750) {
                            setadmin(!admin);
                          }
                        }}
                      >
                        Invoice
                      </li>

                      {/* <li>Invoice</li> */}
                    </Link>
                    <Link to={"/addinvoice"}>
                      <li
                        onClick={() => {
                          if (window.innerWidth <= 750) {
                            setadmin(!admin);
                          }
                        }}
                      >
                        Add Invoice
                      </li>
                    </Link>
                    <Link to={"/invoicedetails"}>
                      <li
                        onClick={() => {
                          if (window.innerWidth <= 750) {
                            setadmin(!admin);
                          }
                        }}
                      >
                        Invoice Details
                      </li>
                    </Link>

                    <Link to={"/payment"}>
                      <li
                        onClick={() => {
                          if (window.innerWidth <= 750) {
                            setadmin(!admin);
                          }
                        }}
                      >
                        Payments
                      </li>
                    </Link>

                    <li
                      onClick={() => {
                        setlist(!list);
                      }}
                    >
                      Products <i className="fa-solid fa-angle-down"></i>
                    </li>

                    {list && (
                      <>
                        <div className="drop_product-list">
                          <Link to={"/product"}>
                            <li>Product List</li>
                          </Link>
                          <li>Add Product</li>
                        </div>
                      </>
                    )}

                    <li
                      onClick={() => {
                        setreport(!report);
                      }}
                    >
                      Report <i className="fa-solid fa-angle-down"></i>
                    </li>

                    {report && (
                      <>
                        <div className="drop_product-list">
                          <li> Payment Summary</li>
                          <li>Sale Report</li>
                          <li>Expenses Report</li>
                        </div>
                      </>
                    )}

                    <Link to={"/user"}>
                      <li>Users</li>
                    </Link>

                    <li
                      onClick={() => {
                        settransaction(!Transaction);
                      }}
                    >
                      Transaction <i className="fa-solid fa-angle-down"></i>
                    </li>

                    {Transaction && (
                      <>
                        <div className="drop_product-list">
                          <li>Transaction List</li>
                          <li>New Transaction</li>
                        </div>
                      </>
                    )}
                  </div>
                </div>
                )
              </div>
            )}

            {/* Authentication  */}

            <div onClick={autoClick}>
              <div
                className="das_Authentication"
                onClick={() => {
                  setAuthentication(!Authentication);
                }}
              >
                <i
                  className={`fa-solid fa-gear ${admin ? "m-auto mt-2" : ""}`}
                ></i>
                <p className={`${admin ? "hidden" : "block"}`}>
                  Authentication
                </p>
                <pre className={`${admin ? "hidden" : "block"}`}>
                  {!auth ? <MdKeyboardArrowRight /> : <GrFormDown />}
                </pre>
              </div>
            </div>

            {Authentication && (
              <div className={`${admin ? "hidden" : "block"}`}>
                <div className="management_list-items">
                  <Link to={"/"}>
                    <li>Sign In</li>
                  </Link>
                  <Link to={"/signup"}>
                    <li>Sign Up</li>
                  </Link>

                  <Link to={"/"}>
                    <li>Lock Screen</li>
                  </Link>
                </div>
              </div>
            )}

            {/* masterdata */}

            <div onClick={mstclick}>
              <div
                className="comp_bootstap"
                onClick={() => {
                  setbootstrap(!Bootstrap);
                }}
              >
                <i
                  className={`fa-solid fa-pen-nib ${admin ? "m-auto" : ""}`}
                ></i>
                <p className={`${admin ? "hidden" : "block"}`}> Master </p>
                <pre className={`${admin ? "hidden" : "block"}`}>
                  {!mst ? <MdKeyboardArrowRight /> : <GrFormDown />}
                </pre>
              </div>
            </div>

            {Bootstrap && (
              <>
                <div className={`${admin ? "hidden" : "block"}`}>
                  <div className="bootstrap_list-item">
                    <Link to={"/selectdata"}>
                      <li
                        onClick={() => {
                          if (window.innerWidth <= 750) {
                            setadmin(!admin);
                          }
                        }}
                      >
                        Master data
                      </li>
                    </Link>

                    <Link to={"/selectcompny"}>
                      <li
                        onClick={() => {
                          if (window.innerWidth <= 750) {
                            setadmin(!admin);
                          }
                        }}
                      >
                        Company
                      </li>
                    </Link>

                    <Link to={"/users"}>
                      <li
                        onClick={() => {
                          if (window.innerWidth <= 750) {
                            setadmin(!admin);
                          }
                        }}
                      >
                        Users
                      </li>
                    </Link>

                    <Link to={"/taxes"}>
                      <li
                        onClick={() => {
                          if (window.innerWidth <= 750) {
                            setadmin(!admin);
                          }
                        }}
                      >
                        Taxes
                      </li>
                    </Link>
                    <Link to={"/showservice"}>
                      <li
                        onClick={() => {
                          if (window.innerWidth <= 750) {
                            setadmin(!admin);
                          }
                        }}
                      >
                        ServiceMast
                      </li>
                    </Link>
                    <Link to={"/showvehicletype"}>
                      <li
                        onClick={() => {
                          if (window.innerWidth <= 750) {
                            setadmin(!admin);
                          }
                        }}
                      >
                        Vehicle Type
                      </li>
                    </Link>
                    <Link to={"/showfares"}>
                      <li
                        onClick={() => {
                          if (window.innerWidth <= 750) {
                            setadmin(!admin);
                          }
                        }}
                      >
                        Fares
                      </li>
                    </Link>

                    <Link to={"/payment"}>
                      <li> Ledger</li>
                    </Link>

                    {/* <li></li> */}
                    <li>Vehicles</li>
                    {/* <li></li> */}
                    <li>Group Master</li>
                    <li>Users</li>
                  </div>
                </div>
              </>
            )}

            {/* Entries */}

            <div onClick={entclick}>
              <div
                className="das_advance"
                onClick={() => {
                  setadvance(!Advance);
                }}
              >
                <i
                  className={`fa-solid fa-book ${admin ? "m-auto mt-2" : ""}`}
                ></i>
                <p className={`${admin ? "hidden" : "block"}`}>Entries</p>
                <pre className={`${admin ? "hidden" : "block"}`}>
                  {!ent ? <MdKeyboardArrowRight /> : <GrFormDown />}
                </pre>
              </div>
            </div>

            {Advance && (
              <div className={`${admin ? "hidden" : "block"}`}>
                <div className="advance_list-item">
                  <li>Bills / Invoice</li>
                  <li>Voucher Entry</li>
                </div>
              </div>
            )}

            {/* Reports  */}

            <div onClick={repclick}>
              <div
                className="das_tables"
                onClick={() => {
                  settable(!table);
                }}
              >
                <i
                  className={`fa-regular fa-file ${admin ? "m-auto mt-2" : ""}`}
                ></i>
                <p className={`${admin ? "hidden" : "block"}`}>Reports </p>
                <pre className={`${admin ? "hidden" : "block"}`}>
                  {!rep ? <MdKeyboardArrowRight /> : <GrFormDown />}
                </pre>
              </div>
            </div>

            {table && (
              <div className={`${admin ? "hidden" : "block"}`}>
                <div className="tables_list-items">
                  <li>Ladger</li>
                  <li>Gst Statement</li>
                  <li>Bill Register</li>
                  <li>Trial Balance</li>
                  <li>Profit and Looss</li>
                  <li>Cash Book</li>
                  <li>Bank Book</li>
                  <li>Day Book</li>
                  <li>Journal Register</li>
                </div>
              </div>
            )}

            {/* Utility */}

            <div onClick={uticlick}>
              <div
                onClick={() => {
                  setApexcharts(!Apexcharts);
                }}
                className="das_Apexcharts"
              >
                <i
                  className={`fa-regular fa-window-restore ${
                    admin ? "m-auto mt-2" : ""
                  }`}
                ></i>
                <p className={`${admin ? "hidden" : "block"}`}>Utility</p>
                <pre className={`${admin ? "hidden" : "block"}`}>
                  {!uti ? <MdKeyboardArrowRight /> : <GrFormDown />}
                </pre>
              </div>
            </div>

            {Apexcharts && (
              <div className={`${admin ? "hidden" : "block"}`}>
                <div className="Apexcharts_list-item">
                  <li>Backup</li>
                  <li>Restore</li>
                  <li>Configuration</li>
                </div>
              </div>
            )}

            {/* Icons  */}

            <div className="das_logout">
              <i className={`${admin ? "m-auto mt-2" : ""}`}>
                <IoIosLogOut />
              </i>
              <Link to={"/"}>
                <p className={`${admin ? "hidden" : "block"} cursor-pointer`}>
                  Log Out
                </p>
              </Link>
            </div>
          </div>
        </div>

        {/* navbar */}

        <div className={`main-content ${admin ? "expanded" : ""}`}>
          <div className="nav_sub-container">
            <div className="container_div">
              <div className="navbar">
                <div className="navbar_icon">
                  <i
                    className="fa-solid fa-bars"
                    onClick={() => {
                      setadmin(!admin);
                    }}
                  ></i>

                  <div className="nav_searchbar">
                    <input type="search" placeholder="Search" />
                  </div>
                </div>
                <i id="nav_icons" className="fa-solid fa-magnifying-glass"></i>

                <div className="nav_bellfrofile">
                  <i
                    className="fa-regular fa-bell"
                    onClick={() => {
                      setNotifications(!Notifications);
                    }}
                  >
                    <span className="translate-middle badge rounded-pill bg-danger">
                      4
                    </span>
                  </i>

                  <ul
                    className="ul_calvind-text"
                    onClick={() => {
                      setvalue(!value);
                    }}
                  >
                    <img src="./media/profile_image.jpg" alt="" />
                    <h1 className="calvind_box">
                      {username && <strong>{username}</strong>}

                      <i className="fa-solid fa-chevron-down"></i>
                    </h1>
                  </ul>
                </div>

                {/* Notifications */}

                {Notifications && (
                  <div
                    ref={notificationRef}
                    className="nav_notifications-showbr"
                  >
                    <div className="nav_not-4">
                      <h6> Notifications</h6>
                      <span>4 New</span>
                    </div>
                    <div className="notfication_member-show">
                      <div className="notfication_member-show-1">
                        <img src="./media/ntotifaction.jpg" alt="not" />

                        <div className="noti_text-text">
                          <h6>Angela Berner</h6>
                          <p>
                            Answered to your comment on the cash flow forecast's
                            graph
                            <pre>48 MIN AGO</pre>
                          </p>
                        </div>
                        <input className="form-check-input" type="checkbox" />
                      </div>
                    </div>

                    <div className="notfication_member-show">
                      <div className="notfication_member-show-1">
                        <img src="./media/ntotifaction.jpg" alt="not" />

                        <div className="noti_text-text">
                          <h6>Angela Berner</h6>
                          <p>
                            Answered to your comment on the cash flow forecast's
                            graph
                            <pre>48 MIN AGO</pre>
                          </p>
                        </div>
                        <input className="form-check-input" type="checkbox" />
                      </div>
                    </div>
                    <div className="notfication_member-show">
                      <div className="notfication_member-show-1">
                        <img src="./media/ntotifaction.jpg" alt="not" />

                        <div className="noti_text-text">
                          <h6>Angela Berner</h6>
                          <p>
                            Answered to your comment on the cash flow forecast's
                            graph
                            <pre>48 MIN AGO</pre>
                          </p>
                        </div>
                        <input className="form-check-input" type="checkbox" />
                      </div>
                    </div>

                    <div className="notfication_member-show">
                      <div className="notfication_member-show-1">
                        <img src="./media/ntotifaction.jpg" alt="not" />

                        <div className="noti_text-text">
                          <h6>Angela Berner</h6>
                          <p>
                            Answered to your comment on the cash flow forecast's
                            graph
                            <pre>48 MIN AGO</pre>
                          </p>
                        </div>
                        <input className="form-check-input" type="checkbox" />
                      </div>
                    </div>

                    <div className="notfication_member-show">
                      <div className="notfication_member-show-1">
                        <img src="./media/ntotifaction.jpg" alt="not" />

                        <div className="noti_text-text">
                          <h6>Angela Berner</h6>
                          <p>
                            Answered to your comment on the cash flow forecast's
                            graph
                            <pre>48 MIN AGO</pre>
                          </p>
                        </div>
                        <input className="form-check-input" type="checkbox" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="nav-profile_div" ref={profileRef}>
              {value && (
                <div className="nav_profile-text">
                  <li className="mt-2">
                    <i className="fa-regular fa-user"></i> Profile
                  </li>
                  <li className="mt-2">
                    <i className="fa-solid fa-wallet"></i> My Wallet
                  </li>
                  <li className="mt-2">
                    <i className="fa-solid fa-gear"></i> Setting
                  </li>
                  <li className="mt-2">
                    <i className="fa-solid fa-lock"></i> Look Screen
                  </li>
                  <hr />
                  <Link to={"/"}>
                    <div className="nav_log-out">
                      <i className="fa-solid fa-power-off"></i> Log out
                    </div>
                  </Link>
                </div>
              )}
            </div>

            <>
              <Service />

              <footer>
                <div className="footer_div">
                  <p>2025 © &nbsp; &nbsp; e Tour.</p>
                  <h6 className={admin ? "w-[25%]" : " w-[36%]"}>
                    Design & Develop by Response Infoway
                  </h6>
                </div>
              </footer>
            </>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
