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

      <Route path='/*'element={<Home/>}></Route>

    </Routes>
     

    </>
  )
}

export default App
