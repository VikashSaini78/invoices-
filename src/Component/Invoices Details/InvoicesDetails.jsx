import React, { useState } from 'react'
import "./InvoicesDetails.css"
function InvoicesDetails() {

  function hendalvalue(e){
   e.preventDefault()
  }


  return (
    <>
   <div className='invoice_Details-container'>
   <>
  <form className="form" onSubmit={hendalvalue}>
    <button>
      <svg
        width={17}
        height={16}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-labelledby="search"
      >
        <path
          d="M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9"
          stroke="currentColor"
          strokeWidth="1.333"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
    <input
      className="input"
      placeholder="Type your text"
      required=""
      type="text"
    />
  </form>
</>


   </div>
  
      
    </>
  )
}

export default InvoicesDetails
