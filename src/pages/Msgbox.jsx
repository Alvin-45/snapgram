import React, { useContext, useState } from 'react'
import { chataddResponseContext, chatstartResponseContext } from '../Context/ContextAPI';
import { addChatAPI } from '../../services/allAPI';


function Msgbox() {
  const { chatstartResponse, setChatstartResponse } = useContext(chatstartResponseContext)
  const { chataddResponse, setChataddResponse } = useContext(chataddResponseContext)

  const [chatData, setChatData] = useState({
    sender: "", receiver: "", chatmessage: "" 
  })
  const handleuploadChat = async () => {
    const lsender = sessionStorage.getItem('username').replace(/^"(.*)"$/, '$1');
    setChatData({ ...chatData, sender: lsender, receiver: chatstartResponse.fname });
    if (chatstartResponse && chatData.chatmessage) {
      const token = sessionStorage.getItem("token");
      const reqBody = { chatmessage: chatData.chatmessage };
      const reqHeader = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      };

      try {
        const result = await addChatAPI(chatstartResponse.fname, lsender, reqBody, reqHeader);
        // console.log(result);
        if (result.status === 200) {
          setChataddResponse(result.status);
          setChatData({ ...chatData, chatmessage: "" })
        } else {
          console.log(result);
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log('Error: chatstartResponse or chatData.chatmessage is null or undefined.');
    }
  };
  return (
    <>
    <input type="text" className='bg-dark w-75 rounded text-light' value={chatData.chatmessage} onChange={(e) => setChatData({ ...chatData, chatmessage: e.target.value })} placeholder='Type Here...' />
                    <button className="btn btn-primary" onClick={handleuploadChat}><i className="fa-regular fa-paper-plane"></i> Send</button>
    </>
  )
}

export default Msgbox