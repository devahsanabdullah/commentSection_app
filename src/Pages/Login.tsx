import React from 'react'

import { Field, Form, Formik,getIn } from 'formik';
import {SinupValdation} from '../components/validation'
import {Link,useNavigate} from "react-router-dom"


const Login = () => {
  const Navigate =useNavigate();
  
    function getStyles(errors:string, fieldName:string) {
        if (getIn(errors, fieldName)) {
          return {
            border: '1px solid red'
          }
        }
      }
      function generate() {
        let length = 3;
        const number = "1234567890";
        let result = " ";
        const numberLenght = number.length;
        for (let i = 0; i < length; i++) {
          result += number.charAt(Math.floor(Math.random() * numberLenght));
        }
        return parseInt(result) ;
      }
      const RandomNumber= generate()
    const styles = "h-12 mt-1 pl-4 font-bold text-base rounded-md  border-[#dfe3fa] border-solid border-2 hover:border-[#7C5DFA] focus:outline-none focus:border-[#7C5DFA]";
  return (
    <div className=' '>
  <div className='flex justify-center items-center'>

    <div className='   h-3/5 w-96 flex flex-col rounded-2xl mt-10 ' style={{backgroundColor:"rgba(41, 39, 39, 0.3)",boxShadow: " -3px -3px 9px #aaa9a9a2"}}>
        <h1 className='text-center font-extrabold p-8  text-3xl text-[#f7fff9]'>Login</h1>
<Formik  
       enableReinitialize
       initialValues={{ username: "" ,
       password:"",
      id:RandomNumber}}
       validationSchema={SinupValdation}
       onSubmit={(values, actions) => {
    
          //  alert(JSON.stringify(values, null, 2));
           const data = JSON.parse(`${localStorage.getItem('userName')}`);
           localStorage.setItem("userName", JSON.stringify(values.username));
          //  if (data == null) {
             
       
          //  } else {
          //    localStorage.setItem("userName", JSON.stringify([...data, values.username]));
          
          //  }   

           Navigate(`/commentSection/${values.username}`)
        
       
       }}
     >
     
     {({ values, handleChange, handleBlur, handleSubmit,errors, }) => (
         <Form onSubmit={handleSubmit}>
            <div className='grid grid-cols-1 px-16 '>
                <div>
                    <p className='text-[#f7fff9] text-lg py-3'>Username</p>
                
            <Field  name="username" className={styles} />
            {/* style={getStyles(errors, `username`)} */}
            </div>
            <div>
            <p className='text-[#f7fff9] text-lg py-3'>Password</p>
            
            <Field  name="password" type="password" className={styles}  />
            </div>


         <button type="submit" className='w-56 mt-8 h-12 rounded-full text-white
        bg-gradient-to-r from-purple-500 via-red-500 to-yellow-500 text-xl font-bold'>Login</button>
           </div>
         </Form>
       )}
     </Formik>
     <div className='flex justify-center py-5'>
     <p>Not a member?</p> <span className='text-blue-500'>Signup now</span>
     </div>


     </div>
   </div>
   </div>
  )
}

export default Login