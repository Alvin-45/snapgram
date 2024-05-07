import { TextField } from '@mui/material'
import React, { useContext, useState } from 'react'
import logo from "../assets/instalogo.png"
import { Password } from '@mui/icons-material'
import { FloatingLabel, Form } from 'react-bootstrap'
import { register } from '../../services/allAPI'
import { Link, useNavigate } from 'react-router-dom'
import { Bounce, ToastContainer, toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import { profilepicContext } from '../Context/ContextAPI'
// import { GoogleLogin } from '@react-oauth/google';
// import { jwtDecode } from 'jwt-decode'


function Auth(insideregister) {
  const {updateprofilepic,setUpdateprofilepic}=useContext(profilepicContext)

  const [emptyStatus, setEmptyStatus] = useState(false)
  const navigate = useNavigate()
  const [inregister, setInregister] = useState(true)
  const [userInput, setUserinput] = useState({
    firstName: "", email: "", username: "", password: ""
  })
  const handleRegister = async (e) => {
    e.preventDefault()
    const emailRegex = /\b[A-Za-z0-9._%+-]+@gmail\.com\b/;
    const minLength = 8;

    if (!userInput.firstName || !userInput.email || !userInput.username || !userInput.password) {
      toast.warning("Please fill out all the fields.");
      setEmptyStatus(true)
      return;
    } else if (!emailRegex.test(userInput.email)) {
      toast.error("Enter a valid Gmail address.");
      return;
    }

    // API call
    try {
      const result = await register(userInput);
      console.log(result);
      setUpdateprofilepic(userInput)
      if (result.status === 200) {
        sessionStorage.setItem('token',result.data.token)
        toast.success(`Welcome ${result.data.firstName}... Please Login to Explore Our Website!!!`);
        setUserinput({
          firstName: "",
          email: "",
          username: "",
          password: "",
        });
        setTimeout(() => {
          navigate('/uploadpic');
        }, 2000);
      } else {
        toast.error(result.response.data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div className="Authfullbody" style={{ width: '100%', backgroundColor: 'black', height: '150vh' }}>
        <div className="border1 shadow container">
          <img src={logo} alt="" style={{ width: '45%', height: '500px' }} />
          <h1 className='title text-light head1'>SnapGram</h1>
          <FloatingLabel controlId="floatingInput2" label="Name" className='mb-3 inp'>
            <Form.Control type="text" placeholder="name" onChange={e => setUserinput({ ...userInput, firstName: e.target.value })} style={{ backgroundColor: 'black', borderTop: '0px', borderBottom: '2px solid white', borderLeft: '0px', borderRight: '0px', textAlign: 'center', borderRadius: '0px', color: 'white' }} />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingInput"
            label="Email"
            className="mb-3 inp "
          >
            <Form.Control type="email" placeholder="Enter Email" onChange={e => setUserinput({ ...userInput, email: e.target.value })} style={{ backgroundColor: 'black', borderTop: '0px', borderBottom: '2px solid white', borderLeft: '0px', borderRight: '0px', textAlign: 'center', borderRadius: '0px', color: 'white' }} />
          </FloatingLabel>

          <FloatingLabel controlId="floatingUsername" label="Username" onChange={e => setUserinput({ ...userInput, username: e.target.value })} className='mb-2 inp'>
            <Form.Control type="text" placeholder="Username" value={userInput.username} style={{ backgroundColor: 'black', borderTop: '0px', borderBottom: '2px solid white', borderLeft: '0px', borderRight: '0px', textAlign: 'center', borderRadius: '0px', color: 'white' }} />
          </FloatingLabel>
          <FloatingLabel controlId="floatingPassword" label="Password" className='mb-2 inp'>
            <Form.Control type="password" value={userInput.password} placeholder="Password" onChange={e => setUserinput({ ...userInput, password: e.target.value })} style={{ backgroundColor: 'black', borderTop: '0px', borderBottom: '2px solid white', borderLeft: '0px', borderRight: '0px', textAlign: 'center', borderRadius: '0px', color: 'white' }} />
          </FloatingLabel>

          <button className="btn btn-primary mt-5" onClick={handleRegister} style={{ width: '40%' }}>Register</button>

          {/* <GoogleLogin size='40px'

            onSuccess={credentialResponse => {
              const credentialResponseDecoded = jwtDecode(credentialResponse.credential);
              console.log(credentialResponseDecoded);
              sessionStorage.setItem("userNameG", credentialResponseDecoded.name);
              const uname=sessionStorage.getItem("userNameG")
              setUserinput([...userInput, { username: uname }]);
              setTimeout(() => {
                navigate('/')
              }, 2000)
              toast.success("Login Success")
            }}
            onError={() => {
              console.log('Login Failed');
            }}
          /> */}

          <p className='text-light mt-2'>Already have an account <Link to={'/login'}><span className="text-primary">Login</span></Link></p>
        </div>
        <ToastContainer position='top-center' theme='colored' autoClose={3000} />
      </div>
    </>
  )
}

export default Auth