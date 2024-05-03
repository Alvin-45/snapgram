import React, { useContext, useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import BookmarkOutlinedIcon from '@mui/icons-material/BookmarkOutlined';
import Modal from 'react-bootstrap/Modal';
import { Button, Dropdown } from 'react-bootstrap';
import { addCommentAPI, addFlagPostAPI, getHomePostsAPI, getPostCommentsAPI, getUsernamesAPI, removePostAPI } from '../../services/allAPI';
import { SERVER_URL } from '../../services/serverURL';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import userimg from '../assets/user.png';
import { useNavigate } from 'react-router-dom';
import { addResponseContext, likecountResponseContext, postremoveResponseContext } from '../Context/ContextAPI';

function Adminfeedpost({ post }) {
    const navigate = useNavigate();
    const [lgShow, setLgShow] = useState(false);
    const [selectedPost, setSelectedPost] = useState("");
    const [posts, setPosts] = useState("");
    const [users, setUsers] = useState({});
    const [userInput, setUserInput] = useState({
      comment: "",
    });
    const [comments, setComments] = useState([]);
    const {poststatusResponse, setPostStatusResponse}=useContext(postremoveResponseContext)
    const {addResponse,setAddResponse}=useContext(addResponseContext)
    useEffect(() => {
      
      getHomePosts();
    }, [poststatusResponse]);
    async function getHomePosts() {
        try {
          const result = await getHomePostsAPI();
          setPosts(result.data);
        } catch (err) {
          console.log(err);
        }
      }
    //remove post part
    const handleremovePost = async (postId) => {
      const token = sessionStorage.getItem("token") 
      console.log(postId);
      if (token) {
        const reqHeader = {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
        try {
         
          const result = await removePostAPI(postId, reqHeader)
          console.log(result);
          if (result.status == 200) {
            setPostStatusResponse(result.status)
          } else {
            console.log(result)
          }
        } catch (err) {
          console.log(err);
        }
  
      }
    }
  
    useEffect(() => {
      if (lgShow) {
        async function fetchComments() {
          const token = sessionStorage.getItem("token");
          const reqHeader = {
            "Authorization": `Bearer ${token}`
          };
          try {
            const result = await getPostCommentsAPI(selectedPost._id, reqHeader);
            console.log(result);
            if (result.status === 200) {
              setComments(result.data);
            }
          } catch (err) {
            console.log("y", err);
  
          }
        }
        fetchComments();
      }
    }, [lgShow,addResponse]);
  
    const handleModalOpen = (posted) => {
      setSelectedPost(posted);
      setLgShow(true);
    };
  
   
    const handlereportPost = async (post) => {
      const token = sessionStorage.getItem("token");
      const userId = post.userId; 
      console.log(userId);
      if (token) {
        const reqHeader = {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        };
    
        try {
          const result = await addFlagPostAPI(post._id,post.caption,{userId}, reqHeader);
          console.log(result);
          if (result.status === 200) {
            setPostStatusResponse(result.status);
            toast.success('Report Sumbitted Successfully! Waiting for admin to analyse it....')
            // alert('Report Sumbitted Successfully! Waiting for admin to analyse it....')
          } else {
            console.log(result);
            toast.error('Its not you but us getting this patched up....Try after sometime')
  
          }
        } catch (err) {
        //  alert('Its not you but us getting this patched up....Try after sometime')
          console.log(err);
        }
      }
    };
    
    
  
    const handleComment = async (e) => {
      e.preventDefault();
      const { comment } = userInput;
      if (!comment) {
        toast.warning("Please fill the form completely!!!");
      } else {
        const reqBody = { comment };
        const token = sessionStorage.getItem("token");
        if (token && selectedPost?._id) {
          const reqHeader = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          };
          try {
            const result = await addCommentAPI(selectedPost._id, reqBody, reqHeader);
            if (result.status === 200) {
              setUserInput({ comment: "" });
              // toast.success("Comment uploaded successfully!");
              setComments([...comments, { username: result.data.username, comment: result.data.comment }]);
            } else {
              toast.warning(result.response.data);
            }
          } catch (err) {
            console.log(err);
          }
        }
      }
    };
    const lusername=JSON.parse(sessionStorage.getItem('username')) 
    console.log(lusername);
    //like part
    const [like, setLike] = useState(0);
    const [liked, setLiked] = useState(false);
    const { likecountResponse, setLikecountResponse } = useContext(likecountResponseContext)
    const handlelike = () => {
      setLiked((prevLiked) => !prevLiked);
      setLike((prevLike) => (liked ? prevLike - 1 : prevLike + 1));
    };
    return (
      <>
        <div className='postbdy'>
          {posts?.length > 0 ?
            posts?.map(posted => (
              <Card key={posted._id} sx={{ width: '80%', paddingBottom: '40px' }} className='text-light mt-5' style={{ backgroundColor: 'black' }}>
                <CardHeader
                  avatar={<Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">A</Avatar>}
                  action={<Dropdown >
                    <Dropdown.Toggle variant="dark" id="dropdown-basic" >
                      <i className="fa-solid fa-ellipsis-vertical" style={{ color: "#ffffff" }}></i>
                    </Dropdown.Toggle><Dropdown.Menu>
                      {/* {lusername==posted.username?<Dropdown.Item onClick={()=>handleremovePost(posted._id)} >Delete Post</Dropdown.Item>:<Dropdown.Item onClick={()=>handlereportPost(posted)} >Report Post</Dropdown.Item>} */}
                      <Dropdown.Item onClick={()=>handleremovePost(posted._id)} >Delete Post</Dropdown.Item>
  
                    </Dropdown.Menu>
                  </Dropdown>}
                  title={posted.username}
                  subheader="Paris"
                />
  
                <CardMedia
                  component="img"
                  width="600"
                  className='pic img-fluid'
                  height="694"
                  image={`${SERVER_URL}/uploads/${posted.image}`}
                />
                <CardContent>
                  <Typography variant="body2" className='text-light'>
                    <b>{posted.username} </b>
                    {posted.caption}
                  </Typography>
                  
                </CardContent>
                {like>0?<p className="text-light fw-bolder ps-3">{like} Like</p>:""}
                <CardActions style={{ width: '100%' }}>
                  <div className="d-flex justify-content-between w-100">
  
                    <div className="d-flex justify-content-evenly">
                      <i className={`fa-solid fa-heart fa-lg ic1 mt-2 likebtn ${liked ? 'active1' : ''}`} onClick={handlelike}></i>
                      <ChatBubbleOutlineOutlinedIcon className="ic1" onClick={() => handleModalOpen(posted)} />
                      {/* <SendIcon className="ic1 snd" /> */}
                    </div>
                    <div className="d-flex justify-content-evenly">
                      <BookmarkBorderOutlinedIcon className="bk" />
                      <BookmarkOutlinedIcon className="bk1 active" style={{ display: 'none' }} />
                    </div>
                  </div>
                </CardActions>
              </Card>
            )) :
            <div className="w-100 fw-bolder text-danger pt-5" style={{ backgroundColor: 'black', height: '120vh' }}>
              <h5 className='text-danger fw-bolder p-5 mt-5 ms-2'>No Post Uploaded!!!!</h5>
            </div>
          }
  
          <Modal
            size="xl"
            show={lgShow}
            onHide={() => setLgShow(false)}
            aria-labelledby="example-modal-sizes-title-lg"
          >
            <Modal.Body style={{ backgroundColor: 'black', height: '90vh', width: '100%', paddingTop: '15px' }}>
              {selectedPost && (
                <div className="row" style={{ height: '700px', width: '100%' }}>
                  <div className="col-lg-6">
                    <img src={`${SERVER_URL}/uploads/${selectedPost.image}`} style={{ width: '100%', height: '600px' }} className='img-fluid mt-2' />
                  </div>
                  <div className="col-lg-6 text-light">
                    <div className='w-100 d-flex mt-4'>
                      <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        A
                      </Avatar>
                      <b className='mt-2 ms-2'>{selectedPost.username} </b><span className='text-light mt-2 ms-2'>
                        {selectedPost.caption}
                      </span>
                    </div>
                    <hr />
                    <div className='fullcomment' style={{ height: '450px' }}>
                      {comments.length > 0 ?
                        comments.map((comment, index) => (
                          <div className="comments mt-4" key={index}>
                            <img src={userimg} alt='' style={{ width: '40px' }} /> <span className="text-light fw-bolder">{comment.username} <span className="text-light fw-normal ms-2">{comment.comment} </span></span>
                          </div>
                        )) :
                        <div className="comments mt-4">
                          No comments yet.
                        </div>}
                    </div>
                    <div className="comments d-flex justify-content-bottom">
                      <input type="text" className="bg-dark w-100 mt-3 cmt rounded text-light cmt1" placeholder='Add comment' value={userInput.comment} onChange={e => setUserInput({ ...userInput, comment: e.target.value })} />
                      <span className="fw-bolder text-primary mt-3 post" onClick={handleComment}>Post</span>
                    </div>
                  </div>
                </div>
              )}
            </Modal.Body>
          </Modal>
          <ToastContainer position='top-center' theme='colored' autoClose={3000} />
        </div>
      </>
    );
  }

export default Adminfeedpost