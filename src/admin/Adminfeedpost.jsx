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
import { Button, Dropdown, Nav } from 'react-bootstrap';
import { addCommentAPI, addadminFavPostAPI, addFlagPostAPI, addFlagcommentAPI, dltfavAPI, dltlikeAPI, editCommentAPI, getHomePostsAPI, getPostCommentsAPI, getUsernamesAPI, ladminAPI, manageadminlikeAPI, removePostAPI, removecommentAPI, removefavAPI, addMarkAPI } from '../../services/allAPI';
import { SERVER_URL } from '../../services/serverURL';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import userimg from '../assets/user.png';
import { Link, useNavigate } from 'react-router-dom';
import { addCommentResponseContext, addResponseContext, commentdeleteContext, favremoveContext, friendResponseContext, likecountResponseContext, likeremoveContext, postremoveResponseContext } from '../Context/ContextAPI';


function Adminfeedpost({ post }) {
  const { addCommentResponse, setAddCommentResponse } = useContext(addCommentResponseContext)
  const navigate = useNavigate();
  const [lgShow, setLgShow] = useState(false);
  const [selectedPost, setSelectedPost] = useState("");
  const [posts, setPosts] = useState("");
  const [users, setUsers] = useState({});
  const [userInput, setUserInput] = useState({
    comment: "",
  });
  const [comments, setComments] = useState([]);
  const { poststatusResponse, setPostStatusResponse } = useContext(postremoveResponseContext)
  const { addResponse, setAddResponse } = useContext(addResponseContext)
  const { commentdlt, SetCommentdlt } = useContext(commentdeleteContext)
  const [currentuser,setcurrentUser]=useState('')
  const { likecountResponse, setLikecountResponse } = useContext(likecountResponseContext)
  const {likeremove,setLikeremove}=useContext(likeremoveContext)
  const {favremove,setFavremove} = useContext(favremoveContext)
  const [handleFriend, setHandleFriend] = useState([]);
  const {friendResponse, setFriendResponse}=useContext(friendResponseContext)
  const [isFriend, setIsFriend] = useState(false);



  const managelike = async (post) => {
    console.log(post);
    const postId = post._id
    const token = sessionStorage.getItem("token");
    if (token) {
      
    }
    try {
      const reqHeader = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      };
      const result=await manageadminlikeAPI({postId},reqHeader)
      console.log(result);
      if (result.status === 200) {
        setLikecountResponse(result.data)
        // alert("like success")
      } else {
        console.log(result);
        alert("Network failure!!!!")
      }
    } catch (err) {
      console.log(err);
    }
  }

  const dltike = async (post) => {
    console.log(post);
    const postId = post._id
    const token = sessionStorage.getItem("token");
    try {
      const reqHeader = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      };
      const result=await dltlikeAPI({postId},reqHeader)
      console.log(result);
      if (result.status === 200) {
        setLikeremove(result.data)
        // alert("like removed")
      } else {
        console.log(result);
        // alert("Network failure!!!!")
      }
    } catch (err) {
      console.log(err);
    }
  }
  const handledltfav=async(post)=>{
    const postId=post._id
    const token = sessionStorage.getItem("token");
    try {
      const reqHeader = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      };
      const result=await dltfavAPI({postId},reqHeader)
      console.log(result);
      if (result.status === 200) {
        setFavremove(result.data)
       
      } else {
        console.log(result);
        // alert("Network failure!!!!")
      }
    } catch (err) {
      console.log(err);
    }
  }
