import React, { useContext, useEffect, useState } from 'react'
import AdminNav from './AdminNav'
import { adddeletedpostAPI, adminallUsersAPI, doespostexist, getHomePostsAPI, getflagPostsAPI, removePostAPI, removeflagAPI, reportedPost } from '../../services/allAPI'
import { Button, Dropdown, DropdownMenu, Modal } from 'react-bootstrap'
import { postremoveResponseContext, responseinvalidContext } from '../Context/ContextAPI'
import { SERVER_URL } from '../../services/serverURL'
import { ToastContainer, toast } from 'react-toastify'

function Admindashboard(props) {
  const [flag, setFlag] = useState("")
  const [users, setUsers] = useState([]);
  const [modalShow, setModalShow] = React.useState(false);
  const [reqinvmodal, setReqinvmodal] = React.useState(false);
  const [delUser, setDelUser] = React.useState(false);
  const { responseinvalid, SetResponseinvalid } = useContext(responseinvalidContext)
  const [action, setAction] = useState('')
  const { poststatusResponse,setPostStatusResponse } = useContext(postremoveResponseContext)
  const [postData, setPostData] = useState('')
  const [ReqinvpostData, setReqinvpostData] = useState('')
  const [delpostData, setDelpostData] = useState('')
 const [totalpost,setTotalPost]=useState('')
  const [pimg, setpimg] = useState('')
  const [delmodal, setDelmodal] = useState(false)

  useEffect(() => {
    getFlagposts()
    getAllUsers();
    getHomePosts();
  }, [poststatusResponse, poststatusResponse])
  async function getAllUsers() {
    const token = sessionStorage.getItem('token');
    const reqHeader = {
      Authorization: `Bearer ${token}`
    };

    try {
      const result = await adminallUsersAPI(reqHeader);
      if (result.status === 200) {
        setUsers(result.data);
        // console.log(users);
      }
    } catch (error) {
      console.log(error);
    }
  };

  async function getFlagposts() {
    const token = sessionStorage.getItem('token');
    const reqHeader = { "Authorization": `Bearer ${token}` };
    try {
      const result = await getflagPostsAPI(reqHeader);
      // console.log(result.data);
      setFlag(result.data);
    } catch (err) {
      console.log(err);
    }

  }

  async function getHomePosts() {
    try {
      const result = await getHomePostsAPI();
      setTotalPost(result.data);
    } catch (err) {
      console.log(err);
    }
  }


  const handleremovePost = async (report) => {
    console.log("Inside Remove post function");
    console.log(report);
    const token = sessionStorage.getItem("token")
    const postId = report._id
    console.log(postId);
    if (token) {
      const reqHeader = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
      try {
        const result2 = await removeflagAPI(postId, reqHeader)
        const result = await removePostAPI(postId, reqHeader)
        console.log(result);
        if (result.status == 200 && result2.status == 200) {
          setPostStatusResponse(result.status)
          setDelmodal(false);
        } else {
          console.log(result)
        }
      } catch (err) {
        console.log(err);
      }

    }
  }
//working on
  const handleopenmodalpostdelete = async (report) => {
    const pid = report.postId
    // console.log(pid);
    const token = sessionStorage.getItem("token");

    const reqHeader = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    };
    try {
      const result = await reportedPost(pid, reqHeader);
      // console.log(result);
      if (result.status === 200) {
        setPostStatusResponse(result.status);
        const postinfo1 = result.data
        const postinfo2 = JSON.stringify(postinfo1)
        localStorage.setItem('postinfo', postinfo2)
        setDelpostData(postinfo1)
        console.log(postinfo1[0].image);
        setDelmodal(true);
      } else {
        console.log(result);
      }
    } catch (err) {
      console.log(err);
    }
    
  };

  //success
  const handleopenmodalreqinv = async (report) => {
    const pid = report.postId
    // console.log(pid);
    const token = sessionStorage.getItem("token");

    const reqHeader = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    };
    try {
      const result = await reportedPost(pid, reqHeader);
      // console.log(result);
      if (result.status === 200) {
        setPostStatusResponse(result.status);
        const postinfo1 = result.data
        const postinfo2 = JSON.stringify(postinfo1)
        localStorage.setItem('postinfo', postinfo2)
        setReqinvpostData(postinfo1)
        console.log(postinfo1[0].image);
        setReqinvmodal(true);
      } else {
        console.log(result);
      }
    } catch (err) {
      console.log(err);
    }
  };

  //success
  const handleremovereport = async (report) => {
    console.log('Inside Report delete option');
    const token = sessionStorage.getItem("token");
    const postId = report?.postId;
    console.log(postId);

    // console.log(report);
    if (!token) {
      // console.log("Token is missing.");
      return;
    }
    if (!postId) {
      // console.log("Post ID is missing in the report object.");
      return;
    }

    const reqHeader = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    };
    try {
      const result = await removeflagAPI(postId, reqHeader);
      console.log(result);
      if (result.status === 200) {
        setPostStatusResponse(result.status);
        console.log('Inside success Report delete option');

        // setReqinvmodal(false)

      } else {
        console.log(result);
      }
    } catch (err) {
      console.log(err);
    } toast.success('Request was removed successfully!!!')

  };

  //success
  const handlereportedPost = async (report) => {
    const pid = report.postId
    // console.log(pid);
    const token = sessionStorage.getItem("token");

    const reqHeader = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    };
    try {

      const result = await reportedPost(pid, reqHeader);
      // console.log(result);
      if (result.status === 200) {

        setPostStatusResponse(result.status);
        const postinfo1 = result.data
        const postinfo2 = JSON.stringify(postinfo1)
        localStorage.setItem('postinfo', postinfo2)
        setPostData(postinfo1)
        console.log(postinfo1[0].image);
        setModalShow(true);
      } else {
        console.log(result);
        
      }
    } catch (err) {
      console.log(err);
      // toast.error('Post Removed by User/Admin Head to Request Invalid option')
      alert('Post Removed by User/Admin Head to Request Invalid option')

    }

  }
