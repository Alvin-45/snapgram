import React, { useEffect, useState } from 'react'
import { Modal, Nav } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { addPostAPI } from '../../services/allAPI';
import uploadpic from '../assets/preview.png'
import { addResponseContext, likecountResponseContext } from '../Context/ContextAPI';
import { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { ToastContainer, toast } from 'react-toastify';

function AdminNavbar(props) {
    const navigate=useNavigate()
    const [modalShow, setModalShow] = React.useState(false);
  const [preview ,setPreview]=useState("")
  const [postDetails,setPostDetails]=useState({
    image:"",caption:""
  })
  const [imageFileStatus , setImageFileStatus] = useState(false)
  const {addResponse,setAddResponse}=useContext(addResponseContext)

  useEffect(()=>{
    if(postDetails.image.type=="image/png" || postDetails.image.type=="image/jpg" || postDetails.image.type=="image/jpeg"|| postDetails.image.type=="image/avif"|| postDetails.image.type=="video/mp4"|| postDetails.image.type=="image/webp"){
        setImageFileStatus(true)
        setPreview(URL.createObjectURL(postDetails.image))
    }else{
      setPreview(uploadpic)
        setImageFileStatus(false)
        setPostDetails({...postDetails,image:""})
    }
  
  },[postDetails.image,modalShow])
  const handleModalClose=()=>{
    setModalShow(false)
    setPreview("")
  }
  const handleClose = () => {setModalShow(false);
    setPostDetails({ image:"",caption:""})
  }
  const handleuploadPost = async ()=>{
    const {image,caption}=postDetails
    if(!image || !caption){
      toast.warning("Don't be like that...Share a line on the post.Everyone is eager to know about your view!!!")
    }else{
  
      const reqBody = new FormData()
      reqBody.append("image",image)
      reqBody.append("caption",caption)
  
      const token = sessionStorage.getItem("token")
      if(token){
        const reqHeader ={
          "Content-Type" : "multipart/form-data",
          "Authorization" : `Bearer ${token}`
        }
        //api call
        try{
          const result = await addPostAPI(reqBody,reqHeader)
          console.log(result);
          if (result.status==200) {
            setAddResponse(result)  //new change
           
            handleClose()
          }else{
            toast.warning(result.response.data)
          }
        }catch(err){
          console.log(err);
        }
  
      }
    }
  }
  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/adminlogin');
  };
  return (
    <>
    <div className='navadmin'>
      {['sm'].map((expand) => (
          <Navbar key={expand} expand={expand} className=" text-light" style={{backgroundColor:'black'}}>
            <Container fluid>
              <Navbar.Brand><Link to={'/admindashboard'}  className=' text-light title' style={{textDecoration:'none'}}>Snapgram-Admin</Link></Navbar.Brand>
              <Navbar.Toggle className=' toogle' style={{color:'white'}} aria-controls={`offcanvasNavbar-expand-${expand}`} />
              <Navbar.Offcanvas  className='text-light w-50'
                id={`offcanvasNavbar-expand-${expand}`}
                aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                placement="end"
              >
                <Offcanvas.Header closeButton  className='text-light bg-dark ' style={{color:'white'}}>
                  <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                    ADMIN PANEL
                  </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className='text-light bg-dark'>
                  <Nav className="justify-content-end flex-grow-1 pe-3 ">
                  <Link to={'/admindashboard'}  className=' text-light' style={{textDecoration:'none'}}>Dashboard</Link>
                  <Link to={'/adminfeed'}  className=' text-light' style={{textDecoration:'none'}}>Feed</Link>
                  <Link to={'/adminsearch'}  className=' text-light' style={{textDecoration:'none'}}>Search</Link>
                  {/* <Link  onClick={() => setModalShow(true)}  className=' text-light' style={{textDecoration:'none'}}>Add Post</Link>
                  <Link to={'/adminprofile'}  className=' text-light' style={{textDecoration:'none'}}>User Profile</Link> */}
                  <h5  onClick={handleLogout}  className=' text-danger' style={{textDecoration:'none'}}>LogOut</h5>
                    
                  </Nav>
                  
                </Offcanvas.Body>
              </Navbar.Offcanvas>
            </Container>
          </Navbar>
        ))}
    </div>

  
  <Modal
      {...props}
      show={modalShow}
      onHide={handleModalClose}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      
    >
      <Modal.Header closeButton className='bg-dark text-light' style={{color:'white'}}>
        <Modal.Title id="contained-modal-title-vcenter">
          Add Post
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className='bg-dark text-light'>
        <div className="row">
          <div className="col-lg-6">
            <label>
              <input type="file"  style={{display:"none"}} onChange={e=>setPostDetails({...postDetails,image:e.target.files[0]})} />
            <img className='img-fluid' src={preview} alt="" style={{width:'100%'}} />
            </label>
          </div>
          <div className="col-lg-6">
            <textarea name="" className='bg-dark text-light captionarea' style={{border:'0px solid',color:'white'}} placeholder='Enter Caption here....' id="" cols="45" rows="12" onChange={e=>setPostDetails({...postDetails,caption:e.target.value})}></textarea>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className='bg-dark'>
        {/* Add any footer content here */}
        <button className="btn btn-primary" onClick={handleuploadPost}><i class="fa-regular fa-paper-plane bg-primary"></i><span className='bg-primary'> Post</span></button>
      </Modal.Footer>
    </Modal>
    <ToastContainer position='top-center' theme='colored' autoClose={3000} />

    </>
  )
}

export default AdminNavbar