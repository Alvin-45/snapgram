import React from 'react'
import Navbar from '../components/Navbar'
import NavLicon from '../components/NavLicon'
import ChatPersons from '../components/ChatPersons'
import userimg from '../assets/user.png';
import Chat from '../components/Chat';


function Messages() {
  return (
    <>
     <div className='fullsearchbdy' style={{ backgroundColor: 'black', height: '150vh' }}>
        <Navbar />
        <div className='row'>
          <div
            className='col-lg-1 text-light  pb-5 navl ms-3'
            style={{ height: '100vh', position: 'fixed' }}
          >
            <NavLicon />
          </div>
          <div className='col-lg-2 text-light mt-5  ' style={{ marginLeft: '150px'}}>
            <Chat/>
           <ChatPersons/>
          </div>
          <div className="col-lg-8 bg-dark" style={{height:'100vh',borderLeft:'1px solid white',position:'fixed',marginLeft:'30%'}}>
            <div className="row">
              <div className="col d-flex justify-content-start align-items-start">
                <img src={userimg} alt=""  style={{ width: '70px' }} />
                <div className='mt-3 d-flex flex-column nameu'>
                  <h5 className='text-light '>Bruce</h5>
                  <p className='text-secondary'>batman</p>
                </div>
              </div>
            </div>
            <hr  style={{color:'white'}}/>
            <div className="row">
              <div className="col" style={{height:'65vh'}}></div>
            </div>
            <hr  style={{color:'white'}}/>
            <div className="row">
              <div className="col-lg-12 d-flex justify-content-center align-items-center">
                <input type="text" className='bg-dark w-75 rounded' placeholder='Type Here...' />
                <button className="btn btn-primary"><i className="fa-regular fa-paper-plane"></i> Send</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Messages