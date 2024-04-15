import React from 'react'
import Navbar from './Navbar'
import NavLeft from './NavLeft'
import Post from './Post'
import Addpost from './Addpost'
import Friends from './Friends'
import Ad from './Ad'

function Home() {
  return (
    <>
      <div className='fullscreen' style={{ backgroundColor: 'black' }}>
        <div className="fullbody ms-5 me-5 mb-5" style={{ height: '100vh', backgroundColor: 'black' }}>
          <Navbar/>
          <div className="row">
            <div className="col-lg-2 text-light pt-5 pb-5 navl" style={{ height: '100vh', position: 'fixed' }}>
              <NavLeft />
            </div>
            <div className="col-lg-6 text-light" style={{ marginLeft: '400px' }}>
              <Addpost />
              <Post />
            </div>
            <div className="col text-light adfrnd" style={{ position: 'fixed', width: '25%' }}>
              <Ad />
              <Friends />
            </div>

          </div>

        </div>
      </div>
    </>
  )
}

export default Home