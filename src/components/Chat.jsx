import React, { useContext, useEffect, useState } from 'react';
import userimg from '../assets/user.png';
import { addFriendAPI, getAllFriendsAPI, getAllUsersAPI } from '../../services/allAPI';
import { chatstartResponseContext, userResponseContext } from '../Context/ContextAPI';
import logo from '../assets/instalogo.png';
import { useNavigate } from 'react-router-dom';

function Chat() {
  const navigate=useNavigate()
  const { setChatstartResponse } = useContext(chatstartResponseContext);
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
        setUserResponse(result)
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className='chat' style={{ backgroundColor: 'black' }}>
        <div className='row'>
          <div className='col'>
            <div className=''>
              <div className=' srch2' style={{ backgroundColor: 'black' }}>
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
            <div className="d-flex justify-content-start align-items-start w-100 mb-4">
              <img src={logo} alt='' style={{ width: '20%' }} />
              <a href='http://localhost:5174/' target='_blank'><p onClick={communitynav} className='text-light fw-bolder mt-2'>Snapgram Community</p></a>
            </div>
            {/* Friends */}
            <h5 className="text-light fw-bolder mt-2">Friends</h5>
            {friends?.length > 0 ?
              friends.map(friend => (
                <div key={friend._id} className="d-flex justify-content-start align-items-start w-100 mb-4" onClick={() => handleOpenchat(friend)}>
                  <img src={userimg} alt='' style={{ width: '20%' }} />
                  <p className='text-light fw-bolder mt-2'>{friend.fname}</p>
                </div>
              )) : <div className="fw-bolder text-danger text-center">User Not Found !!!</div>}
            <hr style={{ color: 'white' }} />
            {/* Suggestions */}
            <h5 className="text-light fw-bolder mt-2">Suggestions</h5>
            {users?.length > 0 ? (
              users.map((user) => (
                <div key={user._id} className='d-flex justify-content-start align-items-start w-100 mb-2'>
                  <div className='d-flex justify-content-start align-items-start w-100'>
                    <img src={userimg} alt='' style={{ width: '20%' }} />
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
    </>
  );
}

export default Chat;
