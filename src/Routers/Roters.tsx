import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from '../Pages/Login';
import CommentSection from '../Pages/CommentSection';


const Roters = () => {
  return (
   <>
    <BrowserRouter>
    <Routes>
   
    <Route path="/" element={<Login />} />
    <Route path="/commentSection/:userName" element={<div className='bg-[#dddef4] max-w-full h-screen'><CommentSection /></div>} />
    

    </Routes>
    
    </BrowserRouter>
   </>
  )
}

export default Roters