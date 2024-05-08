import React from 'react'
import { Nav } from 'react-bootstrap'

function BottomNav() {
  return (
    <>
    <div className='text-light p-2' style={{height:'55px',backgroundColor:'black'}}>
        <Nav fill variant="tabs" defaultActiveKey="/">
          <Nav.Item>
            <Nav.Link href="/" className=''> <i className="fa-solid fa-home"></i> </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/search" className='text-light'> <i className="fa-solid fa-search"></i> </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/friends" className='text-light'> <i className="fa-solid fa-users"></i> </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/profile" className='text-light'> <i className="fa-solid fa-circle-user"></i> </Nav.Link>
          </Nav.Item>
        </Nav>
    </div>
    
    </>
  )
}

export default BottomNav