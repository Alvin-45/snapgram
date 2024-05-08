import React, { createContext, useState } from 'react'
import { useContext } from 'react'
export const addResponseContext = createContext()
export const lResponseContext = createContext()
export const editResponseContext = createContext()
export const friendResponseContext = createContext()
export const addCommentResponseContext = createContext()
export const likecountResponseContext = createContext()
export const userResponseContext = createContext()
export const postremoveResponseContext = createContext()
export const friendremoveResponseContext = createContext()
export const chatstartResponseContext = createContext()
export const chataddResponseContext = createContext()
export const responseinvalidContext = createContext()
export const modaldataContext = createContext()
export const commentdeleteContext = createContext()
export const editProfileContext = createContext()
export const profilepicContext = createContext()
export const likeremoveContext = createContext()


function ContextAPI({ children }) {
    const [lResponse, setLResponse] = useState(false)
    const [editResponse, setEditResponse] = useState("")
    const [friendResponse, setFriendResponse] = useState(false)
    const [addResponse, setAddResponse] = useState("")
    const [addCommentResponse, setAddCommentResponse] = useState("")
    const [likecountResponse, setLikecountResponse] = useState('')
    const [userResponse, setUserResponse] = useState("")
    const [poststatusResponse, setPostStatusResponse] = useState("")
    const [friendstatusResponse, setFriendStatusResponse] = useState("")
    const [chatstartResponse, setChatstartResponse] = useState("")
    const [chataddResponse, setChataddResponse] = useState("")
    const [responseinvalid, SetResponseinvalid] = useState("")
    const [modaldata, SetModaldata] = useState("")
    const [commentdlt, SetCommentdlt] = useState("")
    const [editprofile, SetEditProfile] = useState("")
    const [updateprofilepic,setUpdateprofilepic] = useState("")
    const [likeremove,setLikeremove] = useState("")


    return (
        <>
          <likeremoveContext.Provider value={{likeremove,setLikeremove}}>
              <profilepicContext.Provider value={{updateprofilepic,setUpdateprofilepic}}>
                  <editProfileContext.Provider value={{editprofile,SetEditProfile}}>
                      <commentdeleteContext.Provider value={{commentdlt, SetCommentdlt}}>
                          <modaldataContext.Provider value={{modaldata, SetModaldata}}>
                               <responseinvalidContext.Provider value={{responseinvalid,SetResponseinvalid}}>
                                   <chataddResponseContext.Provider value={{chataddResponse,setChataddResponse}}>
                                       <chatstartResponseContext.Provider value={{chatstartResponse,setChatstartResponse}}>
                                           <friendremoveResponseContext.Provider value={{friendstatusResponse,setFriendStatusResponse}}>
                                               <postremoveResponseContext.Provider value={{poststatusResponse,setPostStatusResponse}}>
                                                    <userResponseContext.Provider value={{ userResponse, setUserResponse }}>
                                                        <likecountResponseContext.Provider value={{ likecountResponse, setLikecountResponse }}>
                                                            <addCommentResponseContext.Provider value={{ addCommentResponse, setAddCommentResponse }}>
                                                                <addResponseContext.Provider value={{ addResponse, setAddResponse }}>
                                        
                                                                    <friendResponseContext.Provider value={{ friendResponse, setFriendResponse }}>
                                                                        <editResponseContext.Provider value={{ editResponse, setEditResponse }}>
                                                                            {children}
                                                                        </editResponseContext.Provider>
                                                                    </friendResponseContext.Provider>
                                                                </addResponseContext.Provider>
                                                            </addCommentResponseContext.Provider>
                                                        </likecountResponseContext.Provider>
                                                    </userResponseContext.Provider>
                                               </postremoveResponseContext.Provider>
                                           </friendremoveResponseContext.Provider>
                                       </chatstartResponseContext.Provider>
                                   </chataddResponseContext.Provider>
                               </responseinvalidContext.Provider>
                          </modaldataContext.Provider>
                      </commentdeleteContext.Provider>
                  </editProfileContext.Provider>
              </profilepicContext.Provider>
          </likeremoveContext.Provider>
        </>
    )
}

export default ContextAPI