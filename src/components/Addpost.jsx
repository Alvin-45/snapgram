import React from 'react'
import AddToPhotosOutlinedIcon from '@mui/icons-material/AddToPhotosOutlined';
import SendIcon from '@mui/icons-material/Send';

function Addpost() {
  return (
    <>
    <div className=" box-shadow box d-flex justify-content-around flex-column" >
        <input type="text" className=' text-light box addp1'placeholder='Type Here...' style={{width:'80%',height:'150px'}}/>
        <div className="bg-light d-flex justify-content-around  box2 addp2"  style={{width:'80%',marginTop:'-45px'}}>
          <div style={{background:'white'}}><i className="fa-regular fa-images" style={{color:'green',background:'white'}}></i><span  style={{background:'white',color:'black'}}> Photos</span></div>
          <div style={{background:'white'}}><i className="fa-solid fa-film" style={{color:'red',background:'white'}}></i><span  style={{background:'white',color:'black'}}> Videos</span></div>
          <div style={{background:'white'}}><i class="fa-solid fa-paperclip" style={{color:'black',background:'white'}}></i><span  style={{background:'white',color:'black'}}> Attachment</span></div>
          <button className="btn btn-primary"><i class="fa-regular fa-paper-plane bg-primary"></i><span className='bg-primary'> Post</span></button>
        </div>
    </div>
    </>
  )
}

export default Addpost