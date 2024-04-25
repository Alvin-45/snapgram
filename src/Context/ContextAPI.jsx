import React, { createContext, useState } from 'react'
export const addResponseContext = createContext()
export const lResponseContext = createContext()
export const editResponseContext = createContext()
export const friendResponseContext = createContext()
function ContextAPI({ children }) {
    const [lResponse, setLResponse] = useState(false)
    const [editResponse, setEditResponse] = useState("")
    const [friendResponse, setFriendResponse] = useState(false)
    const [addResponse, setAddResponse] = useState("")


    return (
        <>
            <addResponseContext.Provider value={{ addResponse, setAddResponse }}>

                <friendResponseContext.Provider value={{ friendResponse, setFriendResponse }}>
                    <editResponseContext.Provider value={{ editResponse, setEditResponse }}>
                        {children}
                    </editResponseContext.Provider>
                </friendResponseContext.Provider>
            </addResponseContext.Provider>

        </>
    )
}

export default ContextAPI