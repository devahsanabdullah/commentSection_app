import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from '../Pages/Login';
import CommentSection from '../Pages/CommentSection';
import SingUp from '../Pages/SingUp';


const Roters = () => {
  return (
   <>
    <BrowserRouter>
    <Routes>
   
    <Route path="/" element={<div className='bg-gradient-to-r from-indigo-500  max-w-full min-h-screen'><Login /> </div>}/>
    <Route path="/SingUp" element={<div className='bg-gradient-to-r from-indigo-500  max-w-full min-h-screen'><SingUp/> </div>}/>
    <Route path="/commentSection/:userName" element={<div className='bg-[#f7f7f7] max-w-full min-h-screen'><CommentSection /></div>} />
    

    </Routes>
    
    </BrowserRouter>
   </>
  )
}

export default Roters