// import React, { useState } from 'react'

// function Addproduct() {
//   const [name,setname] = useState('')
//   const [file,setfile] = useState('')


//   const submitvalue=(e)=>{
//          e.preventDefault()
//          console.log({name,file})
//          const formdata= {name,file}
         
//   //   fetch("/api/addproductdata",{
//   //   method:"POST",
//   //   headers:{"Content-Type":"application/json"},
//   //   body:JSON.stringify(formdata)
//   // })
//   fetch("http://localhost:5000/api/addproductdata", {
//     method: "POST",
//     body: formdata,
// })
// .then(response => response.json())
// .then(data => console.log(data))
// .catch(error => console.error("Error:", error));



//   }
//   return (
//     <>
//       <form className=' w-44' onSubmit={submitvalue}>
//       <input type="name" className="form-control"
//           value={name}
//           onChange={(e) => setname(e.target.value)}
//       />
//       <input class="form-control" type="file"
//         value={file}
//         onChange={(e) => setfile(e.target.value)}
//       />

//          <button type="submit" class="btn btn-success">Submit</button>
//       </form>
//     </>
//   )
// }

// export default Addproduct



import React, { useState } from "react";

function Addproduct() {
  const [name, setName] = useState("");
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const submitValue = async (e) => {
    e.preventDefault();

    if (!name || !file) {
      setMessage("❌ Please enter a name and select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:5001/api/addproductdata", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        setMessage("✅ Product added successfully!");
        setName(""); // Clear input
        setFile(null); // Clear file input
      } else {
        setMessage("❌ Error adding product.");
      }

      console.log("Response:", data);
    } catch (error) {
      console.error("Error:", error);
      setMessage("❌ Server error. Please try again.");
    }
  };

  return (
    <>
      <form className="w-44" onSubmit={submitValue}>
        <input
          type="text"
          className="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter Product Name"
        />
        <input
          className="form-control"
          type="file"
          onChange={(e) => setFile(e.target.files[0])} 
        />
        <button type="submit" className="btn btn-success">Submit</button>
      </form>
      {message && <p>{message}</p>}
    </>
  );
}

export default Addproduct;
