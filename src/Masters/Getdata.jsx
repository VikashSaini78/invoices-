// import React, { useState } from "react";
// import "./Masterdata.css";

// const Getdata = () => {
//   const [formData, setFormData] = useState({
//     TableName: "",
//     WhereCondition: "",
//     Name: "",
//   });

//   const [responseData, setResponseData] = useState(null);
//   const [error, setError] = useState(null);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(null);
//     setResponseData(null); 

//     console.log("Submitting Data:", formData);

//     const data = new URLSearchParams();
//     data.append("SecurityKey", "abcd");
//     data.append("TableName", formData.TableName || "");
//     data.append("WhereCondition", formData.WhereCondition || "");
//     data.append("Name", formData.Name || "");

//     console.log("Data being sent:", data.toString());

//     try {
//       const proxyUrl = "https://thingproxy.freeboard.io/fetch/"; 
//       const apiUrl = "http://etour.responseinfoway.com/restapi/Selectdata.aspx";

//       const response = await fetch(proxyUrl + apiUrl, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/x-www-form-urlencoded",
//         },
//         body: data.toString(),
//       });

//       console.log("Full Response:", response);

//       if (!response.ok) {
//         throw new Error(`HTTP Error! Status: ${response.status}`);
//       }

//       const responseText = await response.text();
//       console.log("Raw Server Response:", responseText);

//       try {
//         const jsonData = JSON.parse(responseText);
//         console.log("Parsed Response Data (JSON):", jsonData);

//         setResponseData(jsonData);
//       } catch (error) {
//         console.warn("Response is not JSON. Displaying raw text.");
//         setResponseData(responseText);
//       }
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       setError("Failed to fetch data. Please try again.");
//     }
//   };

//   return (
//     <div className="masdata_container">
//       <form className="Columname-inputcolom" onSubmit={handleSubmit}>
//         <h5 className="fw-bold mb-2 m-auto">Master Data</h5>

//         <div className="input_text-labalname">
//           <label>Table Name</label>
//           <input
//             type="text"
//             name="TableName"
//             placeholder="Enter Table Name"
//             value={formData.TableName}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <div className="input_text-labalname">
//           <label>Where Condition</label>
//           <input
//             type="text"
//             name="WhereCondition"
//             placeholder="Enter Where Condition"
//             value={formData.WhereCondition}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <div className="input_text-labalname">
//           <label>Field Name</label>
//           <input
//             type="text"
//             name="Name"
//             placeholder="Enter Field Name"
//             value={formData.Name}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <button type="submit">Submit</button>
//       </form>

//       {error && <p className="error-message">{error}</p>}

//       {responseData && (
//         <div className="response-container">
         
//           <pre>
//             {typeof responseData === "string"
//               ? responseData
//               : JSON.stringify(responseData, null, 2)
//               }
//           </pre>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Getdata;








import React, { useState } from "react";
import "./Masterdata.css";

const Getdata = () => {
  const [formData, setFormData] = useState({
    TableName: "",
    WhereCondition: "",
    Name: "",
  });

  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setResponseData(null);

    console.log("🔵 Submitting Data:", formData);

    const data = new URLSearchParams();
    data.append("SecurityKey", "abcd");
    data.append("TableName", formData.TableName || "");
    data.append("WhereCondition", formData.WhereCondition || "");
    data.append("Name", formData.Name || "");

    console.log("🟡 Data being sent:", data.toString());

    try {
      const proxyUrl = "https://thingproxy.freeboard.io/fetch/";
      const apiUrl = "http://etour.responseinfoway.com/restapi/Selectdata.aspx";

      const response = await fetch(proxyUrl + apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: data.toString(),
      });

      console.log("🔵 Full Response:", response);

      if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
      }

      const responseText = await response.text();
      console.log("🟠 Raw Server Response:", responseText);

      try {
        const jsonData = JSON.parse(responseText);
        console.log("🟢 Parsed Response Data (JSON):", jsonData);

        // Ensure responseData is in an array format for table rendering
        if (Array.isArray(jsonData)) {
          setResponseData(jsonData);
        } else if (typeof jsonData === "object" && jsonData.data) {
          setResponseData(Array.isArray(jsonData.data) ? jsonData.data : [jsonData.data]);
        } else {
          setResponseData([jsonData]); // Convert single object to array
        }
      } catch (error) {
        console.warn("⚠️ Response is not JSON. Displaying raw text.");
        setResponseData(responseText);
      }
    } catch (error) {
      console.error("🔴 Error fetching data:", error);
      setError("Failed to fetch data. Please try again.");
    }
  };

  return (
    <div className="masdata_container">
      <form className="Columname-inputcolom" onSubmit={handleSubmit}>
        <h5 className="fw-bold mb-2 m-auto">Master Data</h5>

        <div className="input_text-labalname">
          <label>Table Name</label>
          <input
            type="text"
            name="TableName"
            placeholder="Enter Table Name"
            value={formData.TableName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input_text-labalname">
          <label>Where Condition</label>
          <input
            type="text"
            name="WhereCondition"
            placeholder="Enter Where Condition"
            value={formData.WhereCondition}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input_text-labalname">
          <label>Field Name</label>
          <input
            type="text"
            name="Name"
            placeholder="Enter Field Name"
            value={formData.Name}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Submit</button>
      </form>

      {error && <p className="error-message">{error}</p>}

      {/* ✅ Table Rendering with Error Fix */}
      {responseData && Array.isArray(responseData) && responseData.length > 0 ? (
        <div className="response-container">
          {/* <h5>Response Data:</h5> */}
          <table border="1">
            <thead>
              <tr>
                {Object.keys(responseData[0]).map((key) => (
                  <th key={key}>{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {responseData.map((row, index) => (
                <tr key={index}>
                  {Object.keys(row).map((key, i) => (
                    <td key={i}>
                      {typeof row[key] === "object" ? JSON.stringify(row[key]) : row[key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : responseData ? (
        {/* <div className="response-container">
          <h5>Raw Response Data:</h5>
          <pre>{typeof responseData === "string" ? responseData : JSON.stringify(responseData, null, 2)}</pre>
        </div> */}
      ) : null}
    </div>
  );
};

export default Getdata;
