import React, { useState } from 'react'

import { Field, Form, Formik,getIn ,FormikProps,ErrorMessage, FormikErrors} from 'formik';
import {Sinup} from '../components/validation'
import {Link,useNavigate} from "react-router-dom"
import {useDispatch,useSelector} from 'react-redux'
import {initial} from '../reducer/Reducer'


const SingUp = () => {
    const dispatch=useDispatch();
    const  Navigate=useNavigate();
    const sinuppage=useSelector((state:initial)=>state.sinuppage)
    
    const styles = "h-12 mt-1 pl-4 w-full font-bold text-base rounded-md  border-[#dfe3fa] border-solid border-2 hover:border-[#7C5DFA] focus:outline-none focus:border-[#7C5DFA]";
  return (
    <>
    <div className=' '>
  <div className='flex justify-center items-center'>

    <div className='   h-3/5 w-[500px] flex flex-col p-12 rounded-2xl mt-10 ' style={{backgroundColor:"rgba(41, 39, 39, 0.3)",boxShadow: " -3px -3px 12px #aaa9a9a2"}}>
        <h1 className='text-center font-extrabold p-8 font-serif  text-3xl text-[#f7fff9]'>Create a new account</h1>
<Formik  
       enableReinitialize
       initialValues={{ firstrname: "" ,
       lastname: "" ,
       username: "" ,
       password:"",
       repassword:"",
      }}
       validationSchema={Sinup}
       onSubmit={(values, actions) => {
    
            // alert(JSON.stringify(values, null, 2));
           
        //    const data = JSON.parse(`${localStorage.getItem('userName')}`);
        //    localStorage.setItem("userName", JSON.stringify(values.username));
          //  if (data == null) {
             
       
          //  } else {
          //    localStorage.setItem("userName", JSON.stringify([...data, values.username]));
          
          //  }   
          dispatch({type:"SINUP_PAGE",payload:{sinuppage:[...sinuppage,values]}})

           Navigate(`/`)
        
       
       }}
     >
     
     {({ values, handleChange, handleBlur, handleSubmit,errors, }) => (
         <Form onSubmit={handleSubmit}>
            <div className='grid grid-cols-1  '>
            <div >
                <div className='flex'>
                <div className=''>
                    <p className='text-[#f7fff9] text-lg py-3 ml-3'>First Name</p>
                    <Field  name="firstname" className="h-12 mt-1 pl-4 w-full  font-bold text-base rounded-md  border-[#dfe3fa] border-solid border-2 hover:border-[#7C5DFA] focus:outline-none focus:border-[#7C5DFA]" />
                    <ErrorMessage
                name="firstname"
                component="div"
                className="text-red-600"
              />
                    </div>
                    <div >
                    
                    
                    <p className='text-[#f7fff9] text-lg py-3 ml-3'>Lsat Name</p>
                    
                    {/* style={getStyles(errors:string, `username`)} */}
                 
                    <Field  name="lastname" className="h-12 mt-1 pl-4 ml-3 w-full  font-bold text-base rounded-md  border-[#dfe3fa] border-solid border-2 hover:border-[#7C5DFA] focus:outline-none focus:border-[#7C5DFA]" />
                    {/* style={getStyles(errors:string, `username`)} */}
                    <ErrorMessage
                name="lastname"
                component="div"
                className="text-red-600"
              />
                    
                    </div>
           
                    </div>
            
            </div>
            
                <div>
                    <p className='text-[#f7fff9] text-lg py-3'>Username</p>
                
            <Field  name="username" className={styles} />
            <ErrorMessage
                name="username"
                component="div"
                className="text-red-600"
              />
            {/* style={getStyles(errors:string, `username`)} */}
            
            </div>
            <div>
            <p className='text-[#f7fff9] text-lg py-3'>Password</p>
            
            <Field  name="password" type="password" className={styles}  />
            <ErrorMessage
                name="password"
                component="div"
                className="text-red-600"
              />
            </div>
            <div>
            <p className='text-[#f7fff9] text-lg py-3'>Confirm Password</p>
            
            <Field  name="repassword" type="password" className={styles}  />
            <ErrorMessage
                name="repassword"
                component="div"
                className="text-red-600"
              />
            </div>

            <div className='flex justify-center items-center'>


         <button type="submit" className='w-56 mt-8 h-12 rounded-full text-white
        bg-gradient-to-r from-purple-500 via-red-500 to-yellow-500 text-xl font-bold'>Sign Up</button>
        </div>
           </div>
         </Form>
       )}
     </Formik>
     


     </div>
   </div>
   </div>
    </>
  )
}

export default SingUp