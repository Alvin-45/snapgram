import React, { useContext, useEffect, useState } from 'react';
import { Modal, Nav } from 'react-bootstrap';
import userimg from '../assets/user.png';
import { addCommentAPI, frndcountAPI, getPostCommentsAPI, getSearchNavigatePostsAPI, getUserPostsAPI } from '../../services/allAPI';
import { addResponseContext, editResponseContext, userResponseContext } from '../Context/ContextAPI';
import { SERVER_URL } from '../../services/serverURL';
import { Avatar } from '@mui/material';
import { orange, purple, red } from '@mui/material/colors';
import NavLeft from '../components/NavLeft';
import Navbar from '../components/Navbar';


function UserProfile(post) {
    const {addResponse,setAddResponse}=useContext(addResponseContext)
    const {editResponse,setEditResponse}=useContext(editResponseContext)
    const {userResponse,setUserResponse}=useContext(userResponseContext)
    
    const [show, setShow] = useState(false);
    const [preview,setPreview]=useState("")
    const [displayuName, setDisplayuName] = useState('');
    const [fname, setFname] = useState('');
    const [userData,setuserData]=useState({
        id:userResponse._id,firstName:userResponse.firstName,username:userResponse?.username,email:userResponse?.email,friends:userResponse.friends 
      })
    //   const fcount=userData.friends.length()
    //   console.log(fcount);
      // console.log(userData);
    const [postData,setPostData]=useState({
      id:post?._id,image:"",caption:post?.caption 
    })
    const [comments, setComments] = useState([]);
  
    const [lgShow, setLgShow] = useState(false);
    const [MlShow, setmLShow] = useState(false);

    const [selectedPost, setSelectedPost] = useState(null);
    const [userInput, setUserInput] = useState({
      comment: "",
    });
    const [searchUser,setSearchUser]=useState('')
    const [searchfriends,setSearchFriends]=useState([])
    const [flwr,setflwr]=useState([])

    
    useEffect(() => {
      frndcount()
      if (userResponse) {
        setSearchUser(userResponse)
        console.log(userResponse);

        const username=userResponse.username
        const  firstName = userResponse.firstName;
        const userId=userResponse._id
        setDisplayuName(username);
        setFname(firstName);
        const frnd=userResponse.friends
        console.log(frnd);
        setSearchFriends(frnd)
        if(postData.image){
          setPreview(URL.createObjectURL(postData.image))
          console.log("setting preview");
          console.log(preview);
        }else{
          setPreview("")
        }
        getUserPosts()
        console.log("getting user post");
  
      } else {
        setDisplayuName('');
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
      
    }, [postData.image,addResponse,lgShow,MlShow]);
  
    const getUserPosts = async () => {
      const token = sessionStorage.getItem("token")
      const reqHeader = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
      try {
        const result = await getSearchNavigatePostsAPI(userData.id,reqHeader)
        console.log(result);
        if (result.status == 200) {
          setPostData(result.data)
          console.log(postData);
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
    const handleModalsOpen=()=>{
      setmLShow(true)
    }
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
    
  return (
    <>
    <div className='profile' style={{ backgroundColor: 'black', height: '150vh' }}>
    <div className='row'>
            <div className='w-100 navbarhome'>
              <Navbar/>
              </div>
          </div>
        <div className='row'>
          <div className='col-lg-2 text-light pt-5 pb-5 navl ms-3 navleftbar' style={{ height: '100vh', position: 'fixed' }}>
            <NavLeft />
          </div>
          <div className='col-lg-10 srchuserprofile'>
            <div className='proileinfo d-flex justify-content-between align-items-center  searchuserprofileinfo'>

              <div className='d-flex'>
              {searchUser.profileImage?<img className='mt-2 me-2' src={`${SERVER_URL}/uploads/${searchUser.profileImage}`} alt='' style={{ width: '100px',height:'100px',borderRadius:'50%' }} />:<img src={userimg} alt='' className='' style={{ width: '100px',height:'100px',borderRadius:'50%' }} />}
                <div className='mt-4 '>
                  <h4 className='text-light'>{searchUser.firstName}</h4>
                  <p className='text-light'>{searchUser.username}</p>
              </div>
              </div>
              <div className="Followerssrchuser d-flex flex-column">
                  <p className="text-light fw-bolder">Followers</p>
                  <p className="text-light text-center fw-bolder">{flwr.length}</p>
                </div>
                <div className="followingsrchuser d-flex flex-column">
                  <p className="text-light fw-bolder">Following</p>
                  <p className="text-light text-center fw-bolder">
                    {searchfriends.length}
                  </p>
                </div>
              
            </div>
            <hr className='htline' />
            <div className='post'>
              <div className='row'>
                <div className='col text-center text-light fw-bolder srchuserpgposthead'> <i className="fa-solid fa-table-cells-large text-light"></i> POST</div>
                <hr className='htline2' />
              </div>
              <div className='mt-4 w-100 d-flex justify-content-start   align-items-start flex-wrap'>
                {postData?.length > 0 ? (
                  postData?.map((post) => (
                    <div key={post.id} className='d-flex justify-content-start border align-items-start p-1 rounded mb-2  flex-column po1'  onClick={() => handleModalOpen(post)}>
                      
                      <img className='img-fluid' src={preview?preview:`${SERVER_URL}/uploads/${post.image}`} alt='post img' style={{ width: '350px',height:'200px' }} />
                      <p className='text-light'><span className="fw-bolder">{displayuName.split(' ')}:  </span>{post?.caption}</p>
                      
                    </div>
                  ))
                ) : (
                  <div className='fw-bolder text-danger text-center'>No Posts Uploaded Yet !!!</div>
                )}
              </div>
            </div>
          </div>
          <Modal
          size="xl"
          show={MlShow}
          onHide={() => setmLShow(false)}
          aria-labelledby="example-modal-sizes-title-lg"
        >
          <Modal.Body className='mdlbdy' style={{ backgroundColor: 'black'}}>
            {selectedPost && (
              <div className="row modallength">
                <div className="col-lg-6 imgmodal">
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
                  <div className='fullcomment'>
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
        </div>
        <Modal
          size="xl"
          show={lgShow}
          onHide={() => setLgShow(false)}
          aria-labelledby="example-modal-sizes-title-lg"
        >
          <Modal.Body  className='mdlbdy' style={{ backgroundColor: 'black'}}>
            {selectedPost && (
              <div className="row modallength">
                <div className="col-lg-6 imgmodal">
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
                  <div className='fullcomment' >
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
      </div>
      <div className="fixed-bottom navbtm">
      <div className='text-light p-2' style={{height:'55px',backgroundColor:'black'}}>
        <Nav fill variant="tabs" defaultActiveKey="/search">
          <Nav.Item>
            <Nav.Link href="/" className='text-light'> <i className="fa-solid fa-home"></i> </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/search" className=''> <i className="fa-solid fa-search"></i> </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/friends" className='text-light'> <i className="fa-solid fa-users"></i> </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/profile" className='text-light'> <i className="fa-solid fa-circle-user"></i> </Nav.Link>
          </Nav.Item>
        </Nav>
    </div>

      </div>
    </>
  )
}

export default UserProfile