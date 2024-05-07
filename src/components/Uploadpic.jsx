import React, { useContext, useEffect, useState } from 'react'
import userimg from '../assets/user.png'
import { profilepicContext } from '../Context/ContextAPI'
import { useNavigate } from 'react-router-dom'
import { profilepicAPI } from '../../services/allAPI'
import { toast } from 'react-toastify'

function Uploadpic() {
    const navigate=useNavigate()
    const { updateprofilepic, setUpdateprofilepic } = useContext(profilepicContext)
    const [imageFileStatus, setImageFileStatus] = useState(false)
    const [userInput, setUserinput] = useState({
        profileImage: ''
    })
    const [preview, setPreview] = useState("")
    sessionStorage.setItem('updateprofilepic', updateprofilepic.username)
    useEffect(() => {
        if (userInput.profileImage.type == "image/png" || userInput.profileImage.type == "image/jpg" || userInput.profileImage.type == "image/jpeg" || userInput.profileImage.type == "image/avif" || userInput.profileImage.type == "video/mp4" || userInput.profileImage.type == "image/webp") {
            setImageFileStatus(true)
            setPreview(URL.createObjectURL(userInput.profileImage))
        } else {
            setPreview(userimg)
            setImageFileStatus(false)
            setUserinput({ ...userInput, profileImage: "" })
        }

    }, [userInput.profileImage])

    const handleuploadpic = async () => {
        console.log(updateprofilepic);
        console.log('Inside upload fn');
        const profileImage = userInput.profileImage
        console.log(profileImage);

        const reqBody = new FormData()
        reqBody.append("profileImage", profileImage)

        const token = sessionStorage.getItem("token")
        if (token) {
            const reqHeader = {
                "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${token}`
            }
            
            try {


                const result = await profilepicAPI(reqBody,reqHeader)
                console.log(result);
                if (result.status == 200) {

                    console.log('success');
                    alert("profilepic updated successfully!!!")
                    navigate('/login')
                }
            } catch (err) {
                toast.warning('Provide profileImage to continue!!!')
                console.log('failed');
                console.log(err);
            }
        }
    }
  return (
    <>
    <div className='d-flex justify-content-center align-items-center text-light flex-column' style={{ height: '100vh',backgroundColor:'black' }}>
    <h1 className="title">Snapgram</h1>
                    <div className="container shadow d-flex justify-content-center align-items-center flex-column p-5 w-50">
                        
                        <h5>Update Profile</h5>
                        <label>
                            <img src={preview} alt="" style={{ width: '150px', height: '150px', borderRadius: '50%' }} />
                            <input type="file" name="" id="" style={{ display: 'none' }} onChange={(e) => setUserinput({ ...userInput, profileImage: e.target.files[0] })} />
                        </label>
                        <div className='d-flex justify-content-evenly w-50'><h5 className='mt-4' style={{marginLeft:'10px'}}>Username:</h5>
                        <h5 className='mt-4' >{updateprofilepic.username}</h5></div>
                        <div className='d-flex justify-content-evenly w-50'><h5  className='me-4'  style={{marginLeft:'10px'}}>Name:</h5>
                        <h5>{updateprofilepic.firstName}</h5>
                        </div>
                        <div className='d-flex justify-content-center w-50'><h5>Email:</h5>
                        <h5>{updateprofilepic.email}</h5>
                        </div>
                        
                        <button className="btn btn-primary mt-5" onClick={handleuploadpic}>Update profile</button>
                    </div>
                </div>
    </>
  )
}

export default Uploadpic