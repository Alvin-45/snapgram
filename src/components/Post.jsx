import React, { useState } from 'react'
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { blue, orange, purple, red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import SendIcon from '@mui/icons-material/Send';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import BookmarkOutlinedIcon from '@mui/icons-material/BookmarkOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';


function Post() {
  const [smShow, setSmShow] = useState(false);
  const [lgShow, setLgShow] = useState(false);

  return (
    <>
    <div className='postbdy'>
      <Card sx={{ width: '80%',maxHeight:980,paddingBottom:'40px' }}  className='text-light mt-5' style={{ backgroundColor: 'black'}}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              A
            </Avatar>
          }
          action={
          //   <IconButton aria-label="settings"  className='text-light' style={{color:'white'}}>
              <MoreVertIcon />
          //   </IconButton>
          }
          title="Alax"
          subheader="Paris"
        />
        <CardMedia
          component="img"
          width="600"
          className='pic'
          height="694"
          image="https://images.pexels.com/photos/1402787/pexels-photo-1402787.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="Paella dish"
        />
        <CardContent>
          <Typography variant="body2" className='text-light'>
              <b>Alax </b>  
            This impressive paella is a perfect party dish and a fun meal to cook
            together with your guests. Add 1 cup of frozen peas along with the mussels,
            if you like.
          </Typography>
        </CardContent>
        <CardActions style={{width:'100%'}}>
          <div className='d-flex justify-content-between w-100'>
              <div className='d-flex justify-content-evenly'>
                  <FavoriteBorderOutlinedIcon className='ic1'/>
                  {/* <IconButton color="primary" aria-label="add to favorites">
                    
                  </IconButton> */}
                  <i className="fa-regular fa-comment fa-lg cmt1 ic1" onClick={() => setLgShow(true)}></i>
                  <SendIcon  className='ic1 snd' />
                  
              </div>
              <div className='d-flex justify-content-evenly'>
                  <BookmarkBorderOutlinedIcon className="bk"/>
                  <BookmarkOutlinedIcon  className="bk1 active" style={{display:'none'}}/>
              </div>
          </div>
          {/* <IconButton aria-label="share">
            
          </IconButton> */}
          
        </CardActions>
      </Card>
      <div className='' style={{width:'100%',paddingBottom:'50px' }}>
        <input type="text" className='cmt p-3 me-3 bg-dark' placeholder='Add Comment...' style={{width:'75%',height:'35px'}}/> <span className='text-primary fw-bolder post'>Post</span>
        
        </div>
      <Card sx={{ width: '80%',maxHeight:980,paddingBottom:'50px' }}  className='text-light mt-5' style={{ backgroundColor: 'black'}}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: blue[500] }} aria-label="recipe">
              R
            </Avatar>
          }
          action={
            
              <MoreVertIcon />
           
          }
          title="Ram"
          subheader="Paris"
        />
        <CardMedia
          component="img"
          width="600"
          className='pic'
          height="694"
          image="https://images.pexels.com/photos/1213447/pexels-photo-1213447.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="Paella dish"
        />
        <CardContent>
          <Typography variant="body2" className='text-light'>
              <b>Ram </b>  
            This impressive paella is a perfect party dish and a fun meal to cook
            together with your guests. Add 1 cup of frozen peas along with the mussels,
            if you like.
          </Typography>
        </CardContent>
        <CardActions style={{width:'100%'}}>
          <div className='d-flex justify-content-between w-100'>
              <div className='d-flex justify-content-evenly'>
                  <FavoriteBorderOutlinedIcon className='ic1'/>
                  {/* <IconButton color="primary" aria-label="add to favorites">
                    
                  </IconButton> */}
                  <ChatBubbleOutlineOutlinedIcon  className='ic1' />
                  <SendIcon  className='ic1 snd' />
                  
              </div>
              <div className='d-flex justify-content-evenly'>
                  <BookmarkBorderOutlinedIcon className="bk"/>
                  <BookmarkOutlinedIcon  className="bk1 active" style={{display:'none'}}/>
              </div>
          </div>
          {/* <IconButton aria-label="share">
            
          </IconButton> */}
          
        </CardActions>
      </Card>
      <div className='' style={{width:'100%',paddingBottom:'50px' }}>
        <input type="text" className='cmt p-3 me-3 bg-dark' placeholder='Add Comment...' style={{width:'75%',height:'35px'}}/> <span className='text-primary fw-bolder post'>Post</span>
        
        </div>
      
        <Modal
        size="xl"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        {/* <Modal.Header closeButton style={{color:'white'}}>
         
        </Modal.Header> */}
        <Modal.Body style={{backgroundColor: 'black',height:'90vh',width:'100%',paddingTop:'50px'}}><div className="row" style={{height:'700px',width:'100%'}}>
            <div className="col-lg-6">
              <img src="https://images.pexels.com/photos/1402787/pexels-photo-1402787.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" style={{width:'100%',height:'850px'}} />
            </div>
            <div className="col-lg-6 text-light">
            <div className='w-100 d-flex mt-4'>
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                A
              </Avatar><b className='mt-2 ms-2'>Alax </b>
            </div>  
            <hr />
            <span>
              This impressive paella is a perfect party dish and a fun meal to cook
              together with your guests. Add 1 cup of frozen peas along with the mussels,
              if you like.
            </span>
            <div className="comments mt-4">
            <div className='w-100 d-flex mb-3'>
              <Avatar sx={{ bgcolor: purple[500] }} aria-label="recipe">
                R
              </Avatar><span className='mt-2 ms-2'><b className='me-3'>Rajeev </b> Nice..</span>
            </div> 
            <div className='w-100 d-flex mb-3'>
              <Avatar sx={{ bgcolor: orange[500] }} aria-label="recipe">
                A
              </Avatar><span className='mt-2 ms-2'><b className='me-3'>Amal </b> Beauty..</span>
            </div>
            <div className='w-100 d-flex mb-3'>
              <Avatar sx={{ bgcolor: purple[500] }} aria-label="recipe">
                V
              </Avatar><span className='mt-2 ms-2'><b className='me-3'>Vinneth </b> Wow..</span>
            </div>
            
            </div>
            
            </div>
            
          </div></Modal.Body>
      </Modal>
        </div>

    
    </>
  )
}

export default Post