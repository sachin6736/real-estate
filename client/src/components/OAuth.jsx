import React from 'react';
import {GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { Link, useNavigate } from 'react-router-dom';


export default function OAuth() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handlegoogle = async()=>{
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth,provider);
      const res = await fetch ('api/auth/google',{
        method:'POST',
        headers:{
          'content-Type':'application/json',
        },
        body: JSON.stringify({
          username:result.user.displayName,
          email:result.user.email,
          photo:result.user.photoURL
        })
      })
      const data = await res.json();
      dispatch(signInSuccess(data));
      navigate('/');
    } catch (error) {
      console.log("error occured during google sign in",error);
    }
  }
  return (
    <button onClick={handlegoogle} type='button' className='bg-red-700 p-2 rounded-md hover:text-white font-semibold ' >continue with google</button>
  )
}
