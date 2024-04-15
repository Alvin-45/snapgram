import React from 'react'

function Navbar() {
  return (
    <>
    <div className="w-100 d-flex justify-content-end">
      <span  className="text-light"><i className="fa-regular fa-sun fa-lg p-3 me-2" style={{color:'white'}}></i>Light Mode</span>
      <span style={{display:'none'}}  className="text-dark"><i className="fa-regular fa-moon fa-lg p-3 me-2" style={{color:'black'}}></i>Night Mode</span>

    </div>
    </>
  )
}

export default Navbar