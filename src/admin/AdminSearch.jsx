import React, { useContext, useEffect, useState } from 'react';
import userimg from '../assets/user.png';
import { addFriendAPI, getAllUsersAPI } from '../../services/allAPI';
import { Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { userResponseContext } from '../Context/ContextAPI';
import AdminNav from './AdminNav';
import Navbar from '../components/Navbar';

function AdminSearch() {
    const [searchKey, setSearchKey] = useState('');
  const [users, setUsers] = useState([]);
  const [handleFriend, setHandleFriend] = useState([]);
  const [addFriend, setAddFriend] = useState('');
  const [isFriend, setIsFriend] = useState(false);
  const [lgShow, setLgShow] = useState(false);
  const navigate=useNavigate()
  const {userResponse,setUserResponse}=useContext(userResponseContext)
  const toggleIcon = async (userId) => {
    setHandleFriend((prevToggled) =>
      prevToggled.includes(userId) ? prevToggled.filter((id) => id !== userId) : [...prevToggled, userId]
    );
  
    const token = sessionStorage.getItem('token');
    const reqHeader = {
      Authorization: `Bearer ${token}`
    };
    
  
    try {
      const result = await addFriendAPI(userId, reqHeader);
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
  const luser = sessionStorage.getItem('Name').replace(/^"(.*)"$/, '$1');
  // console.log(luser);
  useEffect(() => {
    getAllUsers();
  }, [searchKey]);

  const handleNavigate = (user) => {
    setLgShow(true);
    setUserResponse(user)
     navigate('/adminusersearch')
  };

  return (
    <>
      <div className='fullsearchbdy' style={{ backgroundColor: 'black', height: '100vh' }}>
        <Navbar />
        <div className='row'>
          <div className='col-lg-2 text-light pt-5 pb-5 navl ms-3' style={{ height: '100vh', position: 'fixed' }}>
            <AdminNav />
          </div>
          <div className='col-lg-8' style={{ marginLeft: '350px' }}>
            <div className='search' style={{ backgroundColor: 'black', color: 'white' }}>
              <div className='brd1'>
                <div className=''>
                  <div className='w-100 srch' style={{ backgroundColor: 'black' }}>
                    <input
                      type='text'
                      onChange={(e) => setSearchKey(e.target.value)}
                      className='bg-dark rounded me-1 text-light'
                      placeholder='Search by username'
                      style={{ width: '70%', height: '30px', textAlign: 'center' }}
                    />
                  </div>
                </div>
                <hr style={{ opacity: '0' }} />
              </div>
              <div className='users d-flex justify-content-start align-items-center flex-wrap' style={{ marginTop: '250px' }} >
                {users?.length > 0 ? (
                  users.map((user) => (
                    luser !== user.username && (
                      <div key={user._id} className='b1 d-flex justify-content-start align-items-center w-25 mb-4 ms-3'>
                        <div className='d-flex justify-content-around'  onClick={() => handleNavigate(user)}>
                          <img src={userimg} alt='' style={{ width: '80px' }} />
                          <div className='flex-column'>
                            <h5 className='text-light mt-3'>{user.username}</h5>
                            <p className='text-secondary' style={{marginTop:'-9px'}}>{user.firstName}</p>
                          </div>
                        </div>
                        
                      </div>
                    )
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