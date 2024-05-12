import React, { useContext, useEffect, useState } from 'react';
import { Dropdown, Modal, Nav } from 'react-bootstrap';
import NavLeft from './NavLeft';
import userimg from '../assets/user.png';
import { addCommentAPI, editProfileAPI, frndcountAPI, getPostCommentsAPI, getUserPostsAPI, luserAPI, removePostAPI, removecommentAPI } from '../../services/allAPI';
import { addResponseContext, commentdeleteContext, editProfileContext, editResponseContext, postremoveResponseContext } from '../Context/ContextAPI';
import { SERVER_URL } from '../../services/serverURL';
import { Avatar } from '@mui/material';
import { orange, purple, red } from '@mui/material/colors';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';


function Profile(post) {
  const navigate=useNavigate()
  const { addResponse, setAddResponse } = useContext(addResponseContext)
  const { editResponse, setEditResponse } = useContext(editResponseContext)
  const [show, setShow] = useState(false);
  const [preview, setPreview] = useState("")
  const [fname, setFname] = useState('');
  const [postData, setPostData] = useState({
    id: post?._id, image: "", caption: post?.caption
  })
  const [comments, setComments] = useState([]);
  const {poststatusResponse, setPostStatusResponse}=useContext(postremoveResponseContext)
  const [currentuser,setcurrentUser]=useState('')
  const [lgShow, setLgShow] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [userInput, setUserInput] = useState({
    comment: "",
  });
  const [flwr,setflwr]=useState([])
  const {editprofile, SetEditProfile}=useContext(editProfileContext)
  const {commentdlt, SetCommentdlt}=useContext(commentdeleteContext)

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
          setLgShow(false)
          // toast.success('Post deleted Successfully')
        } else {
          console.log(result)
          toast.error('There has been a small problem....Try after sometime....')

        }
      } catch (err) {
        console.log(err);
      }

    }
  }

  const [luser, setlUser] = useState('')
  useEffect(() => {
    if (sessionStorage.getItem('existingUser')) {
      const { username, firstName } = JSON.parse(sessionStorage.getItem('existingUser'));
      setFname(firstName);
      if (postData.image) {
        setPreview(URL.createObjectURL(postData.image))
        console.log("setting preview");
        console.log(preview);
      } else {
        setPreview("")
      }
      getUserPosts()   
       

      // console.log("getting user post");

    } else {
      setFname('');
    }
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
          }
        } catch (err) {
          console.log("y", err);

        }
      }
      fetchComments();
      
    }

  }, [postData.image, addResponse, lgShow,editResponse,poststatusResponse]);

  useEffect(()=>{
    frndcount()
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
        const result = await luserAPI(reqHeader)
        console.log(result);
        setcurrentUser(result.data)
        console.log(currentuser);

      } catch (error) {
        console.log(err);
      }
    }
  }
  const getUserPosts = async () => {
    const token = sessionStorage.getItem("token")
    const reqHeader = {
      "Authorization": `Bearer ${token}`
    }
    try {
      const result = await getUserPostsAPI(reqHeader)
      // console.log(result);
      if (result.status == 200) {
        setPostData(result.data)
        // console.log(postData);
      }
    } catch (err) {
      console.log(err);
    }
  }
  const handleModalOpen = (post) => {
    setSelectedPost(post);
    setLgShow(true);
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


  const data = sessionStorage.getItem('existingUser')
  const existingUser = JSON.parse(data);
  // console.log(existingUser);

  const totalFollowers = flwr ? flwr.reduce((acc, curr) => acc + curr.friends.length, 0) : 0;



  const handleupdateProfile = async (user) => {

    console.log(user);
    SetEditProfile(user)
    navigate('/updateprofile')
      
    }
  
//success
async function frndcount(){
  const token = sessionStorage.getItem("token")
    const reqHeader = {
      "Authorization": `Bearer ${token}`
    }
    try {
      // console.log('Inside frnd count function');
    
    const result=await frndcountAPI(reqHeader)
    // console.log(result);
    setflwr(result.data)
    } catch (err) {
      console.log(err);
    }
}

const handleremovecomment = async (cmt) => {
  const token = sessionStorage.getItem("token") 
  console.log(cmt);
  const commentId=cmt._id
  if (token) {
    const reqHeader = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
    try {
     
      const result = await removecommentAPI(commentId, reqHeader)
      console.log(result);
      if (result.status == 200) {
        SetCommentdlt(result.data)
        toast.success('Comment removed Successfully!!!')
      } else {
        console.log(result)
      }
    } catch (err) {
      console.log(err);
    }

  }
}

  


  return (
    <>
      <div className='profile' style={{ backgroundColor: 'black', height: '100vh' }}>
      <div className='row'>
            <div className='w-100 navbarhome'>
              <Navbar/>
              </div>
          </div>
        <div className='row'>
          <div className='col-lg-2 text-light pt-5 pb-5 navl ms-3 navleftbar' style={{ height: '100vh', position: 'fixed' }}>
            <NavLeft />
          </div>
          <div className='col-lg-10 personalprofilecontent'>
            {currentuser ? <div className='proileinfo d-flex justify-content-start align-items-start flex-column mb-5 personalprofiledetails'>
              <div className='d-flex justify-content-between align-items-center nameusrpassprofile'>
                <div className='d-flex'>
                  {currentuser.profileImage?<img className='mt-2 me-2' src={`${SERVER_URL}/uploads/${currentuser.profileImage}`} alt='' style={{ width: '100px',height:'100px',borderRadius:'50%' }} />:<img src={userimg} alt='' className='mt-2' style={{ width: '100px',height:'100px',borderRadius:'50%' }} />}
                  <div className='mt-4 ms-2'>
                    <h4 className='text-light'>{currentuser.firstName}</h4>
                    <p className='text-light'>{currentuser.username}</p>
                  </div>
                </div>
                <div className="Followersprsnlprofile d-flex flex-column">
                  <p className="text-light fw-bolder">Followers</p>
                  <p className="text-light text-center fw-bolder">{flwr.length}</p>
                </div>
                <div className="followingprsnlprofile d-flex flex-column">
                  <p className="text-light fw-bolder">Following</p>
                  <p className="text-light text-center fw-bolder">{currentuser.friends.length}</p>
                </div>
                
              </div>
              <button className='btn btn-light text-dark mb-4 editprofilebtn' onClick={() => handleupdateProfile(currentuser)}>
                Edit Profile
              </button>
            </div> : ''}
            
            <div className='post '>
              <div className='row pt-4 postprofhead'>
                <hr style={{ color: 'white' }} />
                <p className='text-center text-light w-100 fw-bolder phead'>POST</p>
                <hr style={{ color: 'white' }} />
              </div>
              <div className='mt-4 w-100 d-flex justify-content-start   align-items-start flex-wrap'>
                {postData?.length > 0 ? (
                  postData?.map((post) => (
                    <div key={post.id} className='d-flex justify-content-start border align-items-start p-1 shadow  mb-2  flex-column postimageownprof' onClick={() => handleModalOpen(post)}>

                      <img className='img-fluid' src={preview ? preview : `${SERVER_URL}/uploads/${post.image}`} alt='post img' style={{ width: '350px', height: '200px' }} />
                      <p className='text-light'><span className="fw-bolder">{post?.username}:  </span>{post?.caption}</p>

                    </div>
                  ))
                ) : (
                  <div className='fw-bolder text-danger text-center'>No Posts Uploaded Yet !!!</div>
                )}
              </div>
            </div>
          </div>
        </div>
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
                  <div className='w-100 d-flex mt-4 justify-content-between'>
                    <div className='d-flex'>
                      <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        A
                      </Avatar>
                      <b className='mt-2 ms-2'>{selectedPost.username} </b><span className='text-light mt-2 ms-2'>
                        {selectedPost.caption}
                      </span>
                    </div>
                    <Dropdown>
                      <Dropdown.Toggle className='bg-dark'><i className="fa-solid fa-ellipsis-vertical"></i></Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={()=>handleremovePost(selectedPost._id)}>Delete Post</Dropdown.Item>
                    </Dropdown.Menu>
                    </Dropdown>
                  </div>
                  <hr />
                  <div className='fullcomment'>
                    {comments.length > 0 ?
                      comments.map((comment, index) => (
                        <div className="d-flex justify-content-between align-items-start w-100">
                        <div className="comments mt-4" key={index}>
                          <img src={userimg} alt='' style={{ width: '40px' }} /> <span className="text-light fw-bolder">{comment.username} <span className="text-light fw-normal ms-2">{comment.comment} </span></span>
                        </div>
                        <Dropdown className='mt-4'>
                      <Dropdown.Toggle className='btn-dark'><i className="fa-solid fa-ellipsis-vertical "></i></Dropdown.Toggle><Dropdown.Menu className='bg-dark text-light'>
                    
                      <Dropdown.Item onClick={()=>handleremovecomment(comment)}  className='text-light'> <span className='p-3 p1' style={{
                      height:'100%'
                    }} ><i className="fa-regular fa-trash-can"></i> Delete Comment </span></Dropdown.Item>
                    
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
      </div>
      <div className="fixed-bottom navbtm">
      <div className='text-light p-2' style={{height:'55px',backgroundColor:'black'}}>
        <Nav fill variant="tabs" defaultActiveKey="/profile">
          <Nav.Item>
            <Nav.Link href="/" className='text-light'> <i className="fa-solid fa-home"></i> </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/search" className='text-light'> <i className="fa-solid fa-search"></i> </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/friends" className='text-light'> <i className="fa-solid fa-users"></i> </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/profile" className=''> <i className="fa-solid fa-circle-user"></i> </Nav.Link>
          </Nav.Item>
        </Nav>
    </div>

      </div>
    </>
  );
}

export default Profile;
