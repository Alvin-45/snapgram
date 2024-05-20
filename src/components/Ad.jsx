import React, { useContext, useEffect, useState } from 'react'
import { SERVER_URL } from '../../services/serverURL'
import { frndcountAPI, getUserPostsAPI, luserAPI } from '../../services/allAPI';
import userimg from '../assets/user.png';
import { useNavigate } from 'react-router-dom';


function Ad(post) {
  const navigate=useNavigate()
  const [currentuser,setcurrentUser]=useState('')
  const [postData, setPostData] = useState({
    id: post?._id, image: "", caption: post?.caption
  })
  const [flwr,setflwr]=useState([])
  
  useEffect(()=>{
    loggedinUser()
    getUserPosts()
    frndcount()
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
  const handleNavigate=()=>{
    navigate('/profile')
  }
  return (
    <>
    {/* <div className="container rounded brd2">
      <div className="d-flex justify-content-between text-secondary">
        <p>Sponsered</p>
        <p className="text-warning">Ad</p>
      </div>
      <img src="https://penji.co/wp-content/uploads/2019/04/Best-Food-Ad-Designs-1200x720.jpg" width={"100%"} alt="" />
    </div> */}
    <div className="container rounded brd2 text-light">
      <div className="d-flex justify-content-center text-secondary flex-column w-100 align-items-center">
      {currentuser.profileImage?<img className='img-fluid me-2 mt-2' src={`${SERVER_URL}/uploads/${currentuser.profileImage}`} alt='' style={{ width: '50px',height:'50px',borderRadius:'50%'}} />:<img src={userimg} alt='' className='me-3' style={{ width: '65px',height:'65px'}} />}

        <span className='text-light'>{currentuser.firstName}</span>
        <span className="text-warning">@{currentuser.username}</span>
        <div className="profileinfo d-flex justify-content-evenly align-items-center w-100 ms-5 text-center " style={{color:'darkgray'}}>
          <div className="post d-flex flex-column">
            <span>Posts</span>
            <span className='text-center'>{postData.length}</span>
          </div>
          <div className="post d-flex flex-column">
            <span>Followers</span>
            <span className='text-center'>{flwr?flwr.length:0}</span>
          </div>
          <div className="post d-flex flex-column">
            <span>Following</span>
            <span className='text-center'>{currentuser?currentuser.friends.length:0}</span>
          </div>
        </div>
        <button className="btn btn-primary w-100" onClick={()=>handleNavigate()}>View Profile</button>
      </div>
      
    </div>
    </>
  )
}

export default Ad