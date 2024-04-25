import React, { useContext, useEffect, useState } from 'react';
import { Navbar } from 'react-bootstrap';
import NavLeft from './NavLeft';
import userimg from '../assets/user.png';
import { getUserPostsAPI } from '../../services/allAPI';
import { addResponseContext, editResponseContext } from '../Context/ContextAPI';
import { SERVER_URL } from '../../services/serverURL';

function Profile(post) {
  const {addResponse,setAddResponse}=useContext(addResponseContext)
  const {editResponse,setEditResponse}=useContext(editResponseContext)
  const [show, setShow] = useState(false);
  const [preview,setPreview]=useState("")
  const [displayuName, setDisplayuName] = useState('');
  const [fname, setFname] = useState('');
  const [postData,setPostData]=useState({
    id:post?._id,image:"",caption:post?.caption 
  })
  useEffect(() => {
    if (sessionStorage.getItem('existingUser')) {
      const { username, firstName } = JSON.parse(sessionStorage.getItem('existingUser'));
      setDisplayuName(username);
      setFname(firstName);
      if(postData.image){
        setPreview(URL.createObjectURL(postData.image))
        console.log("setting preview");
        console.log(preview);
      }else{
        setPreview("")
      }
      getUserProjects()
      console.log("getting user post");

    } else {
      setDisplayuName('');
      setFname('');
    }
    
  }, [postData.image,addResponse]);

  const getUserProjects = async () => {
    const token = sessionStorage.getItem("token")
    const reqHeader = {
      "Authorization": `Bearer ${token}`
    }
    try {
      const result = await getUserPostsAPI(reqHeader)
      console.log(result);
      if (result.status == 200) {
        setPostData(result.data)
        console.log(postData);
      }
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <>
      <div className='profile' style={{ backgroundColor: 'black', height: '150vh' }}>
        <Navbar />
        <div className='row'>
          <div className='col-lg-2 text-light pt-5 pb-5 navl ms-3' style={{ height: '100vh', position: 'fixed' }}>
            <NavLeft />
          </div>
          <div className='col-lg-10' style={{ marginLeft: '450px' }}>
            <div className='proileinfo d-flex justify-content-start align-items-start' style={{ height: '150px' }}>
              <img src={userimg} alt='' style={{ width: '120px' }} />
              <div className='mt-4 '>
                <h4 className='text-light'>{fname.split(' ')[0]}</h4>
                <p className='text-light'>{displayuName.split(' ')[0]}</p>
              </div>
              <button className='btn btn-light text-dark w-50' style={{ marginTop: '90px' }}>
                Edit Profile
              </button>
            </div>
            <hr style={{ color: 'white' }} />
            <div className='post'>
              <div className='row'>
                <div className='col text-center text-light'>POST</div>
                <hr style={{ color: 'white', marginLeft: '100px' }} />
              </div>
              <div className='mt-4 w-100 d-flex justify-content-start   align-items-start flex-wrap'>
                {postData?.length > 0 ? (
                  postData?.map((post) => (
                    <div key={post.id} className='d-flex justify-content-start border align-items-start p-1 rounded mb-2 me-2 flex-column po1' style={{width:'20%',height:'280px'}}>
                      
                      <img className='img-fluid' src={preview?preview:`${SERVER_URL}/uploads/${post.image}`} alt='post img' style={{ width: '350px',height:'200px' }} />
                      <p className='text-light'><spa className="fw-bolder">{displayuName.split(' ')}:  </spa>{post?.caption}</p>
                      
                    </div>
                  ))
                ) : (
                  <div className='fw-bolder text-danger text-center'>No Posts Uploaded Yet !!!</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
