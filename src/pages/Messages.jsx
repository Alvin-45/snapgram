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


function Messages() {
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


  return (
    <>
      <div className='fullsearchbdy' style={{ backgroundColor: 'black', height: '150vh' }}>
        <Navbar />
        <div className='row'>
          <div className='col-lg-1 text-light  pb-5 navl ms-3'
            style={{ height: '100vh', position: 'fixed' }}
          >
            <NavLicon />
          </div>
          <div className='col-lg-2 text-light mt-5  ' style={{ marginLeft: '150px' }}>
            <Chat />
          </div>
          <div className="col-lg-8 bg-dark" style={{ height: '100vh', borderLeft: '1px solid white', position: 'fixed', marginLeft: '30%' }}>
            <div className="row">
              <div className="col d-flex justify-content-start align-items-start">
                {chatstart ? 
                <img src={`${SERVER_URL}/uploads/${chatstartResponse.fimg}`} alt="" style={{ width: '40px',height:'40px',borderRadius:'50%' }} className='mt-2 me-2' /> : ""}

                <div className='mt-3 d-flex flex-column nameu'>
                  <h5 className='text-light '>{chatstartResponse.fname}</h5>
                  <p className='text-secondary'>{chatstartResponse.userName}</p>
                </div>
              </div>
            </div>
            <hr style={{ color: 'white' }} />
            <div className="row">
              <div className="col" style={{ height: '65vh', overflowY: 'auto' }}>
                {chatstartResponse?'':<div className='d-flex justify-content-center align-items-center' style={{height:'100%'}}><h5 className="text-light"> <i className="fa-solid fa-circle-plus"></i> Click on any chat to begin the chat</h5></div>}
                
                {/* <div className='d-flex justify-content-center align-items-center flex-column' style={{height:'100%'}}><h5 className="text-light"> {lfirstname} and {chatstartResponse.fname} are connected</h5>
                <p className="text-light">Happy chatting <i className="fa-regular fa-handshake"></i></p></div> */}

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
          </div>
        </div>
        <ToastContainer position='top-center' theme='colored' autoClose={3000} />

      </div>
    </>
  )
}

export default Messages
