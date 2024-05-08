import React, { useContext, useEffect, useState } from 'react';
import userimg from '../assets/user.png';
import { addFriendAPI, getAllUsersAPI, isFriendAPI } from '../../services/allAPI';
import NavLeft from '../components/NavLeft';
import Navbar from '../components/Navbar';
import { Modal, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { userResponseContext } from '../Context/ContextAPI';
import { SERVER_URL } from '../../services/serverURL';

function Search() {
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
  const luser = sessionStorage.getItem('username').replace(/^"(.*)"$/, '$1');
  // console.log(luser);
  useEffect(() => {
    getAllUsers();
  }, [searchKey]);

  const handleNavigate = (user) => {
    setLgShow(true);
    setUserResponse(user)
     navigate('/user-Profile')
  };
  
  return (
    <>
      <div className='fullsearchbdy' style={{ backgroundColor: 'black', height: '100vh' }}>
      <div className='row'>
            <div className='w-100 navbarhomesrchpg fixed-top '>
              <Navbar/>
              </div>
          </div>
        <div className='row'>
          <div className='col-lg-2 text-light pt-5 pb-5 navl ms-3 navleftbar' style={{ height: '100vh', position: 'fixed' }}>
            <NavLeft />
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
                    luser !== user.username && (
                      <div key={user._id} className='b1 d-flex justify-content-between align-items-center mb-2  srcheachuser '>
                        <div className='d-flex justify-content-around'  onClick={() => handleNavigate(user)}>
                        {user.profileImage?<img className=' me-2' src={`${SERVER_URL}/uploads/${user.profileImage}`} alt='' style={{ width: '80px',height:'80px',borderRadius:'50%' }} />:<img src={userimg} alt='' className='' style={{ width: '80px',height:'80px',borderRadius:'50%' }} />}
                          <div className='flex-column'>
                            <h5 className='text-light mt-3'>{user.username}</h5>
                            <p className='text-secondary' style={{marginTop:'-9px'}}>{user.firstName}</p>
                          </div>
                        </div>
                        <i
                          onClick={() => toggleIcon(user._id)}
                          className={`fa-solid fa-user-plus frnd ${handleFriend.includes(user._id) ? 'text-danger' : 'text-primary'}`}
                        ></i>
                        {/* <i
                          onClick={() => toggleIcon(user._id)}
                          className={`fa-solid fa-user-minus frnd text-danger`}
                        ></i> */}
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
  );
}

export default Search;
