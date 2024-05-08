import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <>
    <div className="w-100 d-flex justify-content-between p-3">
      
        <Link to={'/'} className='text-light' style={{textDecoration:'none'}}><h4 className="title">Snapgram</h4></Link>
        <div className='d-flex justify-content-evenly w-25'>
        {/* <Link to={'/'} className='text-light'><i className="fa-regular fa-square-plus "></i></Link> */}
          <Link to={'/saved'} className='text-light'><i className="fa-solid fa-bookmark"></i></Link>
          <Link to={'/messages'} className='text-light'><i className="fa-regular fa-comment"></i></Link>
        </div>

    </div>
    </>
  )
}

export default Navbar