// import React from 'react'
// import { useState } from "react";
// import "./Admin_panal.css"
// function Adminpanal() {
//     const[liitem,setliitem] = useState('')
//     const[list,setlist] = useState('')
//     const[report,setreport] = useState('')
//     const[Transaction,settransaction] = useState('')
//     const[Authentication,setAuthentication] = useState('')
//     const[Bootstrap,setbootstrap] = useState("")
//     const[Advance,setadvance] = useState("")
//     const[table,settable] = useState("")
//     const[Apexcharts,setApexcharts] = useState("")
//     const[icons,seticons] = useState("")
//     const[map,setmap] = useState("")
//     const[multi,setmulti] = useState("")
//   return (
//     <>

    
//      <div className="Dashboard">
//            <div className="das_logo">
//            <img src="./media/logo-dark.png" alt=""/>
//            </div>

//            {/* manu */}
//           <div className="dashbord_text-div">
//           <p className="paragraph">MENU</p>
//            <div className="das_menu">
//            <h6><i class="fa-solid fa-house"></i>Dashboard</h6>
//            </div>
//            </div>
            
//             {/* page */}

//            <p className="paragraph">page</p>

//              <div className="das_management" onClick={()=>{setliitem(!liitem)}}>
//              <h6><i class="fa-solid fa-file-invoice"></i> Invoices Management <i class="fa-solid fa-angle-down"></i></h6>
//              </div>
             
//             { liitem && 
//                 <div className="management_list-items">
//              <li> Invoice</li>
//              <li>Add Invoice</li>
//              <li>Invoice Details</li>
//              <li>Payments</li>
//              <li>Taxes</li>
//              <li onClick={()=>{setlist(!list)}}>Products <i class="fa-solid fa-angle-down"></i></li>
             
//             {list && (
//              <>
        
//         <div className="drop_product-list">
//         <li>Product List</li>
//         <li>Add Product</li>

//         </div>
//                 </>
//        )}
                  
//              <li onClick={()=>{setreport(!report)}}>Report <i class="fa-solid fa-angle-down"></i></li>

//                  {
//                     report && (
//                         <>
//                <div className="drop_product-list">
//                <li> Payment Summary</li>
//                  <li>Sale Report</li>
//                  <li>Expenses Report</li>
//                </div>
//                         </>
//                     )
//                  }


//              <li>Users</li>
//              <li onClick={()=>{settransaction(!Transaction)}} >Transaction  <i class="fa-solid fa-angle-down"></i></li>
             
//             {
//                 Transaction && (
//                     <>
//              <div className="drop_product-list">
//              <li>Transaction List</li>
//              <li>New Transaction</li>
//              </div>

//                     </>
//                 )
//             }


//              </div>}

//              {/* Authentication  */}

//              <div className="das_Authentication" onClick={()=>{setAuthentication(!Authentication)}}>
//                 <h6><i class="fa-solid fa-gear"></i> Authentication  <i class="fa-solid fa-angle-down"></i></h6>
//              </div>

//             {
//                 Authentication && 
//                 <div  className="management_list-items">
//              <li> Sign In</li>
//              <li>Sign Up</li>
//              <li>Password Reset</li>
//              <li>Lock Screen</li>
//              </div>
//             }



//             {/* Components */}

//             <p className="paragraph">Components</p>
//             <div className="comp_bootstap">
//             <h6 onClick={()=>{setbootstrap(!Bootstrap)}}><i class="fa-solid fa-pen-nib"></i> Bootstrap UI  <i class="fa-solid fa-angle-down"></i></h6>
//             </div>
         
//            {
//             Bootstrap && (
//               <>
//                 <div className="bootstrap_list-item">
//                 <li> Alerts</li>
//             <li>Badges</li>
//             <li>Buttons</li>
//             <li>Colors</li>
//             <li>Cards</li>
//             <li>Carousel</li>
//             <li>Dropdowns</li>
//             <li>Grid</li>
//             <li>Images</li>
//             <li>Tabs</li>
//             <li>Accordion & Collapse</li>
//              <li>Modals</li>
//              <li>Offcanvas</li>
//              <li>Placeholders</li>
//              <li>Progress</li>
//              <li>Notifications</li>
//              <li>Media object</li>
//              <li>Embed Video</li>
//              <li>Typography</li>
//              <li>Lists</li>
//              <li>General</li>
//              <li>Utilities</li>
//                 </div>
//               </>
//             )}