//success delete from view modal
const handleremovereportmodal = async (report) => {
  console.log(report);
  console.log('Inside Report delete option');
  const token = sessionStorage.getItem("token");
  const postId = report?._id;
  console.log(postId);

  // console.log(report);
  if (!token) {
    // console.log("Token is missing.");
    return;
  }
  if (!postId) {
    // console.log("Post ID is missing in the report object.");
    return;
  }

  const reqHeader = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`
  };
  try {
    const result = await removeflagAPI(postId, reqHeader);
    console.log(result);
    if (result.status === 200) {
      setPostStatusResponse(result.status);
      console.log('Inside success Report delete option');
      setModalShow(false)
      // setReqinvmodal(false)

    } else {
      console.log(result);
    }
  } catch (err) {
    console.log(err);
  } toast.success('Request was removed successfully!!!')

};

//success delete from view modal
const handleremovePostmodal = async (report) => {
  console.log("Inside Remove post function");
  console.log(report);
  console.log(report);
  const token = sessionStorage.getItem("token")
  const postId = report._id
  console.log(postId);
  if (token) {
    const reqHeader = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
    try {
      const result2 = await removeflagAPI(postId, reqHeader)
      const result = await removePostAPI(postId, reqHeader)
      console.log(result);
      if (result.status == 200 && result2.status == 200) {
        setPostStatusResponse(result.status)
        setModalShow(false)
      } else {
        console.log(result)
      }
    } catch (err) {
      console.log(err);
    }

  }
}



  return (
    <>
      <div className="adminportal text-light" style={{ backgroundColor: 'black', width: '100%', height: '100vh' }}>
        <div className="row">
          <div className="col-2 ms-4 mt-5">
            <AdminNav />
          </div>
          <div className="col-8 pt-5">
            <h3>Reported Cases</h3>
            <div className="reportedcases w-100 border">
              <div className="w-100">
                <table style={{ width: '100%' }}>
                  <thead style={{ width: '100%', height: '50px' }}>
                    <tr className='border text-center'>
                      <th>Sl.No</th>
                      <th>Reporter Id</th>
                      <th>Reported Account</th>
                      <th>Post Details</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {flag?.length > 0 ?
                      flag.map((report, index) => (


                        <tr key={report._id} className='border text-center'>
                          <td>{index + 1}</td>
                          <td>{report.poster} </td>
                          <td>{report.reporter}</td>
                          <td>{report.postId} <i className="fa-solid fa-eye text-primary " onClick={() => handlereportedPost(report)}></i></td>
                          <Dropdown>
                            <Dropdown.Toggle value="Pending" className='w-100 text-warning text-center  fw-bolder'>Pending</Dropdown.Toggle>

                            <DropdownMenu>
                              <Dropdown.Item value="Pending" className='w-100 text-warning text-center text-success fw-bolder'>Pending</Dropdown.Item>
                              <Dropdown.Item value="Report Invalid" className='w-100 text-dark text-center  fw-bolder' onClick={() => handleremovereport(report)}>Report Invalid</Dropdown.Item>
                              <Dropdown.Item value="Delete Post" className='text-danger text-center  fw-bolder' onClick={() => handleopenmodalpostdelete(report)}>Delete Post</Dropdown.Item>
                              {/* <option value="Delete Account" className='text-danger fw-bolder text-center'>Delete Account</option> */}
                            </DropdownMenu>


                          </Dropdown>
                        </tr>)) : ''}
                  </tbody>

                </table>
                {/* <img src={`${SERVER_URL}/uploads/${postData[0].image}`} alt="" className='postimage' style={{position:'absolute',width:'20%',height:'350px',marginTop:'-550px',marginLeft:'29%',borderRadius:'20px'}}/> */}

              </div>
            </div>
            <div className="row" style={{ height: '50px' }}></div>

            <h3 className='text-center'>Analysis</h3>
            <hr />
            <div className='d-flex justify-content-around align-items-center'>
              <p className="fw-bolder">Total No of User: <span style={{ fontSize: '25px' }} className='text-success ms-2'>{users.length}</span></p>
              <p className="fw-bolder">Total No of Post: <span style={{ fontSize: '25px' }} className='text-warning ms-2'>{totalpost.length}
              </span></p>
              {/*  */}
              <h5>No of cases:<span style={{ fontSize: '25px' }}  className={flag.length < 50 ? "text-warning fw-bolder" : "text-danger fw-bolder "}> {flag.length}</span></h5>
              {/* <p className="fw-bolder">No of Accounts taken down : <span style={{ fontSize: '25px' }} className='text-danger ms-2'>0
              </span></p> */}
            </div>


            {/* <div className='d-flex justify-content-end' style={{ position: 'relative' }}>
              <div className="piechart bg-success" style={{ width: '200px', height: '200px', borderRadius: '50%', position: 'absolute' }}></div>
              <div className="piechart bg-warning" style={{ width: '200px', height: '200px', borderRadius: '50%', position: 'absolute' }}></div>
              <div className="piechart bg-danger" style={{ width: '200px', height: '200px', borderRadius: '50%', position: 'absolute' }}></div>
            </div> */}

          </div>
          <div className="col"></div>
        </div>

      </div>
      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        {postData[0]? 
          (<Modal.Body className='bg-dark p-5'>
            <img src={`${SERVER_URL}/uploads/${postData[0].image}`} alt="" className='img-fluid' style={{width:'100%',height:'450px'}}/>
            <p className='text-light fw-bolder mt-2'>{postData[0].username}: <span className="text-light fw-normal ms-2">{postData[0].caption}</span> </p>
          </Modal.Body>)
         : 
          (<Modal.Body className='bg-dark p-5'>
            <p className="text-danger">Post Not found!!! User has deleted the post</p>
          </Modal.Body>)
        }
        <Modal.Footer className='bg-dark d-flex justify-content-around align-item-center'>
          <Button className='w-25' onClick={() => setModalShow(false)}>Close</Button>
          <Button className='btn btn-success w-25' onClick={() => handleremovereportmodal(postData[0])}> <i className="fa-solid fa-trash"></i> Mark report Invalid</Button>

          <Button className='btn btn-danger w-25' onClick={() => handleremovePostmodal(postData[0])}> <i className="fa-solid fa-trash"></i> Delete</Button>
        </Modal.Footer>
      </Modal>
      {/* <Modal
        show={reqinvmodal}
        onHide={() => setReqinvmodal(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        {ReqinvpostData ? (
          <Modal.Body className='bg-dark p-5'>
            <div className='d-flex align-items-center justify-content-center'>
              <img src={`${SERVER_URL}/uploads/${ReqinvpostData[0].image}`} alt="" className='img-fluid' style={{ height: '200px' }} />
              <p className='text-light fw-bolder m-auto'>{ReqinvpostData[0].username}: <span className="text-light fw-normal ms-2">{ReqinvpostData[0].caption}</span> </p>
            </div>
            <hr />
            <h5 className="text-success text-center fw-bolder">Are you sure? You are about to delete the report</h5>
            <p className="text-danger fw-bolder text-center">ie,You didn't find anything offensive in this post</p>
          </Modal.Body>
        ) : (
          <Modal.Body className='bg-dark p-5'>
            <p className="text-danger">Post Not found!!! User has deleted the post</p>
          </Modal.Body>
        )}
        <Modal.Footer className='bg-dark d-flex justify-content-around align-item-center'>
          <Button className='w-25' onClick={() => setReqinvmodal(false)}>Close</Button>
          <Button className='btn btn-success w-25' onClick={() => handleremovereport(ReqinvpostData[0])}> <i className="fa-solid fa-trash"></i> Delete Report</Button>
        </Modal.Footer>
      </Modal> */}
      <Modal
        show={delmodal}
        onHide={() => setDelmodal(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        {delpostData ? (<Modal.Body className='bg-dark p-5'>

          <img src={`${SERVER_URL}/uploads/${delpostData[0].image}`} alt="" className='img-fluid' />
          <p className='text-light fw-bolder mt-2'>{delpostData[0].username} <span className="text-light fw-normal ms-2">{delpostData[0].caption}</span> </p>
        </Modal.Body>) : (<Modal.Body className='bg-dark p-5'>
          <p className="text-danger">Post Not found!!!  User has deleted the post</p>

        </Modal.Body>)}
        <Modal.Footer className='bg-dark d-flex justify-content-around align-item-center'>

          <Button className='w-25' onClick={() => setDelmodal(false)}>Close</Button>
          <Button className='btn btn-danger w-25' onClick={()=>handleremovePost(delpostData[0])}> <i className="fa-solid fa-trash"></i> Delete</Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer position='top-center' theme='colored' autoClose={3000} />

    </>
  )
}

export default Admindashboard
