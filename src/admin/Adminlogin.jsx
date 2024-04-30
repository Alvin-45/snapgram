import React, { useState } from 'react'
import logo from "../assets/instalogo.png"
import { FloatingLabel, Form } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import { adminlogin } from '../../services/allAPI'
import "react-toastify/dist/ReactToastify.css"


function Adminlogin() {
    const navigate=useNavigate()
    const [userInput, setUserinput] = useState({
      email: "", password: ""
    })
    const handleLogin = async (e)=>{
      e.preventDefault()
      if(userInput.email && userInput.password){
        try{
          const result = await adminlogin(userInput)
          if (result.status==200){
            console.log(result.data.existingUser);
             sessionStorage.setItem("existingUser",JSON.stringify(result.data.existingUser))
             sessionStorage.setItem("Name",JSON.stringify(result.data.existingUser.firstName))
             sessionStorage.setItem("email",JSON.stringify(result.data.existingUser.email))
             console.log(result.data.token);
             sessionStorage.setItem("token",result.data.token)
             
            toast.success(`Welcome Back  ${result.data.existingUser.firstName}...`)
            setUserinput({email:"",password:""})
            setTimeout(()=>{
              navigate('/admindashboard')
            },2000);
          }else{
             toast.error(result.response.data)
             
          }
        }
        catch(err){
          console.log(err);
        }
      }else{
          toast.warning("Please Fill The Form Completely!!!")
        }
    }
  return (
    <>
<div className="Authfullbody" style={{ width: '100%', backgroundColor: 'black',height:'100vh' }}>
        <div className="border1 shadow container">
          <img src={logo} alt="" style={{ width: '45%', height: '500px' }} />
          <h1 className='title text-light head1'>SnapGram</h1>
          <h5 className="text-light">Admin Login</h5>
          <FloatingLabel controlId="floatingEmail" label="Email" className='mb-2 inp'>
            <Form.Control type="email" placeholder="Email" onChange={e=>setUserinput({...userInput,email:e.target.value})}   style={{backgroundColor:'black',borderTop:'0px',borderBottom:'2px solid white',borderLeft:'0px',borderRight:'0px',textAlign:'center',borderRadius:'0px',color:'white'}}/>
          </FloatingLabel>
          <FloatingLabel controlId="floatingPassword" label="Password" className='mb-2 inp'>
            <Form.Control type="email" placeholder="Password" onChange={e=>setUserinput({...userInput,password:e.target.value})}   style={{backgroundColor:'black',borderTop:'0px',borderBottom:'2px solid white',borderLeft:'0px',borderRight:'0px',textAlign:'center',borderRadius:'0px',color:'white'}}/>
          </FloatingLabel>

          <button onClick={handleLogin} className="btn btn-primary mt-5" style={{width:'40%'}}>Login</button>

          <p className='text-light mt-2'>New Here!!!  <Link to={'/adminsignup'}><span className="text-primary"> Sign up</span></Link></p>
        </div>
        <ToastContainer position='top-center' theme='colored' autoClose={3000} />
      </div>
    </>
  )
}

export default Adminlogin