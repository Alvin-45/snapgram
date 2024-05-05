import { Route, Routes } from 'react-router-dom';
import './App.css'
import Auth from './components/Auth';
import Home from './components/Home'
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login';
import Search from './pages/Search';
import Friendspage from './pages/Friendspage';
import Messages from './pages/Messages';
import Profile from './components/Profile';
import Addpostpage from './pages/Addpostpage';
import UserProfile from './pages/UserProfile';
import AdminRegister from './admin/AdminRegister';
import Adminlogin from './admin/Adminlogin';
import Admindashboard from './admin/Admindashboard';
import AdminFeed from './admin/AdminFeed';
import AdminSearch from './admin/AdminSearch';
import AdminUserProfile from './admin/AdminUserProfile';
import AdminProfile from './admin/AdminProfile';
import Bookmark from './pages/Bookmark';
import Updateprofile from './pages/Updateprofile';


function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/sign-up'element={<Auth/>}></Route>
      <Route path='/signup'element={<Auth/>}></Route>
      <Route path='/login'element={<Login/>}></Route>
      <Route path='/search'element={<Search/>}></Route>
      <Route path='/friends'element={<Friendspage/>}></Route>
      <Route path='/messages'element={<Messages/>}></Route>
      <Route path='/profile'element={<Profile/>}></Route>
      <Route path='/add-post'element={<Addpostpage/>}></Route>
      <Route path='/user-Profile'element={<UserProfile/>}></Route>
      <Route path='/adminsignup'element={<AdminRegister/>}></Route>
      <Route path='/adminlogin'element={<Adminlogin/>}></Route>
      <Route path='/admindashboard'element={<Admindashboard/>}></Route>
      <Route path='/adminfeed'element={<AdminFeed/>}></Route>
      <Route path='/adminsearch'element={<AdminSearch/>}></Route>
      <Route path='/adminusersearch'element={<AdminUserProfile/>}></Route>
      <Route path='/adminprofile'element={<AdminProfile/>}></Route>
      <Route path='/saved'element={<Bookmark/>}></Route>
      <Route path='/updateprofile'element={<Updateprofile/>}></Route>

      <Route path='/*'element={<Home/>}></Route>

    </Routes>
     

    </>
  )
}

export default App
