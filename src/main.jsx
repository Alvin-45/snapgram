import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import ContextAPI from './Context/ContextAPI.jsx'
import { Provider } from 'react-redux'
import chatStore from './Redux/chatStore.js'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { GoogleOAuthProvider } from '@react-oauth/google'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <ContextAPI>
     <BrowserRouter> 
     <Provider store={chatStore}>
      {/* <GoogleOAuthProvider clientId='327565181557-41n69gen4vd2it6j86ca097385l58uok.apps.googleusercontent.com'> */}
        <App />
        {/* </GoogleOAuthProvider> */}
      </Provider>
     </BrowserRouter>
   </ContextAPI>
  </React.StrictMode>,
)
