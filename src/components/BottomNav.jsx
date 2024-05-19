import React from 'react'
import { Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function BottomNav() {
  return (
    <>
    {/* <div className='text-light fixed-bottom' >
        <Nav fill variant="tabs" defaultActiveKey="/" className='pt-2 pb-2'style={{height:'45px',backgroundColor:'black'}}>
          <Nav.Item className='bg-light rounded '>
            <Link to="/" > <i className="fa-solid fa-home text-dark"></i> </Link>
          </Nav.Item>
          <Nav.Item>
            <Link to="/search" className='text-light'> <i className="fa-solid fa-search"></i> </Link>
          </Nav.Item>
          <Nav.Item>
            <Link to="/friends" className='text-light'> <i className="fa-solid fa-users"></i> </Link>
          </Nav.Item>
          <Nav.Item>
            <Link to="/profile" className='text-light'> <i className="fa-solid fa-circle-user"></i> </Link>
          </Nav.Item>
        </Nav>
    </div> */}

<div className="fixed-bottom ">
      <div className='text-light p-2' style={{height:'45px',backgroundColor:'black'}}>
        <Nav fill variant="tabs" defaultActiveKey="#search">
          <Nav.Item style={{backgroundColor:'white'}} className='rounded'>
            <Link to='/' className='text-light '> <i className="fa-solid fa-home mt-2 text-dark"></i> </Link>
          </Nav.Item>
          
            <Nav.Item>
              <Link to='/search'> <i className="fa-solid fa-search text-light fw-bolder"></i> </Link>
            </Nav.Item>
          
          
            <Nav.Item>
              <Link to='/friends'  className='text-light'> <i className="fa-solid fa-users mt-2"></i> </Link>
            </Nav.Item>
          
         
            <Nav.Item>
               <Link to='/profile'  className='text-light'> <i className="fa-solid fa-circle-user mt-2"></i></Link>
            </Nav.Item>
          
        </Nav>
    </div>

      </div>
    
    </>
  )
}

export default BottomNav