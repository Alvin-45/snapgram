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

function Search() {
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
      <div className='fullsearchbdy' style={{ backgroundColor: 'black', height: '150vh' }}>
        <Navbar />
        <div className='row'>
          <div
            className='col-lg-2 text-light pt-5 pb-5 navl ms-3'
            style={{ height: '100vh', position: 'fixed' }}
          >
            <NavLeft />
          </div>
          <div className='col-lg-8' style={{ marginLeft: '350px' }}>
            <div className='search' style={{ backgroundColor: 'black', color: 'white' }}>
              <div className='brd1'>
                <div className=''>
                  <div
                    className='w-100 srch'
                    style={{ backgroundColor: 'black' }}
                  >
                    <input
                      type='text'
                      onChange={(e) => setSearchKey(e.target.value)}
                      className='bg-dark rounded me-1 text-light'
                      placeholder='Search by username'
                      style={{ width: '50%', height: '30px', textAlign: 'center' }}
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
                style={{ marginTop: '250px' }}
              >
                {users?.length > 0 ? (
                  users.map((user) => (
                    <div
                      key={user._id}
                      className='b1 d-flex justify-content-evenly align-items-center w-25 mb-4'
                    >
                      <img src={userimg} alt='' style={{ width: '80px' }} />
                      <h5 className='text-light'>{user.username}</h5>
                      <p className='text-light'>{user.firstname}</p>
                      <i
                        onClick={() => toggleIcon(user._id)}
                        className={`fa-solid fa-user-plus ${handleFriend.includes(user._id) ? 'text-danger' : 'text-primary'
                          }`}
                      ></i>
                    </div>
                  ))
                ) : (
                  <div className='fw-bolder text-danger text-center'>User Not Found !!!</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Search;
