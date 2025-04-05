import "./Dashboard.css";
import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { AreaChart, Area, CartesianGrid } from "recharts";
function Dashboard() {

  // const Array = [
  //   {
  //     name: "jan",
  //     income: 13,
  //   },
  //   {
  //     name: "feb",
  //     income: 25,
  //   },
  //   {
  //     name: "mar.",
  //     income: 52,
  //   },
  //   {
  //     name: "apr.",
  //     income: 57,
  //   },
  //   {
  //     name: "may",
  //     income: 94,
  //   },
  //   {
  //     name: "jun",
  //     income: 45,
  //   },
  //   {
  //     name: "jul.",
  //     income: 62,
  //   },
  //   {
  //     name: "Aug.",
  //     income: 52,
  //   },
  //   {
  //     name: "Sep.",
  //     income: 12,
  //   },
  //   {
  //     name: "Oct",
  //     income: 56,
  //   },
  //   {
  //     name: "Nov",
  //     income: 13,
  //   },
  //   {
  //     name: "Dec",
  //     income: 65,
  //   },
  // ];

  const data = [
    {
      name: "jan",
      uv: 5,
      pv: 24,
    },
    {
      name: "feb",
      uv: 4,
      pv: 54,
    },
    {
      name: "mar.",
      uv: 25,
      pv: 34,
    },
    {
      name: "Apr.",
      uv: 24,
      pv: 24,
    },
    {
      name: "may",
      uv: 23,
      pv: 54,
    },
    {
      name: "jun",
      uv: 12,
      pv: 13,
    },
    {
      name: "jul.",
      uv: 12,
      pv: 13,
    },
    {
      name: "Aug.",
      uv: 54,
      pv: 12,
    },
    {
      name: "sep.",
      uv: 14,
      pv: 15,
    },
    {
      name: "oct.",
      uv: 12,
      pv: 15,
    },
    {
      name: "Nov.",
      uv: 45,
      pv: 53,
    },
    {
      name: "Dec.",
      uv: 25,
      pv: 12,
    },
  ];

  return (
    <>
      <div className="Dashboard_container">
        <div className="Dashboard_md">
          <div className="Top_header">
            <h5>DASHBORD</h5>
            <div>
              <span>Dashboard</span>
              <i className="fa-solid fa-chevron-right"></i>
              <p>Dashboard</p>
            </div>
          </div>

          {/*  */}

          <div className="container-fluid">
            <div className="row">
              <div className="col-md-5">
                <div className="Professiona_div1">
                  <span>
                    <h5>Professional Invoices Ma...</h5>
                    <p>
                      Quickly understand who your best customers little and
                      motivation to pay thair bills.
                    </p>
                    <button type="button" className="btn btn">
                      Warch Tutorial
                    </button>
                  </span>
                  <img src="./media/bill.png" alt="" />
                </div>
              </div>

              <div className="col-md-7">

              
                <div className="Professiona_div2">
                  <div className="overview_div">
                    <div className="overview_texts">
                      <h6>This Week's Overview</h6>
                      <h5>197</h5>
                      
                      <p>Clients Added</p>
                      <span>
                        <button type="button" className="btn btn">
                          1.15%
                        </button>
                         <p> since last week </p>
                      </span>

                    
                    </div>

                    
                    <div className="overview_number">
                    <pre>gh</pre>
                  
                      <h5>634</h5>
                      <p>Clients Added</p>
                      <span>
                        <button type="button" className="btn btn">
                          1.15%
                        </button>
                       <p> since last week</p>
                      </span>


                     
                   
                    </div>
 
                    <div className="overview_spantag">
                      <div className="overview_spantag-div">
                        <span>Sort by : </span>
                        <p>
                          Current Week<i className="fa-solid fa-angle-down"></i>
                        </p>
                       </div>
                      <h5>512</h5>
                      <p className="Invoice_sent">Invoice Sent</p>
                      <span>
                        <button type="button" className="btn btn">
                          1.15%
                        </button>
                        <p>since last week</p>
                      </span>
                      
                     
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>


          <div className="container-fluid">
            <div className="row">
              <div className="col-md-5">
                <div className="Quick_form">
                  <div className="Quick_text">
                    <h6>Quick Invoice</h6>
                    <p><i className="fa-solid fa-plus"></i></p>
                  </div>
                  <div className="quick_lable">
                    <div className="quick_lable-input">
                      <label className="form-label">Customer Name</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Name"
                      />
                    </div>
                    <div className="quick_lable-input">
                      {" "}
                      <label className="form-label">Customer Email</label>
                      <input
                        type="Email"
                        className="form-control"
                        placeholder="Enter Email"
                      />
                    </div>
                  </div>

                  <div className="quick_textarea">
                    <label for="floatingTextarea2">Customer Address</label>
                    <textarea
                      className="form-control"
                      placeholder="Company Address"
                      id="floatingTextarea2"
                    ></textarea>
                  </div>
                  <div className="Sub_Total1">
                    {" "}
                    <p>Sub Total</p>
                    <p>$699.96</p>
                  </div>
                  <div className="Sub_Total  mt-2 ">
                    {" "}
                    <p>Estimated Tax (12.5%)</p>
                    <p>$44.99</p>
                  </div>
                  <div className="Sub_Total  mt-2 ">
                    {" "}
                    <p>
                      Discount <span>(Invoika15)</span>
                    </p>
                    <p>- $53.99</p>
                  </div>
                  <div className="Sub_Total  mt-2 ">
                    {" "}
                    <p> Shipping Charge</p>
                    <p>$65.00</p>
                  </div>
                  <div className="Sub_Total mt-2 mb-2">
                    {" "}
                    <h6>Total Amount</h6>
                    <h6>$755.96</h6>
                  </div>
                  <div className="Sub_Total-button">
                    <button id="btn2" type="button" className="btn btn">
                      Warch Tutorial
                    </button>
                    <button id="btn1" type="button" className="btn btn">
                      Warch Tutorial
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
             
                <div className="Areachart_payment">
         <div className="Sort_By-text">
    <h6>Payment Overview</h6>
    <div >
      <h6>Sort By :</h6>
      <p>
        Monthly <i className="fa-solid fa-angle-down"></i>
      </p>
    </div>
  </div>

  <div style={{ width: "100%", height: 286, fontSize: "10px" }}>
    <ResponsiveContainer>
      <AreaChart
        data={data}
        margin={{
          top: 10,
          right: 5,
          left: 0,
          bottom: 30, // Increased bottom margin
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="name"
          tick={{ angle: -30, textAnchor: "end" }} // Rotates labels for better visibility
          tickMargin={10} // Adds extra margin for tick labels
        />
        <YAxis width={25} />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="uv"
          stroke="#8884d8"
          fill="#8884d8"
        />
      </AreaChart>
    </ResponsiveContainer>
  </div>


  <div className="Received_Amount">
    <p>Received Amount</p>
    <p>Due Amount</p>
  </div>
  <div className="amount_number">
    <h6>$32,400.00</h6>
    <h6>$45,070.00</h6>
  </div>
</div>


              </div>
              <div className="col-md-3">
                <div className="Recent_Transaction">
                  <div className="Recent_Transactionh6">
                    <h6>Recent Transaction</h6>
                    <p>Recent</p>
                  </div>

                  {/* 1 */}
                  <div className="salary_pay">
                    <i className="fa-brands fa-paypal"></i>
                    <div className="payment_date">
                      {/* <p> */}
                        <b>Salary Paym..</b> <br /> 20 mar, 202..
                    
                    </div>
                    <span>- $62.45</span>
                  </div>
                  {/* 2 */}
                  <div className="Online_Pro">
                    <i className="fa-solid fa-microchip"></i>
                    <div className="payment_date">
                     
                        <b>Online Pro..</b> <br /> 20 Sep, 202..
                    
                    </div>
                    <span>- $62.45</span>
                  </div>

                  <p className="Yesterday_text">Yesterday</p>

                  {/* 3 */}
                  <div className="Maintenanc">
                    <i className="fa-solid fa-camera-retro"></i>
                    <div className="payment_date">
                      
                        <b>Maintenanc..</b> <br /> 25 oct. 202..
                    
                    </div>
                    <span>- $62.45</span>
                  </div>

                  {/* 4 */}

                  <div className="Bus_Bookin">
                    <i className="fa-solid fa-bus"></i>
                    <div className="payment_date">
                      
                        <b>Bus Bookin..</b> <br /> 21 Bov, 202..
                     
                    </div>
                    <span>- $62.45</span>
                  </div>

                  {/* 5 */}

                  <div className="Flight_Book">
                    <i className="fa-brands fa-telegram"></i>
                    <div className="payment_date">
                     
                        <b>Flight Book...</b> <br /> 20 Sep, 202..
                      
                    </div>
                    <span>- $62.45</span>
                  </div>

                  {/* 6 */}

                  <div className="Office_Rent">
                    <i className="fa-solid fa-house-user"></i>
                    <div className="payment_date">
                      
                        <b>Office Rent..</b> <br /> 20 Sep, 202..
                     
                    </div>
                    <span>- $62.45</span>
                  </div>
                </div>
              </div>

            
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
