import React, { useState } from 'react'
import "./Invoice.css"
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdOutlineArrowOutward } from "react-icons/md";
import { FaFileAlt } from "react-icons/fa";
import {Link} from "react-router-dom"
// import { MdOutlineCancel } from "react-icons/md";
// import { BsStopwatch } from "react-icons/bs";



function Invoice() {
  const [invoiceicon,setinvoiceicon] = useState('')
  const [searchQuery, setSearchQuery] = useState("");


  const invoices = [
    {
      id: "Lec-2152",
      client: "Donald Risher",
      email: "morbi.quis@protonmail.org",
      date: "20 Sep, 2022",
      billed: "$240.00",
      status: "Paid",
    },
    {
      id: "Lec-2153",
      client: "Jane Doe",
      email: "jane.doe@example.com",
      date: "21 Sep, 2022",
      billed: "$120.00",
      status: "Unpaid",
    },
    {
      id: "Lec-2154",
      client: "John Smith",
      email: "john.smith@example.com",
      date: "19 Sep, 2022",
      billed: "$180.00",
      status: "Unpaid",
    },
    {
      id: "Lec-2155",
      client: "Alice Johnson",
      email: "alice.j@example.com",
      date: "22 Sep, 2022",
      billed: "$300.00",
      status: "Paid",
    },
    {
      id: "Lec-2156",
      client: "Bob Brown",
      email: "bob.brown@example.com",
      date: "18 Sep, 2022",
      billed: "$220.00",
      status: "Cancel",
    },
    {
      id: "Lec-2157",
      client: "Cathy Green",
      email: "cathy.g@example.com",
      date: "17 Sep, 2022",
      billed: "$250.00",
      status: "Paid",
    },
    {
      id: "Lec-2158",
      client: "David White",
      email: "david.w@example.com",
      date: "16 Sep, 2022",
      billed: "$280.00",
      status: "Unpaid",
    },
    {
      id: "Lec-2159",
      client: "Ella Black",
      email: "ella.b@example.com",
      date: "15 Sep, 2022",
      billed: "$400.00",
      status: "Unpaid",
    },
    {
      id: "Lec-2160",
      client: "Frank Lee",
      email: "frank.l@example.com",
      date: "14 Sep, 2022",
      billed: "$350.00",
      status: "Paid",
    },
    {
      id: "Lec-2161",
      client: "Grace Kim",
      email: "grace.k@example.com",
      date: "13 Sep, 2022",
      billed: "$150.00",
      status: "Unpaid",
    },
  ];


  const filteredInvoices = invoices.filter((invoice) =>
    Object.values(invoice)
      .join(" ")
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );


  return (
    <>
    

   
      <div className='container-fluid'>
      <div className='invoice'>
       <div className='invoice_maintext' >
        <h6>INVOICE</h6>

           <div>
            <p>Invoice</p>
            <span><i className="fa-solid fa-chevron-right"></i>Invoice </span>
           </div>
       </div>


       <div className='button_search-br'>
       <button type="button" className="btn btn"><i className="fa-solid fa-plus" ></i>
       <Link className='addinvoice_btn' to={"/addinvoice"}>Add invoice</Link>
        </button>

       <div>
       <input type="search" className="form-control" placeholder='Search for name or designation...'
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
       />
       <span  onClick={()=>{setinvoiceicon(!invoiceicon)}} ><BsThreeDotsVertical/></span>


       

       </div>
       </div>
       {
          invoiceicon && (
            <div className='invoice_three-icons'>
        <ul>Print</ul>
        <ul>Export to Excel</ul>
        </div>
          )
        } 


       <div className='row'>
      <div className='col-md-3'>
      <div className='Invoices_Sent'>
      <h5>$559.25k</h5>
      <div className='Invoices_Sent-arrowicons'>
      <p>INVOICE SENT <span><MdOutlineArrowOutward /> +89.24 %</span></p>
      <i><FaFileAlt /></i>
      </div>
     
        <div className='Invoice_span-btn'>
        <p>2,258</p>
         Invoices sent
         </div>
      </div>

      </div>
      <div className='col-md-3'>
      <div className='Invoices_Sent'>
      <h5>$409.66k</h5>
      <div className='Invoices_paid-arrowicons'>
      <p>INVOICE SENT <span><MdOutlineArrowOutward /> +89.24 %</span></p>
      <i><FaFileAlt /></i>
      </div>
     
        <div className='Invoice_span-paid'>
        <p>2,258</p>
         Invoices sent
         </div>
      </div>
      </div>
      <div className='col-md-3'>
      <div className='Invoices_Unpaid'>
      <h5>$136.98k</h5>
      <div className='Invoices_Unpaid-arrowicons'>
      <p>UNPAID INVOICE  <span><MdOutlineArrowOutward /> +89.24 %</span></p>
      <i><FaFileAlt /></i>
      </div>
        <div className='Invoice_span-unpade'>
        <p>2,258</p>
         Invoices sent
         </div>
      </div>

      </div> 
        <div className='col-md-3'>
        <div className='Invoices_Sent'>
      <h5>$84.2k</h5>
      <div className='Invoices_Sent-arrowicons'>
      <p>CANCELLED INVOICE <span><MdOutlineArrowOutward /> +7.55 %</span></p>
      <i><FaFileAlt /></i>
      </div>
     
        <div className='Invoice_span-btn'>
        <p>2,258</p>
         Invoices sent
         </div>
      </div>
      </div>

      </div>
      </div>
      </div>
    </>
  )
}

export default Invoice
