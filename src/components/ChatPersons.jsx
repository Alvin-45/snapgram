import React, { useEffect, useState } from 'react'
import Avatar from '@mui/material/Avatar';
import { blue, red, yellow } from '@mui/material/colors';
import { userdetails } from '../../services/allAPI';
import userimg from '../assets/user.png'


function ChatPersons() {
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
      <h5 className='fw-bolder mt-5'>Suggestions</h5>
      <div className='frndlist'>
      <div className="friends  d-flex justify-content-start align-items-start flex-wrap flex-column"style={{width:'80%'}}>
                  {users?.length>0?
                  users.map(user=>(
                  <div key={user._id} className="b1 d-flex justify-content-evenly align-items-center w-100 mb-1">
                    
                      <img src={`${SERVER_URL}/uploads/${user.profileImage}`} alt="" style={{width:'80px'}} />
                      <h5 className='text-light'>{user.username}</h5>
                      <p className="text-secondary">{user.firstname}</p>
                      <i
                          onClick={() => toggleIcon(user._id)}
                          className={` ${handleFriend.includes(user._id) ? 'fa-solid fa-user-plus text-primary' : 'fa-solid fa-trash  text-danger'
                            }`}
                        ></i>
                  </div>
              )):<div className="fw-bolder text-danger text-center">User Not Found !!!</div>}
                  
              </div>
        
       
      
      </div>
      
      </>
    )
}

export default ChatPersons