import React, { useContext, useEffect, useState } from 'react';
import { Modal, Nav } from 'react-bootstrap';
import userimg from '../assets/user.png';
import { addCommentAPI, editProfileAPI, frndcountAPI, getPostCommentsAPI, getSearchNavigatePostsAPI, getUserPostsAPI } from '../../services/allAPI';
import { addResponseContext, editProfileContext, editResponseContext, userResponseContext } from '../Context/ContextAPI';
import { SERVER_URL } from '../../services/serverURL';
import { Avatar } from '@mui/material';
import { orange, purple, red } from '@mui/material/colors';
import NavLeft from '../components/NavLeft';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

function Updateprofile(post) {
    const navigate = useNavigate()
    const { editprofile, SetEditProfile } = useContext(editProfileContext)

    const { userResponse, setUserResponse } = useContext(userResponseContext)

    const [fname, setFname] = useState('');
    const [userData, setuserData] = useState({
        profileImage: editprofile.profileImage
    })

    console.log(userData.profileImage);



    useEffect(() => {


    }, [editprofile]);

    const handleUpdate = async () => {
        const firstName = editprofile.firstName
        const email = editprofile.email
        const username = editprofile.username
        const password = editprofile.password
        const friends = editprofile.friends
        console.log('Inside update function');
        const token = sessionStorage.getItem("token")
        if (token) {
            const reqHeader = {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
            try {
                const result = await editProfileAPI({ firstName, email, username, password, friends }, reqHeader)
                if (result.status == 200) {
                    toast.success("Profile Updated Successfully!!!")
                    console.log(result.data);
                    navigate('/profile')
                } else {
                    console.log(result)
                    toast.error('There has been a small problem....Try after sometime....')

                }
            } catch (err) {
                console.log(err);
            }
        }
    }





    return (
        <>
            <div className='profile' style={{ backgroundColor: 'black', height: '150vh' }}>
                <div className='row'>
                    <div className='w-100 navbarhome'>
                        <Navbar />
                    </div>
                </div>
                <div className='row'>
                    <div className='col-lg-2 text-light pt-5 pb-5 navl ms-3 navleftbar' style={{ height: '100vh', position: 'fixed' }}>
                        <NavLeft />
                    </div>
                    <div className='col-lg-10 updateprofilebdy'>
                        <h1 className=" text-center text-light upthead mt-5">Update Profile</h1>
                        <div className="updateprofile d-flex justify-content-center align-items-center flex-column">
                            {userData.profileImage ? <img className='mt-2 me-2 mb-5' src={`${SERVER_URL}/uploads/${userData.profileImage}`} alt='' style={{ width: '120px', height: '120px', borderRadius: '50%' }} /> : <img src={userimg} alt='' className='mt-2' style={{ width: '80px', height: '80px', borderRadius: '50%' }} />}

                            <input type="text" className="nameinp bg-dark text-light mb-3  text-center" style={{ height: '35px' }} value={editprofile.firstName} placeholder='Enter Name' onChange={(e) => SetEditProfile({ ...editprofile, firstName: e.target.value })} />
                            <input type="text" className="nameinp bg-dark text-light mb-3  text-center" style={{ height: '35px' }} value={editprofile.email} readOnly placeholder='Email' />
                            <input type="text" className="nameinp bg-dark text-light mb-3  text-center" style={{ height: '35px' }} value={editprofile.username} placeholder='Enter Username' onChange={(e) => SetEditProfile({ ...editprofile, username: e.target.value })} />
                            <p className="text-danger">*email cannot be changed</p>
                            <button className="btn btn-primary mt-5  uptbtn" onClick={handleUpdate}>Update Profile</button>
                        </div>
                    </div>

                </div>
            </div>
            <div className="fixed-bottom navbtm">
      <div className='text-light p-2' style={{height:'55px',backgroundColor:'black'}}>
        <Nav fill variant="tabs" defaultActiveKey="/profile">
          <Nav.Item>
            <Nav.Link href="/" className='text-light'> <i className="fa-solid fa-home"></i> </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/search" className='text-light'> <i className="fa-solid fa-search"></i> </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/friends" className='text-light'> <i className="fa-solid fa-users"></i> </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/profile" className=''> <i className="fa-solid fa-circle-user"></i> </Nav.Link>
          </Nav.Item>
        </Nav>
    </div>

      </div>
        </>
    )
}
export default Updateprofile