// {/* Advance UI */}



//                 <div className="das_advance" onClick={()=>{setadvance(!Advance)}}>
//                <h6><i class="fa-solid fa-hippo"></i> Advance UI  <i class="fa-solid fa-angle-down"></i> </h6>
//                </div>
              
//            {
//             Advance && (
              
//               <div className="advance_list-item">
//                <li>Sweet Alerts</li>
//                <li>Nestable List</li>
//                <li>Scrollbar</li>
//                <li>Swiper Slider</li>
//                <li>Ratings</li>
//                <li>Highlight</li>
//                <li>ScrollSpy</li>
//                </div>
              
//             )
//            }
               
//                {/* Tables */}
//                <div className="das_tables">
//                <h6 onClick={()=>{settable(!table)}}><i class="fa-solid fa-table"></i> Tables <i class="fa-solid fa-angle-down"></i> </h6>
//                </div>

//           {
//             table &&
            
//           <div className="tables_list-items">
//           <li>Basic Tables</li>
//           <li>Grid Js</li>
//           <li>List Js</li>
//           <li>Datatables</li>
//           </div>
//           }



//           {/* Apexcharts */}
//           <div onClick={()=>{setApexcharts(!Apexcharts)}} className="das_Apexcharts">
//           <h6><i class="fa-brands fa-centos"></i> Apexcharts <i class="fa-solid fa-angle-down"></i> </h6>
//           </div>

//         {
//           Apexcharts && (
//             <div className="Apexcharts_list-item">
//           <li>Line</li>
//           <li>Area</li>
//           <li>Column</li>
//           <li>Bar</li>
//           <li>Mixed</li>
//           <li>Timeline</li>  
//           <li>Candlstick</li>
//           <li>Boxplot</li>
//           <li>Bubble</li>
//           <li>Scatter</li>
//           <li>Heatmap</li>
//           <li>Treemap</li>
//           <li>Pie</li>
//           <li>Radialbar</li>
//           <li>Radar</li>
//           <li>Polar Area</li>
//           </div>

//           )
//         }
          
//         {/* Icons  */}

//             <div onClick={()=>{seticons(!icons)}} className="das_Icons">
//             <h6><i className="fa-solid fa-gift"></i> Icons <i className="fa-solid fa-angle-down"></i></h6>
//             </div>
               
//               {
//                 icons && (
//                   <div className="icons_list-items">
//                <li>Remix</li>
//                <li>Boxicons</li>
//                <li>Material Design</li>
//                <li>Bootstrap</li>
//                <li>Line Awesome</li>
//                </div>
//                 )
//               }


//                  {/* maps */}

//                  <div onClick={()=>{setmap(!map)}} className="das_maps">
//                   <h6><i className="fa-solid fa-map-location-dot"></i> Maps <i className="fa-solid fa-angle-down"></i> </h6>
//                  </div>

//                 {
//                   map && (
//                 <div className="map_list-items">
//                  <li> Google</li>
//                  <li>Vector</li>
//                  <li>Leaflet</li>
//                  </div>
//                   )
//                 }


//                 {/* multi level */}

//                 <div onClick={()=>{setmulti(!multi)}} className="das_multi-lavel">
//                   <h6><i class="fa-solid fa-list"></i> Multi Level <i className="fa-solid fa-angle-down"></i> </h6>
//                 </div>
            
//               {
//                 multi && 
//             <div className="multi_list-item">
//             <li>Level 1.1</li>
//             <li>Level 1.2</li>
//             </div>
//               }

//             <div className="das_invoice-div">
//             <img src="./media/create-invoice.png"alt=""/>
//             <div className="md_invoice-div">

//            <div className="invoice_text-button"> <p>Upgrade To Pro For More Features</p>
//            <button type="button" class="btn btn">create invoice</button>
//            </div>

           
//             </div>

//             </div>


//           </div>
      
//     </>
//   )
// }

// export default Adminpanal
