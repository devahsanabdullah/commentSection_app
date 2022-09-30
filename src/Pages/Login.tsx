import React from "react";

import {
  Field,
  Form,
  Formik,
  ErrorMessage,
  getIn,
  FormikProps,
  FormikErrors,
} from "formik";
import { SinupValdation } from "../components/validation";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { initial } from "../reducer/Reducer";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const Navigate = useNavigate();
  const sinuppage = useSelector((state: initial) => state.sinuppage);

  function generate() {
    let length = 3;
    const number = "1234567890";
    let result = " ";
    const numberLenght = number.length;
    for (let i = 0; i < length; i++) {
      result += number.charAt(Math.floor(Math.random() * numberLenght));
    }
    return parseInt(result);
  }
  const RandomNumber = generate();
  const styles =
    "h-12 mt-1 pl-4 font-bold text-base rounded-md  border-[#dfe3fa] border-solid border-2 hover:border-[#7C5DFA] focus:outline-none focus:border-[#7C5DFA]";
  return (
    <div>
      <div className="flex justify-center items-center">
        <div
          className="   h-3/5 w-96 flex flex-col rounded-2xl mt-24 "
          style={{
            backgroundColor: "rgba(41, 39, 39, 0.3)",
            boxShadow: " -3px -3px 12px #aaa9a9a2",
          }}
        >
          <h1 className="text-center font-extrabold p-8 font-serif  text-3xl text-[#f7fff9]">
            Login
          </h1>
          <Formik
            enableReinitialize
            initialValues={{ username: "", password: "", id: RandomNumber }}
            validationSchema={SinupValdation}
            onSubmit={(values, actions) => {


              let data=sinuppage.find((data)=>data.username&&data.password===values.username&&values.password)

              if(data?.username&&data.password===values.username&&values.password)
              {
                Navigate(`/commentSection/${values.username}`);

              }
              else
              {
                toast.error('Enter Correct UserName and password!', {
                  position: "top-center",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  });

              }

              


              
              
            }}
          >
            {({ values, handleChange, handleBlur, handleSubmit, errors }) => (
              <Form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 px-16  place-conten-center place-items-center">
                  <div>
                    <p className="text-[#f7fff9] text-lg py-3">Username</p>

                    <Field name="username" className={styles} />
                    {/* style={getStyles(errors:string, `username`)} */}
                    <ErrorMessage
                      name="username"
                      component="div"
                      className="text-red-600"
                    />
                  </div>
                  <div>
                    <p className="text-[#f7fff9] text-lg py-3">Password</p>

                    <Field name="password" type="password" className={styles} />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-600"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-56 mt-8 h-12 rounded-full text-white
        bg-gradient-to-r from-purple-500 via-red-500 to-yellow-500 text-xl font-bold"
                  >
                    Login
                  </button>
                </div>
              </Form>
            )}
          </Formik>
          <div className="flex justify-center py-5">
            <p>Not a member?</p>{" "}
            <Link to={"/SingUp"}>
              <span className="text-blue-800 text-lg font-serif font-bold">
                Signup now
              </span>
            </Link>
          </div>
        </div>
      </div>
      <ToastContainer 
      position="top-center"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover/>;
    </div>
  );
};

export default Login;