const toggleIcon = async (userId) => {
    const token = sessionStorage.getItem('token');
    const reqHeader = {
      Authorization: `Bearer ${token}`
    };
    
    try {
      const result = await addMarkAPI(userId, reqHeader);
       setFriendResponse(result.data)
      if (result.status === 200) {
              
        setIsFriend(result.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {

    getHomePosts();
  }, [poststatusResponse, commentdlt,likecountResponse,addResponse,likeremove,favremove,isFriend]);
  async function getHomePosts() {
    try {
      const result = await getHomePostsAPI();
      setPosts(result.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(()=>{
    loggedinUser()
  },[])

  async function loggedinUser() {
    console.log('Inside logged in user details');
    const token = sessionStorage.getItem("token");
    if (token) {
      const reqHeader = {
        "Authorization": `Bearer ${token}`,
      };
      try {
        const result = await ladminAPI(reqHeader)
        console.log(result.data);
        setcurrentUser(result.data)
        

      } catch (error) {
        console.log(err);
      }
    }
  }
  
console.log(currentuser);
const luserId=currentuser._id
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
          // console.log(result);
          if (result.status === 200) {
            setComments(result.data);
            setAddCommentResponse(result.data)
          }
        } catch (err) {
          console.log("y", err);

        }
      }
      fetchComments();
    }
  }, [lgShow, addCommentResponse]);

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
        const result = await addFlagPostAPI(post._id, post.caption, { userId }, reqHeader);
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
  const lusername = JSON.parse(sessionStorage.getItem('username'))
  // console.log(lusername);
  //like part
  // const [like, setLike] = useState(0);
  // const [liked, setLiked] = useState(false);

  // const handlelike = () => {
  //   setLiked((prevLiked) => !prevLiked);
  //   setLike((prevLike) => (liked ? prevLike - 1 : prevLike + 1));
  // };

  //success

 
useEffect(()=>{

},[currentuser])
  const handlereportcomment = async (cmt) => {
    const token = sessionStorage.getItem("token");
    const posterId = cmt.userId;
    const postId = cmt.postId
    const commentId = cmt._id
    console.log(posterId);
    console.log(postId);
    console.log(commentId);


    if (token) {
      const reqHeader = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      };

      try {
        const result = await addFlagcommentAPI(postId, commentId, { posterId }, reqHeader);
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

  //success -dlt comment
  const handleremovecomment = async (cmt) => {
    const token = sessionStorage.getItem("token")
    console.log(cmt);
    if (token) {
      const reqHeader = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
      try {

        const result = await removecommentAPI(cmt, reqHeader)
        console.log(result);
        if (result.status == 200) {
          SetCommentdlt(result.data)
          // toast.success('Comment removed Successfully!!!')
        } else {
          console.log(result)
        }
      } catch (err) {
        console.log(err);
      }

    }
  }

  //success fav post(working duplicate)
  const handlefavPost = async (post) => {
    console.log(post);
    const poster = post.username
    const postId = post._id
    const postCaption = post.caption
    const postImage = post.image
    const token = sessionStorage.getItem("token");
    if (token) {
      const reqHeader = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      };

      try {
        const result = await addadminFavPostAPI({ poster, postId, postCaption, postImage }, reqHeader);
        console.log(result);
        if (result.status == 200) {
          setPostStatusResponse(result.data);
          // toast.success('Added to Favourites')
          // alert('Added to Favourites')
        } else {
          console.log(result);
          // toast.error(`Post Already added to Favourites`)

        }
      } catch (err) {
        //  alert('Its not you but us getting this patched up....Try after sometime')
        console.log(err);


      }
    }
  };
    return (
      <>
        <div className='postbdy pt-5'>
        {posts?.length > 0 ?
          posts.sort((a, b) => b._id.localeCompare(a._id)).map(posted => (
            <Card key={posted._id} className='text-light mb-2 cardstyle' style={{ backgroundColor: 'black' }}>
              <CardHeader
                avatar={<Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">{posted.profileImage ? <img className='img-fluid' src={`${SERVER_URL}/uploads/${posted.profileImage}`} alt='' style={{ width: '100%', height: '100%' }} /> : <img src={userimg} alt='' className='mt-2' style={{}} />}</Avatar>}
                action={<Dropdown >
                  <Dropdown.Toggle variant="dark" id="dropdown-basic" >
                    <i className="fa-solid fa-ellipsis-vertical" style={{ color: "#ffffff" }}></i>
                  </Dropdown.Toggle>
                  <Dropdown.Menu className='bg-dark'>
                  <Dropdown.Item onClick={() => handlereportPost(posted)} className='text-light'><span className='p-3 p1' style={{
                        height: '100%'
                      }}><i className="fa-regular fa-flag"></i>  Report Post</span></Dropdown.Item>
                  <Dropdown.Item onClick={() => handleremovePost(posted._id)} className='text-light'><span className='p-3 p1 w-100' style={{
                        height: '100%'
                      }}><i className="fa-regular fa-trash-can"></i> Delete Post</span> </Dropdown.Item><Dropdown.Item onClick={() => toggleIcon(posted.userId)} className='text-light'><span className='p-3 p1' style={{
                        height: '100%'
                      }}><i className="fa-solid fa-lock"></i>  Mark Suspecious</span></Dropdown.Item>

                    
                  </Dropdown.Menu>
                </Dropdown>}
                title={posted.username}
                subheader="Paris"
              />

              <CardMedia
                component="img"
                width="100%"
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
              {posted.likes.length>0? <p className="text-light fw-bolder ps-3">{posted.likes.length} &nbsp; Like</p> : ""}
              <CardActions style={{ width: '100%' }}>
                <div className="d-flex justify-content-between w-100">

                  <div className="d-flex justify-content-evenly">
                    {posted.likes.some(like => like.lid === luserId)?(<i className={`fa-solid fa-heart text-danger fa-lg ic1 mt-2 likebtn `} onClick={() => dltike(posted)}></i>):(<i className={`fa-regular fa-heart fa-lg ic1 mt-2 likebtn`} onClick={() => managelike(posted)}></i>)}
                    <ChatBubbleOutlineOutlinedIcon className="ic1" onClick={() => handleModalOpen(posted)} />
                    {/* <SendIcon className="ic1 snd" /> */}
                  </div>
                  {/* <div className="d-flex justify-content-evenly">
                  {posted.fav.some(fav => fav.fid === luserId)?(<i className={`fa-solid fa-bookmark fa-lg `} onClick={() => handledltfav(posted)}></i>):(<i className={`fa-regular fa-bookmark fa-lg bk`} onClick={() => handlefavPost(posted)}></i>)}
                    
                  </div> */}
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
          <Modal.Body className='mdlbdy' style={{ backgroundColor: 'black'}}>
            {selectedPost && (
              <div className="row modallength" >
                <div className="col-lg-6 imgmodal">
                  <img src={`${SERVER_URL}/uploads/${selectedPost.image}`} style={{ width: '100%', height: '600px' }} className='img-fluid mt-2' />
                </div>
                <div className="col-lg-6 text-light">
                  <div className='w-100 d-flex mt-4'>
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                      {selectedPost.profileImage ? <img className='img-fluid' src={`${SERVER_URL}/uploads/${selectedPost.profileImage}`} alt='' style={{ width: '100%', height: '100%' }} /> : <img src={userimg} alt='' className='mt-2' style={{}} />}
                    </Avatar>
                    <b className='mt-2 ms-2'>{selectedPost.username} </b><span className='text-light mt-2 ms-2'>
                      {selectedPost.caption}
                    </span>
                  </div>
                  <hr />
                  <div className='fullcomment'>
                    {comments.length > 0 ?
                      comments.map((comment, index) => (
                        <div className="d-flex justify-content-between align-items-start w-100">
                          <div className="comments mt-4" key={index}>
                            {comment?.profileImage?<img src={`${SERVER_URL}/uploads/${comment.profileImage}`} alt='' style={{ width: '40px',height:'40px',borderRadius:'50%' }} />:<img src={userimg} alt='' style={{ width: '40px' }} />} <span className="text-light fw-bolder">{comment.username} <span className="text-light fw-normal ms-2">{comment.comment} </span></span>
                          </div>
                          <Dropdown className='mt-4'>
                            <Dropdown.Toggle className='btn-dark'><i className="fa-solid fa-ellipsis-vertical "></i></Dropdown.Toggle><Dropdown.Menu className='bg-dark text-light'>
                              {lusername != comment.username ?
                                <Dropdown.Item className='text-light' onClick={() => handlereportcomment(comment)}><span className='p-3 p1' style={{
                                  height: '100%'
                                }}><i class="fa-regular fa-flag" aria-hidden="true"></i> Report Comment</span></Dropdown.Item> :
                                <Dropdown.Item onClick={() => handleremovecomment(comment._id)} className='text-light'> <span className='p-3 p1' style={{
                                  height: '100%'
                                }} ><i className="fa-regular fa-trash-can"></i> Delete Comment </span></Dropdown.Item>
                              }
                              {/* <Dropdown.Item className='text-light' onClick={()=>handleeditcomment(comment)}><span className='p-3 p1' style={{
                      height:'100%'
                    }}> <i className="fa-solid fa-pen"></i> Edit Comment </span></Dropdown.Item> */}
                            </Dropdown.Menu>
                          </Dropdown>
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
        
        <ToastContainer position='top-center' theme='colored' autoClose={2000} />
      </div>
      </>
    );
  }

export default Adminfeedpost