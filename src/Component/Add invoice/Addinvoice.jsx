import React, { useState } from 'react'
import "./Addinvoice.css"
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import { IoMdPrint } from "react-icons/io";
import { FaCloudDownloadAlt } from "react-icons/fa";
import { IoIosSend } from "react-icons/io";


function Addinvoice() {
  const [count,setcount] = useState(0)

  const decrement=()=>{
    setcount(count+1)
  }
  const increment=()=>{
    setcount(count-1)
    }
  return (
    <>
     <div className='Add-invoice_container'>

     
      <div className="Top_header-addinvoice">
            <h5>NEW INVOICE</h5>
            <div>
              <span>Invoice</span>
              <i class="fa-solid fa-chevron-right"></i>
              <p>New Invoice</p>
            </div>
          </div>


          <div className='new-invoice_div'>
          <div className='container-fluid'>
          <div className="row">
            <div className="col-md-6">
            <div className='newinvoice_input-div'>
            <label  class="form-label">Invoice No</label>
              <p>#VL42048121</p>

              <label  class="form-label">Date</label>
              <p> Date-time</p>

              <label  class="form-label">Total Amount</label>
              <select class="form-select" >
              <option> Select Payment Status</option>
              <option value="1">Paid</option>
              <option value="2">Refund</option>
              <option value="3">Unpaid</option>
               </select>
              






              <label  class="form-label">Total Amount</label>
              <p>$0.00</p>
            </div>
            </div>

            <div className="col-md-6">
              <div className='address_container'>
              <div className='newinvoice_address-div'>
           <div className='newinvoice_address-logo'>
           <img src='./media/response infoway_logo.jpg' alt=''/>
           </div>
           
           <div class="mb-2">
           <label  class="form-label">Address</label>
           <textarea class="form-control" placeholder='Compney Address'  rows="3"></textarea>
           </div>


           <input class="form-control" type="text" placeholder="Enter Postal Code" />
           <input class="form-control" type="text" placeholder="Email Address"/>
           <input class="form-control" type="text" placeholder="Website" />
           <input class="form-control no-spinner" type="number" placeholder="Contact No" />

           
           </div>
              </div>
            </div>

            
          </div>
          <hr/>




          {/* Billing Address */}
       <div className='Billing_shipping-div'>
           <div className='Billing_Address-div'>
           
           <h3>Billing Address</h3>
           <input className="form-control" type="text" placeholder="Full Name"/>
           <div className="mb-2 mt-2">
           <textarea className="form-control" placeholder='Address'  rows="3"></textarea>
           </div>
           <input className="form-control" type="text" placeholder="Enter Postal Code" />
           <input className="form-control no-spinner" type="number" placeholder="(123)456-7890" />
           <input className="form-control no-spinner" type="number" placeholder="Tax Number" />
           
        {/* <div className='check_box-div'> <input class="form-check-input" type="checkbox" /> 
        <p>Will your Billing and Shipping address same?</p></div> */}
           </div>
    
            



            {/* Shipping Address*/}
            <div className='Billing_Address-div'>
           <h3>Shipping Address</h3>
           <input className="form-control" type="text" placeholder="Full Name"/>
           <div className="mb-2 mt-2">
           <textarea className="form-control" placeholder='Compney Address'  rows="3"></textarea>
           </div>
           <input className="form-control" type="text" placeholder="Enter Postal Code" />
           <input className="form-control no-spinner" type="number" placeholder="(123)456-7890" />
           <input className="form-control no-spinner" type="number" placeholder="Tax Number" />

           
           </div>
       </div>
          </div>


      <div className='newinvoice_table'>

          <table className="table"> 
            <thead>
              <tr className='tr_table'>
                <th>#</th>
                <th>COUNTRY</th>
                <th>REGION</th>
                <th>TAX RATE(%)</th>
                <th>STATUS</th>
              </tr>
            </thead>
            <tbody>
            <th>1</th>
      <td>
        <div className='iinput-table_newvoice'>
        <input className="form-control" type="text" placeholder="Full Name"/>
           <textarea className="form-control" placeholder='Compney Address'  rows="3"></textarea>
        </div>
      </td>
      <td><div className='reate_s'>0.00</div></td>
      <td>
        <div className='counter_div'>
           <p onClick={increment}><FaMinus/></p> {count}<p onClick={decrement}><FaPlus/></p>
        </div>
      </td>
      <td>
        <div className='Amount_div'>
           <p>£0.00</p>
           <button type="button" class="btn btn">Delete</button>
        </div>
      </td>
    
              
            </tbody>
         
          </table>
      </div>

      <div className='Add-item_button'>
      <button type="button" class="btn btn">+ Add Item</button>
      </div>


           <div className='hr'><hr/></div>
           <div className='text_Charges-container'>
            <div className='space_div'>

            </div>
         
                <div className='text_Charges-lg'>
                <div className='text_Charges'>
               <h6>Sub Total</h6>
               <p>$0.00</p>
               
            </div>
            <div className='text_Charges'>
               <h6>Estimated Tax (12.5%)</h6>
               <p>$0.00</p>
               
            </div>

            <div className='text_Charges'>
               <h6>Discount (Invoika15)</h6>
               <p>$0.00</p>
               
            </div>

            <div className='text_Charges'>
               <h6>Shipping Charge</h6>
               <p>$0.00</p>
               
            </div>
            <div className='hr_total'><hr/></div>

            <div className='text_Charges'>
               <h6>Total Amount</h6>
               <p>$0.00</p>
               
            </div>
                </div>
           </div>
                
                <div className='Payment-Details_container'>
                <div className='payment-method_div'>
                <h6>PAYMENT  DETAILS</h6>

              <select class="form-select" >
              <option>Payment method</option>
              <option value="1">Credit Card</option>
              <option value="2">Master Card</option>
              <option value="3">Paypal</option>
              <option value="3">Visa</option>
               </select>
               <input className="form-control" type="text" placeholder="Card Holder Name"/>
               <input className="form-control" type="text" placeholder="xxxx xxxx xxxx xxxx"/>
               <input className="form-control" type="text" placeholder="$0.00"/>
                </div>
                <div className='white_space-payment'>

              </div>

                </div>

                <div className='notes'>
                <h6>NOTES</h6>
                <p>All accounts are to be paid within 7 days from receipt of invoice. To be paid by cheque or credit card or direct payment online. If account is not paid within 7 days the credits details supplied as confirmation of work undertaken will be charged the agreed quoted fee noted above.</p>
                </div>

                <div className='buttons_div'>
                
                <button id='Sav_button' type="button" class="btn btn"><i><IoMdPrint/></i>Save</button>
                <button id='downlod_btn' type="button" class="btn btn"><i><FaCloudDownloadAlt/></i>Downlod Invoice</button>
                <button id='sen_invoice' type="button" class="btn btn"><IoIosSend/>Send Invoice</button>
                </div>
        
          </div>
          </div>
    </>
  )
}

export default Addinvoice
