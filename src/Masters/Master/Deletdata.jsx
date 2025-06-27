// import React, { useState } from 'react'

// function Deletdata() {
//  const[count,setcount] = useState(0)

//  function incr(){
//   setcount(count+1)
//  }
//  function decr(){
//   if(count>0)
//   setcount(count-1)
//  }
//   return (
//     <div>
//  {count===10 ? <p>jaitpuriya</p> : <></>}
//     <button className='ml-5' onClick={incr}>+</button>
//     <p className='ml-5'>{count}</p>
//     <button className='ml-5' onClick={decr}>-</button>
      
//     </div>
//   )
// }

// export default Deletdata


// import React, { useState } from 'react'

// function Deletdata() {
//  const [show,setshow] = useState()
//   return (
//     <div>
//     <input type={show ? "password" :"text"}/>
//     <button onClick={(()=>{setshow(!show)})}>{show ? "hide" :"show"}</button>
      
//     </div>
//   )
// }

// export default Deletdata




// import React, { useState } from 'react'

// function Deletdata() {
//  const [show,setshow]=  useState()
//   return (
// <>
//   <button onClick={(()=>{setshow(!show)})}>Button</button>
//    {show && (
//     <p>Hello vicky jaitpuriya</p>
//    )}
// </>
//   )
// }

// export default Deletdata


import React, { useState } from "react";

function SearchFilterList() {
  const [searchTerm, setSearchTerm] = useState("");

  const users = [
    "Amit",
    "Vikash",
    "Rohit",
    "Suman",
    "Priya",
    "Sneha",
    "Karan",
    "Rani"
  ];

  const filteredUsers = users.filter((user) =>
    user.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", textAlign: "center" }}>
      <h2>🔍 Search Users</h2>

      <input
        type="text"
        placeholder="Search name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <ul>
        {filteredUsers.map((user, index) => (
          <li key={index} >
            {user}
          </li>
        ))}

      </ul>
    </div>
  );
}

export default SearchFilterList;
