// import React, { useEffect, useState } from "react";

// function Getdata() {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await fetch("https://cors-anywhere.herokuapp.com/http://etour.responseinfoway.com/restapi/Selectdata.aspx");
//         if (!res.ok) {
//           throw new Error(`HTTP Error! Status: ${res.status}`);
//         }
//         const data = await res.json();
//         setData(data);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div>
//       <h1>API Data</h1>
//       <ul>
//         {data.map((item, index) => (
//           <li key={index}>
//             {/* Customize this part according to the structure of your data */}
//             {item.name} - {item.emailid} - {item.mobileno}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default Getdata;


