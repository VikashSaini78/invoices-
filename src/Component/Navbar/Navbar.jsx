import { useState } from "react";
import "./Navbar.css"
import "../Admin_panal/Admin_panal.css"
import { MdKeyboardArrowRight } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import Service from "../../Service";
import { Link } from "react-router-dom";
import { BsThreeDots } from "react-icons/bs";
import { IoIosLogOut } from "react-icons/io";

function Navbar() {
    const[value,setvalue] = useState("")
    const[admin,setadmin] = useState(false)

        const[liitem,setliitem] = useState(false)
        const[list,setlist] = useState('')
        const[report,setreport] = useState('')
        const[Transaction,settransaction] = useState('')
        const[Authentication,setAuthentication] = useState('')
        const[Bootstrap,setbootstrap] = useState("")
        const[Advance,setadvance] = useState("")
        const[table,settable] = useState("")
        const[Apexcharts,setApexcharts] = useState("")
        const[icons,seticons] = useState("")
        const[map,setmap] = useState("")
        const[multi,setmulti] = useState("")
        const[Notifications,setNotifications] = useState("")
        // const [query, setQuery] = useState("");


    return ( 
        <>

 


          
           {/* Dashboard */}



<div className="nav_dashbord">

<div className="dashbord">     
<div className={`sidebar ${admin ? "collapsed"  : ""} bg-white`}>

   <div className={`${admin ? " w-7 m-auto h-2 flex justify-center items-center" : "w-auto  mb-2" } flex justify-center items-center mt-4`}>
      <img
        className={`${admin ? "next-logo" : "admin_panal-logo"}`}
        src={admin ? "./media/logo.webp" : "./media/response_info.jpg"}
        alt={admin ? "Next Logo" : "Admin Panel Logo"}
      />
  


           <div className="admin_close-btn" onClick={()=>{setadmin(!admin)}}><IoMdClose  /></div>
           </div>
      

           {/* manu */}
          <div className="dashbord_text-div">
          <div className="paragraph"> <p className={`${admin ? "hidden" : "block"}`}>E Tour</p></div>
          <Link to={"/"}> 
          <div className="das_menu">
           <i className={`fa-solid fa-house ${admin ? "m-auto" : ""}`}></i><p className={`${admin ? "hidden" : "block"}`}>Dashboard</p>
           </div>


           </Link>
           </div>
            
            {/* page */}

           {/* <div className= "paragraph"><p className={`${admin ? "hidden" : "block"}`}>page</p></div> */}

             <div className="das_management" onClick={()=>{setliitem(!liitem)}}>
            <i className={`fa-solid fa-file-invoice ${admin ? "m-auto mt-2" : ""}`}></i> <p className={`${admin ? "hidden" : "block"}`}>Invoices Manag.. </p><pre className={`${admin ? "hidden" : "block"}`}><MdKeyboardArrowRight /></pre>
             </div>




                {/* Main Das Management */}
 
            
            { liitem && 
              <div className={`${admin ? "hidden" : "block"}`}>
              <div className="management_list-items">
             <div className={`${admin ? "hidden" : "block"}`}>
             <Link to={"/invoice"}><li>Invoice</li></Link>
             <Link to={"/addinvoice"}><li>Add Invoice</li></Link>
             <Link to={"/invoicedetails"}><li>Invoice Details</li></Link>
             <Link to={"/taxes"}><li>Taxes</li></Link>
             <Link to={"/payment"}><li>Payments</li></Link>
             
          <li onClick={()=>{setlist(!list)}}>Products <i class="fa-solid fa-angle-down"></i></li>
          
         {list && (
          <>
     
     <div className="drop_product-list">
     <Link to={"/product"}><li>Product List</li></Link>
     <li>Add Product</li>

     </div>
             </>
    )}
               
          <li onClick={()=>{setreport(!report)}}>Report <i class="fa-solid fa-angle-down"></i></li>

              {
                 report && (
                     <>
            <div className="drop_product-list">
            <li> Payment Summary</li>
              <li>Sale Report</li>
              <li>Expenses Report</li>
            </div>
                     </>
                 )
              }

              <Link to={"/user"}><li>Users</li></Link>
        
          <li onClick={()=>{settransaction(!Transaction)}} >Transaction  <i class="fa-solid fa-angle-down"></i></li>
          
         {
             Transaction && (
                 <>
          <div className="drop_product-list">
          <li>Transaction List</li>
          <li>New Transaction</li>
          </div>

                 </>
             )
         }


          </div>
             </div>
   )
              </div>
             }

             
   

             {/* Authentication  */}

             <div className="das_Authentication" onClick={()=>{setAuthentication(!Authentication)}}>
             <i className={`fa-solid fa-gear ${admin ? "m-auto mt-2" : ""}`}></i> <p className={`${admin ? "hidden" : "block"}`}>Authentication</p><pre className={`${admin ? "hidden" : "block"}`}><MdKeyboardArrowRight /></pre>

                {/* <h6><i class="fa-solid fa-gear"></i>   <i class="fa-solid fa-angle-down"></i></h6> */}
             </div>

            {
                Authentication && 
             <div  className={`${admin ? "hidden" : "block"}`}>
             <div  className="management_list-items">
              
               <Link to={"/signin"}> <li>Sign In</li></Link>
               <Link to={"/signup"}>  <li>Sign Up</li></Link>
           
             <li>Password Reset</li>
             <li>Lock Screen</li>
             </div>
             </div>
            }



            {/* Components */}

            
            {/* <div className= "paragraph"><p className={`${admin ? "hidden" : "block"}`}>Masters</p></div> */}
            {/* <div className="paragraph">
            <p className={`${admin ? "block" : "hidden"} m-0 p-0 text-center flex justify-center items-center `}><BsThreeDots /></p>
           <p className={`${admin ? "hidden " : "block"}`}>Masters</p>
           </div> */}

            <div className="comp_bootstap" onClick={()=>{setbootstrap(!Bootstrap)}}>
           <i className={`fa-solid fa-pen-nib ${admin ? "m-auto" : ""}`}></i>  <p className={`${admin ? "hidden" : "block"}`}> Master </p><pre className={`${admin ? "hidden" : "block"}`}><MdKeyboardArrowRight /></pre>
            </div>
         
           {
            Bootstrap && (
              <>
             <div  className={`${admin ? "hidden" : "block"}`}>
             <div className="bootstrap_list-item">
                
                <Link to={"/payment"}><li> Services</li></Link>
                <li>Vehicle Type</li>
                <li>Vehicles</li>
                <li>Ledger</li>
                <li>Group Master</li>
                <li>Users</li>
             
                    </div>
             </div>
              </>
            )}




            {/* hover */}

            {/* <div
      className="comp_bootstap"
      onMouseEnter={() => admin && setbootstrap(true)}
      onMouseLeave={() => admin && setbootstrap(false)}
      onClick={() => setbootstrap(!Bootstrap)}
    >
      <i className="fa-solid fa-pen-nib cursor-pointer"></i>
      <p className={`${admin ? "hidden" : "block"}`}>Master</p>
      <pre className={`${admin ? "hidden" : "block"}`}>
        <MdKeyboardArrowRight />
      </pre>
      
      {Bootstrap && admin && (
        <div className="bootstrap_list-itemhover absolute top-full left-0 mt-2 bg-white shadow-md rounded-lg p-4 z-10">
          <ul>
            <Link to={"/payment"}>
              <li>Services</li>
            </Link>
            <li>Vickuls Type</li>
            <li>Vickuls</li>
            <li>Layer</li>
            <li>Curpo Master</li>
            <li>User</li>
          </ul>
        </div>
      )}
      </div> */}





{/* Advance UI */}



                <div className="das_advance" onClick={()=>{setadvance(!Advance)}}>
               <i className={`fa-solid fa-book ${admin ? "m-auto mt-2" : ""}`}></i>   <p className={`${admin ? "hidden" : "block"}`}>Entries</p><pre className={`${admin ? "hidden" : "block"}`}><MdKeyboardArrowRight /></pre>
          
               {/* <h6><i class="fa-solid fa-hippo"></i>   <i class="fa-solid fa-angle-down"></i> </h6> */}
               </div>
              
           {
            Advance && (
              
             <div className={`${admin ? "hidden" : "block"}`}>
             <div className="advance_list-item">
               <li>Bills / Invoice</li>
               {/* <li>Nestable List</li> */}
               <li>Voucher Entry</li>
               {/* <li>Swiper Slider</li>
               <li>Ratings</li>
               <li>Highlight</li>
               <li>ScrollSpy</li> */}
               </div>
             </div>
              
            )
           }
               
               {/* Tables */}
               <div className="das_tables" onClick={()=>{settable(!table)}}>
              
               <i className={`fa-regular fa-file ${admin ? "m-auto mt-2" : ""}`}></i>   <p className={`${admin ? "hidden" : "block"}`}>Reports </p><pre className={`${admin ? "hidden" : "block"}`}><MdKeyboardArrowRight /></pre>
               {/* <h6 ><i class=""></i> <i class="fa-solid fa-angle-down"></i> </h6> */}
               </div>

          {
            table &&
          <div  className={`${admin ? "hidden" : "block"}`}>
              
          <div className="tables_list-items">
          <li>Ladger</li>
          {/* <li>Outstx</li> */}
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
          }



          {/* Apexcharts */}
          <div onClick={()=>{setApexcharts(!Apexcharts)}} className="das_Apexcharts">
          
           <i className={`fa-regular fa-window-restore ${admin ? "m-auto mt-2" : ""}`}></i>   <p className={`${admin ? "hidden" : "block"}`}>Utility</p><pre className={`${admin ? "hidden" : "block"}`}><MdKeyboardArrowRight /></pre>
           
      
          </div>

        {
          Apexcharts && (
         <div  className={`${admin ? "hidden" : "block"}`}>
         <div className="Apexcharts_list-item">
          <li>Backup</li>
          <li>Restore</li>
          <li>Configuration</li>
          </div>
         </div>

          )
        }
          
        {/* Icons  */}

             <div className="das_logout">
            <i className={`${admin ? "m-auto mt-2" : ""}`}><IoIosLogOut /></i><p className={`${admin ? "hidden" : "block"} cursor-pointer`}>Log Out</p>
            
           
            </div>
               
        

                 {/* maps */}

                 {/* <div onClick={()=>{setmap(!map)}} className="das_maps">
                 <i class="fa-solid fa-map-location-dot"></i>  <p className={`${admin ? "hidden" : "block"}`}>Maps</p><pre className={`${admin ? "hidden" : "block"}`}><MdKeyboardArrowRight /></pre>
                 </div>

                {
                  map && (
                <div div className={`${admin ? "hidden" : "block"}`}>
                <div className="map_list-items">
                 <li> Google</li>
                 <li>Vector</li>
                 <li>Leaflet</li>
                 </div>
                </div>
                  )
                } */}


                {/* multi level */}

                {/* <div onClick={()=>{setmulti(!multi)}} className="das_multi-lavel">
               <i className={`fa-solid fa-list ${admin ? "m-auto mt-2" : ""}`}></i>   <p className={`${admin ? "hidden" : "block"}`}> Multi Level</p><pre className={`${admin ? "hidden" : "block"}`}><MdKeyboardArrowRight /></pre>
    
                </div> */}
            
              {/* {
                multi && 
           <div className={`${admin ? "hidden" : "block"}`}>
           <div className="multi_list-item">
            <li>Level 1.1</li>
            <li>Level 1.2</li>
            </div>
           </div>
              } */}

            {/* <div  className={`${admin ? "hidden" : "block"}`}>
            <div className="das_invoice-div">
            <img src="./media/create-invoice.png"alt=""/>
            <div className="md_invoice-div">


           
            </div>

            </div>
            </div> */}


         
         
          </div>
</div>



{/* navbar */}

<div className={`main-content ${admin ? "expanded" : ""}`}>

<div className="nav_sub-container">

<div className="container_div">
            <div className="navbar">
            <div className="navbar_icon">
            <i class="fa-solid fa-bars" onClick={()=>{setadmin(!admin)}}>
              
            </i>
            
 
            <div className="nav_searchbar">
            <input type="search" placeholder="Search" /> 
            </div>
            
       
            </div>
            <i id="nav_icons" class="fa-solid fa-magnifying-glass"></i> 
 
      
              <div className="nav_bellfrofile">
               <i class="fa-regular fa-bell" onClick={()=>{setNotifications(!Notifications)}}>
               <span class="translate-middle badge rounded-pill bg-danger">
                  4
               </span>
               </i>
              
                <ul className="ul_calvind-text" onClick={()=>{setvalue(!value)}} ><img src="./media/avatar.jpg" alt=""/> Calvin.D <i class="fa-solid fa-chevron-down"></i></ul>
               
       
              </div>    


                {/* Notifications */}
                
               {
                Notifications &&(
                  <div className="nav_notifications-showbr">
      
                    <div className="nav_not-4"><h6> Notifications</h6><span>4 New</span> </div>
                    <div className="notfication_member-show">
                      
                      <div className="notfication_member-show-1">
                      <img src="./media/ntotifaction.jpg" alt="not"/>
                            
                            <div className="noti_text-text"><h6>Angela Berner</h6> <p>Answered to your comment on the cash flow forecast's graph 
                            <pre>48 MIN AGO</pre></p></div>
                            <input class="form-check-input" type="checkbox"/>
                      </div>
                    
                    </div>


                    <div className="notfication_member-show">
                      
                      <div className="notfication_member-show-1">
                      <img src="./media/ntotifaction.jpg" alt="not"/>
                            
                            <div className="noti_text-text"><h6>Angela Berner</h6> <p>Answered to your comment on the cash flow forecast's graph 
                            <pre>48 MIN AGO</pre></p></div>
                            <input class="form-check-input" type="checkbox"/>
                      </div>
                    
                    </div>
                    <div className="notfication_member-show">
                      
                      <div className="notfication_member-show-1">
                      <img src="./media/ntotifaction.jpg" alt="not"/>
                            
                            <div className="noti_text-text"><h6>Angela Berner</h6> <p>Answered to your comment on the cash flow forecast's graph 
                            <pre>48 MIN AGO</pre></p></div>
                            <input class="form-check-input" type="checkbox"/>
                      </div>
                    
                    </div>

                    <div className="notfication_member-show">
                      
                      <div className="notfication_member-show-1">
                      <img src="./media/ntotifaction.jpg" alt="not"/>
                            
                            <div className="noti_text-text"><h6>Angela Berner</h6> <p>Answered to your comment on the cash flow forecast's graph 
                            <pre>48 MIN AGO</pre></p></div>
                            <input class="form-check-input" type="checkbox"/>
                      </div>
                    
                    </div>


                    <div className="notfication_member-show">
                      
                      <div className="notfication_member-show-1">
                      <img src="./media/ntotifaction.jpg" alt="not"/>
                            
                            <div className="noti_text-text"><h6>Angela Berner</h6> <p>Answered to your comment on the cash flow forecast's graph 
                            <pre>48 MIN AGO</pre></p></div>
                            <input class="form-check-input" type="checkbox"/>
                      </div>
                    
                    </div>

                     </div>
                )
               }




            </div>

            </div>

           <div className="nav-profile_div">
           { value &&
                <div className="nav_profile-text">
                  <li><i class="fa-regular fa-user"></i> Profile</li>
                  <li><i class="fa-solid fa-wallet"></i> My Wallet</li>
                  <li><i class="fa-solid fa-gear"></i> Setting</li>
                  <li><i class="fa-solid fa-lock"></i> Look Screen</li>
                  <hr/>
                  <div className="nav_log-out"><i class="fa-solid fa-power-off"></i> Log out</div>
                  </div>
                  }
           </div>
        <>
      <Service/>
        </>
</div>

    
 </div>
</div>
         
        </>
     );
}

export default Navbar;





