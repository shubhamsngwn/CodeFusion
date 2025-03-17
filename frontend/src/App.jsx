import React, {useState} from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css"
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Editior from './pages/Editior';
import RoomId from './pages/RoomId';
import Navbar from './components/Navbar';
import GeminiAPI from './components/AskBot';
import Jitsi from './components/Jitsi';

const App = () => {
  let isLoggedIn = localStorage.getItem("isLoggedIn");
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
          <Route path='/gemini' element={<GeminiAPI />}/>
          {/* <Route path='/editior' element={<Editior />}/> */}
          <Route path='/editior/:projectID' element={isLoggedIn ? <Editior /> : <Navigate to="/login"/>} />
          <Route path="*" element={isLoggedIn ? <Home />: <Navigate to="/login"/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App