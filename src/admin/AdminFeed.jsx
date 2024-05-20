import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import { addResponseContext } from '../Context/ContextAPI'
import AdminNav from './AdminNav'
import Post from '../components/Post'
import Ad from '../components/Ad'
import Friends from '../components/Friends'
import Adminfeedpost from './Adminfeedpost'
import { Nav } from 'react-bootstrap'
import BottomNav from '../components/BottomNav'
import Adminbooked from './Adminbooked'
import AdminNavbar from './AdminNavbar'
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Container } from '@mui/material'

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
    <><div className=' w-100 fixed-top'>
      <AdminNavbar/>
    </div>
    <div className='fullscreen text-light' style={{ backgroundColor: 'black'}}>
        <div className="fullbody " style={{ backgroundColor: 'black' }}>
          <div className='row'>
            <div className='w-100 navbarhome '>
            
              </div>
          </div>
          <div className="row resadminside">
            <div className="col-lg-2 text-light pt-5 pb-5 navl navleftbar" style={{ height: '100vh', position: 'fixed' }}>
              <AdminNav />
            </div>
            <div className="col-lg-6 text-light homepost">
              {/* <Addpost /> */}
              <Adminfeedpost/>
            </div>
            <div className="col-lg-1 text-light adfrnd" style={{ position: 'fixed', width: '25%' }}>
              {/* <Ad /> */}
              <Adminbooked/>
            </div>

          </div>
          

        </div>
      </div>
    </>
  )
}

export default AdminFeed