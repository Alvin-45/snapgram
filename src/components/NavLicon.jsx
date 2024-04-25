import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Modal from 'react-bootstrap/Modal';
import { addResponseContext } from '../Context/ContextAPI';
import { useContext } from 'react';
import { addPostAPI } from '../../services/allAPI';
import 'react-toastify/dist/ReactToastify.css';
import uploadpic from '../assets/preview.png'
import logo from "../assets/instalogo.png"

function NavLicon(props) {
    const [modalShow, setModalShow] = React.useState(false);
    const navigate = useNavigate();
  
    const handleLogout = () => {
      sessionStorage.clear();
      toast.success('Logout Successful!!');
      navigate('/login');
    };
    const handleModalClose=()=>{
      setModalShow(false)
      setPreview("")
    }
    const {addResponse,setAddResponse}=useContext(addResponseContext)
    const [preview ,setPreview]=useState("")
  const [imageFileStatus , setImageFileStatus] = useState(false)
  const [postDetails,setPostDetails]=useState({
    image:"",caption:""
  })
  const handleClose = () => {setModalShow(false);
    setPostDetails({ image:"",caption:""})
  }
  
  
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
  
  const handleuploadPost = async ()=>{
    const {image,caption}=postDetails
    if(!image && !caption){
      toast.warning("Please fill the form completely!!!")
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
    return (
      <>
        <div className='navleft d-flex flex-column' style={{ height: '100vh', zIndex: '99999999' }}>
          <img src={logo} alt="" style={{width:'100%'}}/>
          <Link to={'/'} className='li2'><span><i className="fa-solid fa-house nav1"></i> </span></Link>
          <Link className='li2' to={'/search'}><span><i className="fa-solid fa-magnifying-glass nav1"></i> </span></Link>
          <Link to={'/messages'} className='li2'><span><i className="fa-regular fa-comment nav1"></i> </span></Link>
          <Link to={'/friends'} className='li2'><span><i className="fa-solid fa-user-group nav1"></i> </span></Link>
          <span className='li2' onClick={() => setModalShow(true)}><i className="fa-solid fa-square-plus nav1"></i></span>
  
          <div className='d-flex justify-content-start flex-column btm2'>
            <Link to={'/profile'} className='li2'><span><i className="fa-regular fa-circle-user nav1"></i></span></Link>
            <span className='text-danger logot' onClick={handleLogout}><i className="fa-solid fa-right-from-bracket nav1 li3"></i></span>
          </div>
          <ToastContainer position='top-center' theme='colored' autoClose={3000} />
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
                <textarea name="" className='bg-dark text-light' style={{border:'0px solid',color:'white'}} placeholder='Enter Caption here....' id="" cols="45" rows="12" onChange={e=>setPostDetails({...postDetails,caption:e.target.value})}></textarea>
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
    );
}

export default NavLicon