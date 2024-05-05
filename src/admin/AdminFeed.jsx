import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import { addResponseContext } from '../Context/ContextAPI'
import AdminNav from './AdminNav'
import Post from '../components/Post'
import Ad from '../components/Ad'
import Navbar from '../components/Navbar'
import Friends from '../components/Friends'
import Adminfeedpost from './Adminfeedpost'


function AdminFeed() {
    const {addResponse,setAddResponse}=useContext(addResponseContext)
    const [lStatus,setLStatus] = useState(false)
    const navigate=useNavigate()
    useEffect(()=>{
      
      if(sessionStorage.getItem("token")){
        setLStatus(true)
        
      }else{
        setLStatus(false)
        navigate('/login')
        toast.error("Login to Continue");
        
      }
    },[addResponse])
    
    
  return (
    <>
    <div className='fullscreen' style={{ backgroundColor: 'black'}}>
        <div className="fullbody ms-5 me-5" style={{ backgroundColor: 'black' }}>
          
          <div className="row">
            <div className="col-lg-2 text-light pt-5 pb-5 navl" style={{ height: '100vh', position: 'fixed' }}>
              <AdminNav/>
            </div>
            <div className="col-lg-6 text-light" style={{ marginLeft: '400px' }}>
              <Adminfeedpost/>
            </div>
            <div className="col text-light adfrnd" style={{ position: 'fixed', width: '25%' }}>
              <Ad />
            </div>

          </div>

        </div>
        <ToastContainer position='top-center' theme='colored' autoClose={3000} />
      </div>
    </>
  )
}

export default AdminFeed