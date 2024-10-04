import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function SignUp() {
  const [formData, setformData] = useState({});
  const handleChange = (e)=>{
    setformData({
      ...formData,
      [e.target.id]: e.target.value
    })
    console.log(formData)
  }
  const handleSubmit = async(e)=>{
    e.preventDefault();
    const res = await fetch('/api/Auth/Signup', 
      {
        method:'POST',
        headers:{
          'Content-Type':"application/json",
        },
        body:JSON.stringify(formData)
      });
      const data= await res.json();
      console.log("this is the data sent",data)
  }
  return (
    <div className='p-3 max-w-lg mx-auto w-full ' >
      <h1 className='text-3xl text-center font-bold my-8' >Sign Up </h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-3 w-full ' >
        <input className='border p-3 rounded-md  w-full  focus:outline-blue-600 ' type='text' placeholder='username' id='username' onChange={handleChange} />
        <input className='border p-3 rounded-md  w-full focus:outline-blue-600 ' type='text' placeholder='email' id='email' onChange={handleChange} />
        <input className='border p-3 rounded-md  w-full focus:outline-blue-600 ' type='text' placeholder='password' id='password' onChange={handleChange} />
        <input className='border p-3 rounded-md  w-full focus:outline-red-700' type='text' placeholder='confirm password' id='cpassword' onChange={handleChange} />
        <button style={{backgroundColor: 'rgb(59,108,246)'}} className='rounded-md p-2 my-8 font-semibold  hover:text-white w-full ' >SignUp</button>
      </form>
      <div className='flex gap-1  justify-center flex-wrap text-center  '>
        <p className='text-blue-700' >Already have an account?</p>
        <Link to={"/Sign-In"}>
          <span className='font-bold hover:text-blue-700 ' >Sign-In</span>
        </Link>
      </div>
    </div>
  )
}
