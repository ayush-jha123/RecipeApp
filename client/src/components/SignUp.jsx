import React, { useState } from "react";
import auth from "../assets/auth2.png";
import OAuth from "./OAuth";
import { signIn,signUp } from "../api";
import { useNavigate } from "react-router-dom";
import {useDispatch} from 'react-redux'
import { signin,signup } from "../redux/user/userSlice";

const SignUp = () => {
  const [toogle, setToggle] = useState(true);
  const [formData,setFormData]=useState({});
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const handleChange=(e)=>{
    setFormData({...formData,[e.target.name]:e.target.value})
  }
  const handleSubmit=async (e)=>{
    e.preventDefault();
    try {
      if(toogle){
        const response=await signUp(formData);
        console.log(response);
        dispatch(signup(response?.data));
      }else{
        const response=await signIn(response?.data?.result);
        dispatch(signin(response));
      }
      alert('You are authenticated successfully');
      navigate('/');
    } catch (error) {
      alert('some error Occurred!! Try Again')
    }
    
  }
  return (
    <div className="min-h-screen min-w-screen flex flex-row ">
      <div className="w-1/2 flex justify-center items-center max-lg:hidden">
        <img src={auth} alt="" className="w-full h-full p-12" />
      </div>
      <div className="w-1/2 flex justify-center items-center bg-slate-50 max-lg:w-full">
        <div className="bg-white w-1/2 flex justify-center flex-col p-4 space-y-3 rounded-lg ring-1 max-md:w-3/4 ">
          <h1 className="text-center font-semibold text-lg ">
            {toogle ? "SignUp" : "SignIn"}
          </h1>
          <div className="space-y-2">
            <OAuth />
            <div className="flex items-center w-full">
              <hr className="flex-grow border-t border-gray-300" />
              <span className="mx-2 text-gray-500 font-semibold text-lg">
                or
              </span>
              <hr className="flex-grow border-t border-gray-300" />
            </div>
            <form className="flex flex-col space-y-3">
              {toogle && (
                <>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-900 "
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="title"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Your Name"
                    onChange={handleChange}
                  />
                </>
              )}
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-900 "
              >
                Your Email
              </label>
              <input
                type="text"
                name="email"
                id="title"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="xxx@gmail.com"
                onChange={handleChange}
              />

              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-900 "
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="title"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="*********"
                onChange={handleChange}
              />
              {toogle && (
                <>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-900 "
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    id="title"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="***********"
                    onChange={handleChange}
                  />
                </>
              )}
              {toogle ? (
                <p className="font-serif">
                  Already have Account?
                  <button
                    type="button"
                    className="font-semibold cursor-pointer"
                    onClick={() => setToggle((prev) => !prev)}
                  >
                    SignIn
                  </button>
                </p>
              ) : (
                <p className="font-serif">
                  Don't have Account?
                  <button
                    type="button"
                    className="font-semibold cursor-pointer"
                    onClick={() => setToggle((prev) => !prev)}
                  >
                    SignUp
                  </button>
                </p>
              )}
              <button type="submit" className="black_btn " onClick={handleSubmit}>Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
