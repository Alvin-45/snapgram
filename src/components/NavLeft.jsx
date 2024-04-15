import React from 'react'

function NavLeft() {
  return (
    <>
        <div className='navleft d-flex flex-column' style={{height:'100vh'}}>
            <h1 className='title'>SnapGram</h1>
            <span><i className="fa-solid fa-house nav1"></i> Home</span>
            <span><i className="fa-solid fa-magnifying-glass nav1"></i> Search</span>
            <span><i className="fa-regular fa-comment nav1"></i> Messages</span>
            <span><i className="fa-solid fa-user-group nav1"></i> Friends</span>
            
            
            <div className='d-flex justify-content-start flex-column btm'>
               <span><i className="fa-regular fa-circle-user nav1"></i> User Profile</span>
                <span><i class="fa-solid fa-bars nav1"></i> Settings</span>
            </div>
        </div>
    </>
  )
}

export default NavLeft