import React, {useState} from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css"
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Editior from './pages/Editior';
import RoomId from './pages/RoomId';
import Navbar from './components/Navbar';
import Jitsi from './components/Jitsi';
import RoomMembers from './components/RoomMembers';
import OtherLngCodeEditor from './components/OtherLngCodeEditor'

import { io } from 'socket.io-client';


const App = () => {
  let isLoggedIn = localStorage.getItem("isLoggedIn");
  const socket = io("http://localhost:5000/");

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={isLoggedIn ? <Home /> : <Navigate to="/login"/>} />
          <Route path='/signUp' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
          <Route path='/roomId' element={<RoomId />} />
          <Route path='/navbar' element={<Navbar />}/>
          <Route path='/jitsi' element={<Jitsi />}/>
          {/* <Route path='/home' element={<Home/>} /> */}
          <Route path='/otherlanguages' element={<OtherLngCodeEditor />}/>
          <Route path='/roomMembers' element={<RoomMembers />}/>
          <Route path='/editior/:projectID' element={isLoggedIn ? <Editior socket={socket}/> : <Navigate to="/login"/>} />
          <Route path="*" element={isLoggedIn ? <Home />: <Navigate to="/login"/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App