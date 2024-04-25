import React, { useEffect, useState } from 'react'
import NavLeft from '../components/NavLeft'
import Navbar from '../components/Navbar'
import { userdetails } from '../../services/allAPI';
import userimg from '../assets/user.png'

function Friendspage() {
    const [users, setusers] = useState([]);
  const [isClassA, setIsClassA] = useState(true);
  const [handleFriend, sethandleFriend] = useState([]);

  const toggleIcon = (userId) => {
    sethandleFriend((prevToggled) =>
      prevToggled.includes(userId) ? prevToggled.filter((id) => id !== userId) : [...prevToggled, userId]
      
    );
    // setFriendResponse(true)
  };

    
  useEffect(() => {
        async function fetchData() {
            try {
                const result = await userdetails();
                // console.log(result.status);
                setusers(result.data);
                // console.log(result);

            } catch (err) {
                console.log(err);
            }
        }
        fetchData();
    }, []);

  return (
    <>
    <div className='friendspage' style={{ backgroundColor: 'black', height: '150vh' }}>
        <Navbar />
        <div className='row'>
          <div
            className='col-lg-2 text-light pt-5 pb-5 navl ms-3'
            style={{ height: '100vh', position: 'fixed' }}
          >
            <NavLeft />
          </div>
          <div className='col-lg-9' style={{ marginLeft: '350px' }}>
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
              <div className="friendsp  d-flex justify-content-start align-items-start flex-wrap"style={{marginTop:'0px',width:'100%'}}>
                {users?.length>0?
                users.map(user=>(
                <div key={user._id} className="b1 d-flex justify-content-evenly align-items-center w-50 mb-1">
                    <img src={userimg} alt="" style={{width:'80px'}} />
                    <h5 className='text-light'>{user.username}</h5>
                    <p className="text-secondary">{user.firstname}</p>
                    <i
                        onClick={() => toggleIcon(user._id)}
                        className={` ${handleFriend.includes(user._id) ? 'fa-solid fa-user-plus text-primary' : 'fa-solid fa-user-minus  text-danger'
                          }`}
                      ></i>
                </div>
            )):<div className="fw-bolder text-danger text-center">User Not Found !!!</div>}
                
            </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Friendspage