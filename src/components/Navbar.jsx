import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { addPostAPI } from '../../services/allAPI';
import uploadpic from '../assets/preview.png'
import { addResponseContext, likecountResponseContext } from '../Context/ContextAPI';
import { useContext } from 'react';

function Navbar(props) {
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
  return (
    <>
    <div className="w-100 d-flex justify-content-between p-3">
      
        <Link to={'/'} className='text-light' style={{textDecoration:'none'}}><h4 className="title">Snapgram</h4></Link>
        <div className='d-flex justify-content-evenly w-25'>
        <Link className='text-light'><i  onClick={() => setModalShow(true)} className="fa-regular fa-square-plus "></i></Link>
          <Link to={'/saved'} className='text-light'><i className="fa-solid fa-bookmark"></i></Link>
          <Link to={'/chatres'} className='text-light'><i className="fa-regular fa-comment"></i></Link>
        </div>

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
    </>
  )
}

export default Navbar