import React, { useContext, useEffect, useState } from 'react';
import userimg from '../assets/user.png';
import { getAllUsersAPI } from '../../services/allAPI';
import NavLeft from '../components/NavLeft';
import Navbar from '../components/Navbar';
import Post from '../components/Post';
import Friends from '../components/Friends';
import Ad from '../components/Ad';
import Addpost from '../components/Addpost';
import { friendResponseContext } from '../Context/ContextAPI';

function Chat() {
    const [searchKey, setSearchKey] = useState('');
  const [users, setUsers] = useState([]);
  const [handleFriend, sethandleFriend] = useState([]);
  // const [friendResponse,setFriendResponse]=useContext(friendResponseContext)

  const toggleIcon = (userId) => {
    sethandleFriend((prevToggled) =>
      prevToggled.includes(userId) ? prevToggled.filter((id) => id !== userId) : [...prevToggled, userId]
      
    );
    // setFriendResponse(true)
  };

  useEffect(() => {
    getAllUsers();
  }, [searchKey]);

  const getAllUsers = async () => {
    const token = sessionStorage.getItem('token');
    const reqHeader = {
      Authorization: `Bearer ${token}`
    };
    try {
      const result = await getAllUsersAPI(searchKey, reqHeader);
      if (result.status === 200) {
        setUsers(result.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
    <div className='chat' style={{ backgroundColor: 'black'}}>
        <div className='row'>
          <div className='col'>
             
                <div className=''>
                  <div
                    className=' srch2'style={{backgroundColor:"black"}}>
                        <h5>Chats</h5>
                    <input
                      type='text'
                      onChange={(e) => setSearchKey(e.target.value)}
                      className='bg-dark rounded me-1 text-light'
                      placeholder='Search by username'
                      style={{ width: '65%', height: '35px', textAlign: 'center' }}
                    />
                    <button className='btn btn-primary'>
                      <i className='fa-solid fa-search'></i> Search
                    </button>
                  </div>
                </div>
                <hr style={{ opacity: '0' }} />
              </div>
              <div
                className='users  d-flex justify-content-start align-items-start flex-wrap '
                style={{ marginTop: '50px' }}
              >
                {users?.length > 0 ? (
                  users.map((user) => (
                    <div
                      key={user._id}
                      className='d-flex justify-content-start align-items-start w-100 mb-4'
                    >
                      <img src={userimg} alt='' style={{ width: '20%' }} />
                      <p className='text-light fw-bolder mt-2'>{user.username}</p>
                      
                      {/* <i
                        onClick={() => toggleIcon(user._id)}
                        className={`fa-solid fa-user-plus ${handleFriend.includes(user._id) ? 'text-danger' : 'text-primary'
                          }`}
                      ></i> */}
                    </div>
                  ))
                ) : (
                  <div className='fw-bolder text-danger text-center'>No chat Found !!!</div>
                )}
              
           
          </div>
        </div>
      </div>
    </>
  )
}

export default Chat