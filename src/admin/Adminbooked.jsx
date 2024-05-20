import React, { useContext, useEffect, useState } from 'react'
import { getAllBookedAPI, getAllFriendsAPI, removeBookAPI, removeFriendAPI, userdetails } from '../../services/allAPI';
import userimg from '../assets/user.png'
import { friendremoveResponseContext } from '../Context/ContextAPI';
import { SERVER_URL } from '../../services/serverURL';

function Adminbooked() {
    const {friendstatusResponse, setFriendStatusResponse}=useContext(friendremoveResponseContext)

  const [users, setUsers] = useState([]);
  const [isClassA, setIsClassA] = useState(true);
  const [handleFriend, sethandleFriend] = useState([]);

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


  useEffect(() => {
    async function fetchData() {
      const token = sessionStorage.getItem('token');
      const reqHeader = { Authorization: `Bearer ${token}` };
      try {
        const result = await getAllBookedAPI(reqHeader);
        setUsers(result.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, [friendstatusResponse]);
  return (
    <>
    <h4 className='fw-bolder mt-5'>Marked Suspesious</h4>
      <div className='frndlist'>
        <div className="friends  d-flex justify-content-around align-items-start flex-wrap flex-column w-100" >
        {users?.length > 0 ?
                  users.map(user => (
                    <div key={user._id} className="b1 d-flex justify-content-between w-75 align-items-center " >
                      <div className='d-flex justify-content-start'>
                      {user.fimg?<img className='img-fluid me-4 mt-3' src={`${SERVER_URL}/uploads/${user.fimg}`} alt='' style={{ width: '60px',height:'60px',borderRadius:'50%'}} />:<img src={userimg} alt='' className='me-3' style={{ width: '65px',height:'65px'}} />}
                        <h5 className='text-light mt-4'>{user.fname}</h5>
                      </div>
                      <i
                        onClick={() => handledeleteFriend(user.fid)}
                        className={` ${handleFriend.includes(user.fid) ? 'fa-solid fa-user-plus text-primary' : 'fa-solid fa-lock-open  text-danger'
                          }`}
                      ></i>
                    </div>
                  )) : <div className="fw-bolder text-danger text-center">User Not Found !!!</div>}

        </div>



      </div>
    </>
  )
}

export default Adminbooked