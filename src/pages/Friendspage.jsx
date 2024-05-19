import React, { useContext, useEffect, useState } from 'react';
import NavLeft from '../components/NavLeft';
import Navbar from '../components/Navbar';
import { getAllFriendsAPI, getAllUsersAPI, getfrienddetails, removeFriendAPI, userdetails } from '../../services/allAPI';
import userimg from '../assets/user.png';
import { ToastContainer, toast } from 'react-toastify';
import { friendremoveResponseContext, userResponseContext } from '../Context/ContextAPI';
import { Link, useNavigate } from 'react-router-dom';
import { SERVER_URL } from '../../services/serverURL';
import { Nav } from 'react-bootstrap';

function Friendspage() {
  const {friendstatusResponse, setFriendStatusResponse}=useContext(friendremoveResponseContext)
  const [users, setUsers] = useState([]);
  const [handleFriend, setHandleFriend] = useState([]);
  const [searchKey, setSearchKey] = useState('');
  const luser = sessionStorage.getItem('username').replace(/^"(.*)"$/, '$1');
  const [fdetails, setFdetails] = useState('');
  const [fno, setFno] = useState(0);
  const {userResponse,setUserResponse}=useContext(userResponseContext)
  const [lgShow, setLgShow] = useState(false);
  const navigate=useNavigate()


  const toggleIcon = (userId) => {
    setHandleFriend((prevToggled) =>
      prevToggled.includes(userId) ? prevToggled.filter((id) => id !== userId) : [...prevToggled, userId]
    );
  };
  const handleNavigate = async(user) => {
    setLgShow(true);
    const token = sessionStorage.getItem('token');
    const reqHeader = {
      Authorization: `Bearer ${token}`
    };

    try {
      const result2 = await getAllUsersAPI(user, reqHeader);
      if (result2.status === 200) {
        setUserResponse(result2.data)
        console.log(userResponse);
      }
    } catch (error) {
      console.log(error);
    }
    //  navigate('/user-Profile')
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
            const result = await removeFriendAPI(fid,reqHeader);
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

  useEffect(() => {
    async function fetchData() {
      const token = sessionStorage.getItem('token');
      const reqHeader = { Authorization: `Bearer ${token}` };
      try {
        const result = await getAllFriendsAPI(reqHeader);
        setUsers(result.data); 
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, [friendstatusResponse]);

  return (
    <>
      <div className='friendspage' style={{ backgroundColor: 'black', height: '100vh' }}>
      <div className='row'>
            <div className='w-100 navbarhome'>
              <Navbar/>
              </div>
          </div>
        <div className='row'>
          <div className='col-lg-2 text-light pt-5 pb-5 navl ms-3 navleftbar' style={{ height: '100vh', position: 'fixed' }}>
            <NavLeft />
          </div>
          <div className='col-lg-9 frndspgcontent'>
            <div className='search' style={{ backgroundColor: 'black', color: 'white' }}>
              <div className='brd1'>
                <div className=''>
                  <div className='w-100 srch' style={{ backgroundColor: 'black' }}>
                    
                  </div>
                </div>
                <hr style={{ opacity: '0' }} />
              </div>
              <h1 className="title text-center">Friends</h1>
              <div className="friendlist" >
                {users?.length > 0 ?
                  users.map(user => (
                    <div key={user._id} className="b1 d-flex justify-content-between align-items-center mb-1 me-2 border rounded flex-wrap eachfrnd" >
                      <div className='d-flex justify-content-start p-2' onClick={() => handleNavigate(user)}>
                        {user.fimg?<img className='me-2' src={`${SERVER_URL}/uploads/${user.fimg}`} alt='' style={{ width: '80px',height:'80px',borderRadius:'50%' }} />:<img src={userimg} alt='' className='me-2' style={{ width: '80px',height:'80px'}} />}
                        <h5 className='text-light mt-4'>{user.fname}</h5>
                      </div>
                      {/* <p className="text-secondary">{user.fid}</p> */}
                      <i
                      onClick={()=>handledeleteFriend(user?.fid)}
                        className='fa-solid fa-user-minus text-danger me-2'
                          
                      ></i>
                    </div>
                  )) : <div className="fw-bolder text-danger text-center">User Not Found !!!</div>}

              </div>
            </div>
          </div>
        </div>
        <ToastContainer position='top-center' theme='colored' autoClose={3000} />
      </div>
      <div className="fixed-bottom navbtm">
      <div className='text-light ' style={{height:'55px',backgroundColor:'black'}}>
        <Nav fill variant="tabs p-3" defaultActiveKey="#search">
          <Nav.Item>
            <Link to='/' className='text-light '> <i className="fa-solid fa-home mt-2"></i> </Link>
          </Nav.Item>
          
            <Nav.Item>
              <Link to='/search'  className='text-light'> <i className="fa-solid mt-2 fa-search "></i> </Link>
            </Nav.Item>
          
          
            <Nav.Item style={{backgroundColor:'white'}} className='rounded'>
              <Link to={'/friends'} > <i className="fa-solid fa-users mt-2 text-dark fw-bolder"></i> </Link>
            </Nav.Item>
          
         
            <Nav.Item>
               <Link to='/profile'  className='text-light'> <i className="fa-solid fa-circle-user mt-2"></i></Link>
            </Nav.Item>
          
        </Nav>
    </div>

      </div>
    </>
  )
}

export default Friendspage;
