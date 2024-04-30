import React from 'react'
import { modaldataContext } from '../Context/ContextAPI'

function AdminSearchpost() {
    const {modaldata, SetModaldata}=useContext(modaldataContext)

  return (
    <>
    <div className="bg-dark">
        <img src={`${SERVER_URL}/uploads/${modaldata.image}`} alt="No data" />
    </div>
    </>
  )
}

export default AdminSearchpost