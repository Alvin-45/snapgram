import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import NavLicon from '../components/NavLicon';
import Chat from '../components/Chat';
import userimg from '../assets/user.png';
import { useLocation } from 'react-router-dom';
import { useSelector } from "react-redux";
import { addChatAPI, getChatsAPI } from '../../services/allAPI';
import { ToastContainer, toast } from 'react-toastify';

function Snapgram() {
    const location = useLocation();
    const user = location.state;
    const [chatData, setChatData] = useState({ sender: "", receiver: "", chatmessage: "" });
    const [chatMessages, setChatMessages] = useState([]);
    const lsender = sessionStorage.getItem('username').replace(/^"(.*)"$/, '$1');

    useEffect(() => {
        getChats();
    }, []);

    async function getChats() {
        if (!user || !user.fname) {
            console.log('Error: No user information.');
            return;
        }
        const token = sessionStorage.getItem("token");
        const reqHeader = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        };

        try {
            const result = await getChatsAPI(user.fname, lsender, reqHeader);
            if (result.status === 200) {
                setChatMessages(result.data);
            } else {
                console.log(result);
            }
        } catch (err) {
            console.log(err);
        }
    }

    const handleUploadChat = async () => {
        if (!user || !user.fname || !chatData.chatmessage) {
            console.log('Error: Missing user information or chat message.');
            return;
        }
        const token = sessionStorage.getItem("token");
        const reqBody = { chatmessage: chatData.chatmessage };
        const reqHeader = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        };

        try {
            const result = await addChatAPI(user.fname, lsender, reqBody, reqHeader);
            if (result.status === 200) {
                setChatMessages([...chatMessages, result.data]);
                setChatData({ ...chatData, chatmessage: "" });
            } else {
                console.log(result);
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <div className='fullsearchbdy' style={{ backgroundColor: 'black', height: '150vh' }}>
                <Navbar />
                <div className='row'>
                    <div className='col-lg-1 text-light pb-5 navl ms-3' style={{ height: '100vh', position: 'fixed' }}>
                        <NavLicon />
                    </div>
                    <div className='col-lg-2 text-light mt-5' style={{ marginLeft: '150px' }}>
                        <Chat />
                    </div>
                    <div className="col-lg-8 bg-dark" style={{ height: '100vh', borderLeft: '1px solid white', position: 'fixed', marginLeft: '30%' }}>
                        <div className="row">
                            <div className="col d-flex justify-content-start align-items-start">
                                {user ? <img src={userimg} alt="" style={{ width: '70px' }} /> : null}
                                <div className='mt-3 d-flex flex-column nameu'>
                                    <h5 className='text-light '>{user ? user.fname : ''}</h5>
                                    <p className='text-secondary'>{user ? user.userName : ''}</p>
                                </div>
                            </div>
                        </div>
                        <hr style={{ color: 'white' }} />
                        <div className="row">
                            <div className="col" style={{ height: '65vh', overflowY: 'auto' }}>
                                {chatMessages.map((message, index) => (
                                    <div key={index} className="text-light">{message}</div>
                                ))}
                            </div>
                        </div>
                        <hr style={{ color: 'white' }} />
                        <div className="row">
                            <div className="col-lg-12 d-flex justify-content-center align-items-center">
                                {user ?
                                    <div className='w-100 d-flex justify-content-center align-items-center'>
                                        <input type="text" className='bg-dark w-75 rounded text-light' value={chatData.chatmessage} onChange={(e) => setChatData({ ...chatData, chatmessage: e.target.value })} placeholder='Type Here...' />
                                        <button className="btn btn-primary" onClick={handleUploadChat}><i className="fa-regular fa-paper-plane"></i> Send</button>
                                    </div>
                                    : ''}
                            </div>
                        </div>
                    </div>
                </div>
                <ToastContainer position='top-center' theme='colored' autoClose={3000} />
            </div>
        </>
    );
}

export default Snapgram;
