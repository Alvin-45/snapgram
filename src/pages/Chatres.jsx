import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import NavLicon from '../components/NavLicon'
import ChatPersons from '../components/ChatPersons'
import userimg from '../assets/user.png';
import Chat from '../components/Chat';
import { useLocation } from 'react-router-dom';
import { useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Msgbox from './Msgbox';
import { setChat } from "../Redux/chatSlice";
import { chataddResponseContext, chatstartResponseContext } from '../Context/ContextAPI';
import { addChatAPI, getChatsAPI } from '../../services/allAPI';
import { ToastContainer, toast } from 'react-toastify';
import { SERVER_URL } from '../../services/serverURL';
import logo from '../assets/instalogo.png';
import { useNavigate } from 'react-router-dom';
import { addFriendAPI, getAllFriendsAPI, getAllUsersAPI } from '../../services/allAPI';
import { userResponseContext } from '../Context/ContextAPI';

function Chatres() {
    const { chatstartResponse, setChatstartResponse } = useContext(chatstartResponseContext)
    const chatstart=chatstartResponse
    // const realdat= JSON.stringify(chatstart);
    // sessionStorage.setItem('chatstartRes',realdat)
    // console.log(chatstart);
    const location = useLocation();
    const user = location.state;
    const [updatevalue, setUpdateValue] = useState('')
    const datared = useSelector(state => state.chatReducer);
    const [chatData, setChatData] = useState({
      sender: "", receiver: "", chatmessage: "" 
    })
    const { chataddResponse, setChataddResponse } = useContext(chataddResponseContext)
    const [openchat,setOpenchat]=useState(true)
  
    useEffect(() => {
      getChats()
    }, [chataddResponse]);
  
    const now=new Date()
    const resultday=now.toLocaleString()
    console.log(resultday);
    async function getChats() {
      const receiver = chatstartResponse.fname
      const lfirstname = sessionStorage.getItem('username').replace(/^"(.*)"$/, '$1');
      // console.log(receiver);
      if (chatstartResponse) {
        const token = sessionStorage.getItem("token");
        const reqHeader = {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        };
  
        try {
          const result = await getChatsAPI(receiver, lfirstname, reqHeader);
          // console.log(result);
          if (result.status === 200) {
            setChataddResponse(result.data);
            setChatData({ ...chatData, chatmessage: "" })
            setUpdateValue(result.data)
          } else {
            console.log(result);
          }
        } catch (err) {
          console.log(err);
        }
      } else {
        console.log('Error: (fetch) chatstartResponse or chatData.chatmessage is null or undefined.');
      }
    }
  
    const lfirstname = sessionStorage.getItem('username').replace(/^"(.*)"$/, '$1');
  
    const handleuploadChat = async () => {
      const lsender = sessionStorage.getItem('username').replace(/^"(.*)"$/, '$1');
      setChatData({ ...chatData, sender: lsender, receiver: chatstartResponse.fname });
      if (chatstartResponse && chatData.chatmessage) {
        const token = sessionStorage.getItem("token");
        const reqBody = { chatmessage: chatData.chatmessage };
        const reqHeader = {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        };
  
        try {
          const result = await addChatAPI(chatstartResponse.fname, lsender, reqBody, reqHeader);
          // console.log(result);
          if (result.status === 200) {
            setChataddResponse(result.status);
            setChatData({ ...chatData, chatmessage: "" })
          } else {
            console.log(result);
          }
        } catch (err) {
          console.log(err);
        }
      } else {
        console.log('Error: chatstartResponse or chatData.chatmessage is null or undefined.');
      }
    };
    const navigate=useNavigate()
  const [friends, setFriends] = useState([]);
  const [searchKey, setSearchKey] = useState('');
  const [users, setUsers] = useState([]);
  const [handleFriend, setHandleFriend] = useState([]);
  const {userResponse,setUserResponse}=useContext(userResponseContext)

  const communitynav=()=>{
    const username=sessionStorage.getItem('username').replace(/^"(.*)"$/, '$1');
    localStorage.setItem('username',username)
    const existingUser=sessionStorage.getItem('existingUser').replace(/^"(.*)"$/, '$1');
    localStorage.setItem('existingUser',existingUser)
    const Name=sessionStorage.getItem('Name').replace(/^"(.*)"$/, '$1');
    localStorage.setItem('Name',Name)
    const token=sessionStorage.getItem('token').replace(/^"(.*)"$/, '$1');
    localStorage.setItem('token',token)
    

  }
  useEffect(() => {
    fetchFriendsData();
    getAllUsers();
  }, [searchKey,userResponse]);

  async function fetchFriendsData() {
    const token = sessionStorage.getItem('token');
    const reqHeader = { Authorization: `Bearer ${token}` };
    try {
      const result = await getAllFriendsAPI(reqHeader);
      setFriends(result.data);
    } catch (err) {
      console.log(err);
    }
  }

  const getAllUsers = async () => {
    const token = sessionStorage.getItem('token');
    const reqHeader = { Authorization: `Bearer ${token}` };
    try {
      const result = await getAllUsersAPI(searchKey, reqHeader);
      if (result.status === 200) {
        setUsers(result.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleOpenchat = (user) => {
    setChatstartResponse(user);
    setOpenchat(false)
    sessionStorage.setItem('chatstartResponse', JSON.stringify(user));
  };

  const toggleIcon = async (userId) => {
    setHandleFriend((prevToggled) =>
      prevToggled.includes(userId) ? prevToggled.filter((id) => id !== userId) : [...prevToggled, userId]
    );

    const token = sessionStorage.getItem('token');
    const reqHeader = { Authorization: `Bearer ${token}` };

    try {
      const result = await addFriendAPI(userId, reqHeader);
      if (result.status === 200) {
        setUsers((prevUsers) => {
          const updatedUsers = prevUsers.map((user) =>
            user._id === userId ? { ...user, friends: result.data.friends } : user
          );
          return updatedUsers;
        });
        setUserResponse(result.data)
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handlechatstate=()=>{
    setOpenchat(true)
  }
  
  return (
    <>
    <div className="reschat w-100">
    <div className='fullsearchbdy' style={{ backgroundColor: 'black', height: '100vh',position:'relative' }}>
        <div className='w-100' style={{position:'fixed',backgroundColor:'black'}}>
            <Navbar /></div>
        <div className='row'>
          {openchat?<div className='col-lg-6 text-light ms-3 ' style={{width:'80%'}}>
          <div className='chat' style={{ backgroundColor: 'black',marginTop:'60px' }}>
        <div className='row'>
          <div className='col'>
            <div className=''>
              <div className=' srch3' style={{ backgroundColor: 'black',width:'100%' }}>
                <h5>Chats</h5>
                <input
                  type='text'
                  onChange={(e) => setSearchKey(e.target.value)}
                  className='bg-dark rounded me-1 mb-4 text-light'
                  placeholder='Search by username'
                  style={{ width: '100%', height: '35px', textAlign: 'center' }}
                />
              </div>
            </div>
            <hr style={{ opacity: '0' }} />
          </div>
          <div className='users  d-flex justify-content-start align-items-start flex-wrap ' style={{ marginTop: '50px' }}>
            {/* Snapgram Community */}
            <div className="d-flex justify-content-start align-items-start w-100 mb-4 pt-5">
              <img src={logo} alt='' style={{ width: '20%' }} />
              <a href='http://localhost:5174/' target='_blank'><p onClick={communitynav} className='text-light fw-bolder mt-2'>Snapgram Community</p></a>
            </div>
            
            <h5 className="text-light fw-bolder mt-2">Friends</h5>
            {friends?.length > 0 ?
              friends.map(friend => (
                <div key={friend._id} className="d-flex justify-content-start align-items-start w-100 ms-5 mb-4" onClick={() => handleOpenchat(friend)}>
                  {friend.fimg?<img className='img-fluid me-2 mt-2' src={`${SERVER_URL}/uploads/${friend.fimg}`} alt='' style={{ width: '30px',height:'30px',borderRadius:'50%'}} />:<img src={userimg} alt='' className='me-3' style={{ width: '65px',height:'65px'}} />}
                  <p className='text-light fw-bolder mt-2'>{friend.fname}</p>
                </div>
              )) : <div className="fw-bolder text-danger text-center">User Not Found !!!</div>}
            <hr style={{ color: 'white' }} />
            
            <h5 className="text-light fw-bolder mt-2">Suggestions</h5>
            {users?.length > 0 ? (
              users.map((user) => (
                <div key={user._id} className='d-flex justify-content-start align-items-start w-100 mb-2 ms-5'>
                  <div className='d-flex justify-content-start align-items-start w-100'>
                  {user.profileImage?<img className='img-fluid me-2 mt-1' src={`${SERVER_URL}/uploads/${user.profileImage}`} alt='' style={{ width: '30px',height:'30px',borderRadius:'50%'}} />:<img src={userimg} alt='' className='me-3' style={{ width: '65px',height:'65px'}} />}
                    {/* <img src={userimg} alt='' style={{ width: '20%' }} /> */}
                    <p className='text-light fw-bolder mt-2'>{user.username}</p>
                  </div>
                  <i className="fa-solid fa-plus mt-2 text-primary" onClick={() => toggleIcon(user._id)}></i>
                </div>
              ))
            ) : (
              <div className='fw-bolder text-danger text-center'>No chat Found !!!</div>
            )}
          </div>
        </div>
      </div>
          </div>:
           <div className="col-lg-8 bg-dark" style={{ height: '90vh', borderLeft: '1px solid white', position: 'fixed'}}>
           <div className="row">
             <div className="col d-flex justify-content-start align-items-start">
               <i className="fa-solid fa-arrow-left text-light mt-4 fa-xl ms-2 me-5" onClick={handlechatstate}></i>
               {chatstart ? 
               <img src={`${SERVER_URL}/uploads/${chatstartResponse.fimg}`} alt="" style={{ width: '40px',height:'40px',borderRadius:'50%' }} className='mt-2 me-2 ms-5' /> : ""}

               <div className='mt-3 d-flex flex-column nameu'>
                 <h5 className='text-light '>{chatstartResponse.fname}</h5>
                 <p className='text-secondary'>{chatstartResponse.userName}</p>
               </div>
             </div>
           </div>
           <hr style={{ color: 'white' }} />
           <div className="row">
             <div className="col" style={{ height: '55vh', overflowY: 'auto' }}>
               {chatstartResponse?'':<div className='d-flex justify-content-center align-items-center' style={{height:'100%'}}><h5 className="text-light"> <i className="fa-solid fa-circle-plus"></i> Click on any chat to begin the chat</h5></div>}

               {updatevalue ?
                 updatevalue.sort((a, b) => a._id.localeCompare(b._id)).map(user => (
                   <div key={user.id}>
                     {chatstartResponse.fname === user.sender ? (
                       <div className="fromchat w-25 rounded bg-light d-flex justify-content-between mb-2 p-1 flex-column">
                         <p className='ms-2 fw-bolder w-100'>{user.chatmessage}</p>
                         <span className='me-3 d-flex justify-content-end align-items-end w-100'>{user.time} </span>
                       </div>
                     ) : null}
                     {chatstartResponse.fname === user.receiver ? (
                       <div className="tochat w-25 rounded bg-primary d-flex justify-content-end mb-2 p-1 flex-column" style={{ marginLeft: '75%' }}>
                         
                         <p className='me-2  fw-bolder text-light w-100'>{user.chatmessage}</p>
                         <span className='d-flex justify-content-end align-items-end w-100 text-dark'>{user.time}</span>
                       </div>
                     ) : null}
                   </div>
                 )) : null}
             </div>
           </div>
           <hr style={{ color: 'white' }} />
           <div className="row">
             <div className="col-lg-12 d-flex justify-content-center align-items-center">
               {chatstartResponse ?
                 <div className='w-100 d-flex justify-content-center align-items-center'>
                   <Msgbox/>
                 </div>
                 : ''}
             </div>
           </div>
         </div>}
         
        </div>
        <ToastContainer position='top-center' theme='colored' autoClose={3000} />

      </div>
    </div>
    </>
  )
}

export default Chatres