import React, { useContext, useEffect, useState } from 'react';
import userimg from '../assets/user.png';
import { addMarkAPI, getAllUsersAPI, isFriendAPI, ladminAPI, removeBookAPI } from '../../services/allAPI';
import { Modal, Nav } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { friendResponseContext, friendremoveResponseContext, userResponseContext } from '../Context/ContextAPI';
import { SERVER_URL } from '../../services/serverURL';
import AdminNav from './AdminNav';

import AdminNavbar from './AdminNavbar';

function AdminSearch() {
  const {friendResponse, setFriendResponse}=useContext(friendResponseContext)
  const [searchKey, setSearchKey] = useState('');
  const [users, setUsers] = useState([]);
  const [handleFriend, setHandleFriend] = useState([]);
  const [addFriend, setAddFriend] = useState('');
  const [isFriend, setIsFriend] = useState(false);
  const [lgShow, setLgShow] = useState(false);
  const navigate=useNavigate()
  const {userResponse,setUserResponse}=useContext(userResponseContext)
  const [currentuser,setcurrentUser]=useState('')
  const {friendstatusResponse, setFriendStatusResponse}=useContext(friendremoveResponseContext)

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
  const toggleIcon = async (userId) => {
    setHandleFriend((prevToggled) =>
      prevToggled.includes(userId) ? prevToggled.filter((id) => id !== userId) : [...prevToggled, userId]
    );
  
    const token = sessionStorage.getItem('token');
    const reqHeader = {
      Authorization: `Bearer ${token}`
    };
    
  
    try {
      const result = await addMarkAPI(userId, reqHeader);
       setFriendResponse(result.data)
      if (result.status === 200) {
       
        setUsers((prevUsers) => {
          const updatedUsers = prevUsers.map((user) =>
            user._id === userId ? { ...user, friends: result.data.friends } : user
          );
          return updatedUsers;
        });
        setIsFriend(handleFriend.includes(userId));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handledeleteFriend=async(fid)=>{
    const token = sessionStorage.getItem("token");
        if (token) {
          const reqHeader = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          };
          try {
            console.log(fid);
            const result = await removeBookAPI(fid,reqHeader);
            if (result.status === 200) {
              setFriendStatusResponse(result)
            } else {
              toast.warning(result.response.data);
            }
          } catch (err) {
            console.log(err);
          }
        }
  }

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
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(luser);
  useEffect(() => {
    getAllUsers();
  }, [searchKey]);

  const handleNavigate = (user) => {
    setLgShow(true);
    setUserResponse(user)
     navigate('/adminusersearch')
  };
  useEffect(()=>{
    loggedinUser()
  },[friendResponse,friendstatusResponse])
  return (
    <>
    <div className='navadmin fixed-top'>
      <AdminNavbar/>
    </div>
      <div className='fullsearchbdy' style={{ backgroundColor: 'black', height: '100vh' }}>
        <div className='row'>
          <div className='col-lg-2 text-light pt-5 pb-5 navl ms-3 navleftbar' style={{ height: '100vh', position: 'fixed' }}>
            <AdminNav />
          </div>
          <div className='col-lg-8 searchpg' >
            <div className='search' style={{ backgroundColor: 'black', color: 'white' }}>
              <div className='brd1'>
                <div className=''>
                  <div className='w-100 srch' style={{ backgroundColor: 'black' }}>
                    <input
                      type='text'
                      onChange={(e) => setSearchKey(e.target.value)}
                      className='bg-dark rounded me-1 text-light searchpginp'
                      placeholder='Search by username'
                      
                    />
                  </div>
                </div>
                <hr style={{ opacity: '0' }} />
              </div>
              <div className='users srchpgalluser' >
                {users?.length > 0 ? (
                  users.map((user) => (
                      <div key={user._id} className='b1 d-flex justify-content-between align-items-center mb-2  srcheachuser '>
                        <div className='d-flex justify-content-around'  onClick={() => handleNavigate(user)}>
                        {user.profileImage?<img className=' me-2' src={`${SERVER_URL}/uploads/${user.profileImage}`} alt='' style={{ width: '80px',height:'80px',borderRadius:'50%' }} />:<img src={userimg} alt='' className='' style={{ width: '80px',height:'80px',borderRadius:'50%' }} />}
                          <div className='flex-column'>
                            <h5 className='text-light mt-3'>{user.username}</h5>
                            <p className='text-secondary' style={{marginTop:'-9px'}}>{user.firstName}</p>
                          </div>
                        </div>
                        
                        {currentuser && currentuser.friends && currentuser.friends.some(friend => friend.fid === user._id) ? (
  <i className={`fa-solid fa-lock-open frnd text-danger`} onClick={()=>handledeleteFriend(user._id)}/>
) : (
  <i className={`fa-solid fa-user-shield frnd text-primary`} onClick={() => toggleIcon(user._id)} />
)}
                        
                      </div>
                    
                  ))
                ) : (
                  <div className='fw-bolder text-danger text-center'>User Not Found !!!</div>
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
          <Modal.Body style={{ backgroundColor: 'black', height: '90vh', width: '100%', paddingTop: '15px' }}>
            
          </Modal.Body>
        </Modal>
      </div>
      
    </>
  );
}


export default AdminSearch