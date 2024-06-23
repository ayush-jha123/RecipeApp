import React from 'react'
import googleIcon from '../assets/google1.jpg';
import {GoogleAuthProvider,getAuth,signInWithPopup} from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { app } from '../firebase';
import { google} from '../api';
import { signup } from '../redux/user/userSlice';


const OAuth = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const handleGoogleClick=async()=>{
    try {
      const provider=new GoogleAuthProvider();
      const auth=getAuth(app)
      const result=await signInWithPopup(auth,provider);
      const res=await google({
        name:result.user.displayName,
        email:result.user.email,
        profilePhoto:result.user.photoURL
      })
      console.log(res);
      dispatch(signup(res?.data));
      navigate('/');
    } catch (error) {
      console.log("Could not login with google",error)
    }
  }
  return (
    <button type='button' onClick={handleGoogleClick} className='w-full justify-center flex flex-row bg-slate-100 p-2.5 rounded-lg  hover:bg-slate-400 gap-1 ring-1'>
        <img src={googleIcon} alt=""  className='w-6 rounded-full'/>
        <p className='text-md font-semibold font-mono'>Continue with google</p>
    </button>
  )
}

export default OAuth