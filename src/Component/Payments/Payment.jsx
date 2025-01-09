import { BsThreeDotsVertical } from "react-icons/bs";
import "./Payment.css"
import { useState } from "react";
function Payment() {
  const [paymenticon,setpaymenticon] = useState("")
    return ( 
        <>
            <div className="container-fluid">
            <div className="Payment_div">
          <div className='payment_maintext' >
            <h6>Payments</h6>

           <div>
            <p>Payments</p>
            <span><i class="fa-solid fa-chevron-right"></i>Payments
          </span>
           </div>
       </div>
       <div className='button_search-payment'>
       <button type="button" class="btn btn"><i class="fa-solid fa-plus" ></i> Add invoice</button>

       <div>
       <input type="search" class="form-control" placeholder='Search for name or designation...'/>
       <span onClick={()=>{setpaymenticon(!paymenticon)}}>
       <BsThreeDotsVertical />
       </span>
       </div>
       </div>
       
      {
        paymenticon && (
        
          <div className='payment_three-icons'>
        <ul>All</ul>
        <ul>Last Week</ul>
        <ul>Last Month</ul>
        <ul>Last Year</ul>
        
        </div>
        )
      }
            </div>

    
             <div className="All_payment">
             <div className="payment_id">
                  <div className="payment_text">
               <h6 className="payment_text-all"> All</h6> <h6>Paid</h6> <h6>Pending</h6>
                  </div>
                  <table class="table table-hover">
                
                    <thead>
                    
                      <tr>
                    
                        <th>MEMBER</th>
                        <th>DATE</th>
                        <th>PAYMENT DETALLS</th>
                        <th>PAYMENT TYPE</th>
                        <th>AMOUNT</th>
                        <th>STATUS</th>
                        <th>ACTION</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr >
                        
                        <td>
                          <h6>Donald Risher</h6>
                        </td>
                        
                        <td>20 Sep, 2022</td>
                        <td>Maintenance</td>
                        <td>Google Pay</td>
                        <td>$1200.00</td>
                        <td >
                        <p class="status_paid-id">Paid </p>
                        </td>
                        <td>
                          <p class="action_td-id"><i class="fa-solid fa-ellipsis"></i></p>
                        </td>
                      </tr>

                      <tr >
                        
                        <td>
                          <h6>Donald Risher</h6>
                        </td>
                        
                        <td>20 Sep, 2022</td>
                        <td>Maintenance</td>
                        <td>Google Pay</td>
                        <td>$1200.00</td>
                        <td >
                        <p class="status_failed-id">Failed</p>
                        </td>
                        <td>
                          <p class="action_td-id"><i class="fa-solid fa-ellipsis"></i></p>
                        </td>
                      </tr>
                      <tr >
                        
                        <td>
                          <h6>Donald Risher</h6>
                        </td>
                        
                        <td>20 Sep, 2022</td>
                        <td>Maintenance</td>
                        <td>Google Pay</td>
                        <td>$1200.00</td>
                        <td >
                        <p class="status_pending-id">Pending</p>
                        </td>
                        <td>
                          <p class="action_td-id"><i class="fa-solid fa-ellipsis"></i></p>
                        </td>
                      </tr>
                      <tr >
                        
                        <td>
                          <h6>Donald Risher</h6>
                        </td>
                        
                        <td>20 Sep, 2022</td>
                        <td>Maintenance</td>
                        <td>Google Pay</td>
                        <td>$1200.00</td>
                        <td >
                        <p class="status_paid-id">Paid </p>
                        </td>
                        <td>
                          <p class="action_td-id"><i class="fa-solid fa-ellipsis"></i></p>
                        </td>
                      </tr>
                      <tr >
                        
                        <td>
                          <h6>Donald Risher</h6>
                        </td>
                        
                        <td>20 Sep, 2022</td>
                        <td>Maintenance</td>
                        <td>Google Pay</td>
                        <td>$1200.00</td>
                        <td >
                        <p class="status_paid-id">Paid </p>
                        </td>
                        <td>
                          <p class="action_td-id"><i class="fa-solid fa-ellipsis"></i></p>
                        </td>
                      </tr>
                      <tr >
                        
                        <td>
                          <h6>Donald Risher</h6>
                        </td>
                        
                        <td>20 Sep, 2022</td>
                        <td>Maintenance</td>
                        <td>Google Pay</td>
                        <td>$1200.00</td>
                        <td >
                        <p class="status_failed-id">Failed</p>
                        </td>
                        <td>
                          <p class="action_td-id"><i class="fa-solid fa-ellipsis"></i></p>
                        </td>
                      </tr>
                      <tr >
                        
                        <td>
                          <h6>Donald Risher</h6>
                        </td>
                        
                        <td>20 Sep, 2022</td>
                        <td>Maintenance</td>
                        <td>Google Pay</td>
                        <td>$1200.00</td>
                        <td >
                        <p class="status_paid-id">Paid </p>
                        </td>
                        <td>
                          <p class="action_td-id"><i class="fa-solid fa-ellipsis"></i></p>
                        </td>
                      </tr>
                      <tr >
                        
                        <td>
                          <h6>Donald Risher</h6>
                        </td>
                        
                        <td>20 Sep, 2022</td>
                        <td>Maintenance</td>
                        <td>Google Pay</td>
                        <td>$1200.00</td>
                        <td >
                        <p class="status_pending-id">Pending</p>
                        </td>
                        <td>
                          <p class="action_td-id"><i class="fa-solid fa-ellipsis"></i></p>
                        </td>
                      </tr>
                      <tr >
                        
                        <td>
                          <h6>Donald Risher</h6>
                        </td>
                        
                        <td>20 Sep, 2022</td>
                        <td>Maintenance</td>
                        <td>Google Pay</td>
                        <td>$1200.00</td>
                        <td >
                        <p class="status_failed-id">Failed</p>
                        </td>
                        <td>
                          <p class="action_td-id"><i class="fa-solid fa-ellipsis"></i></p>
                        </td>
                      </tr>

                    </tbody>
                  </table>

                  <div className='pagination-payment'>
                 <div className='Showing_results-payment'><p>Showing</p> <h6>1 </h6> <h6>5</h6>  <h6>10</h6> <pre>results</pre></div>
                 <div className='previous_next-payment'><pre className='Previous'>Previous</pre> <pre className='previous_next-fix'>1</pre> <p>2</p> <p>3</p> <pre className='Next'>Next</pre> </div>
                 </div>
                  
                  
                   </div>
             </div>
             </div>
        
       
        </>
     );
}

export default Payment;