import React, { useState ,useRef , useEffect} from 'react';
import { useSelector,useDispatch } from 'react-redux';
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage';
import {app} from '../firebase';
import {updateUserFailure,updateUserSuccess,updateUserStart,deleteUserFailure,deleteUserStart,deleteUserSuccess,signOutUserStart,} from '../redux/user/userSlice'
  
  



export default function Profile() {
  const fileRef = useRef(null)
  const {currentUser} = useSelector((state)=>state.user);
  const [file,setFile]= useState(undefined);
  const [fileperc ,setFileperc]= useState(0);
  const [fileUploadError, setFileUploadError]=useState(false);
  const [formData, setFormData]=useState({});
  const dispatch = useDispatch();
  console.log("this is formdata",formData);
  console.log(fileperc);
  console.log(fileUploadError)

  useEffect(()=>{
    if(file){
      handleFileUpload(file)
    }
  },[file]);
  const handleFileUpload=(file)=>{
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    
    uploadTask.on('state_changed',(snapshot)=>{
      const progress = (snapshot.bytesTransferred / 
        snapshot.totalBytes) * 100;
        setFileperc(Math.round(progress))
        // console.log('upload is' + progress + '% done')
      
    },
    (error)=>{
      setFileUploadError(true)
    },
    ()=>{
      getDownloadURL(uploadTask.snapshot.ref).then
      ((downloadURL)=>{
        setFormData({...formData, profile: downloadURL})
      })
    });

  }

const handleChange = (e)=>{
  setFormData({...formData, [e.target.id]: e.target.value})
};
const handleSubmit =async (e)=>{
  e.preventDefault();
  try {
    dispatch(updateUserStart());
    const res = await fetch(`/api/user/update/${currentUser._id}`,
      {
        method:"POST",
        headers:{
          'content-Type':'application/json',
        },
        body:JSON.stringify(formData)
      })
    const data = await res.json();
    if(data.success === false){
      dispatch(updateUserFailure(error.message));
      return;
    }
    dispatch(updateUserSuccess(data));
  } catch (error) {
    dispatch(updateUserFailure(error.message))
  };
}

const handleDeleteUser = async () => {
  try {
    dispatch(deleteUserStart());
    const res = await fetch(`/api/user/delete/${currentUser._id}`, {
      method: 'DELETE',
    });
    const data = await res.json();
    if (data.success === false) {
      dispatch(deleteUserFailure(data.message));
      return;
    }
    dispatch(deleteUserSuccess(data));
  } catch (error) {
    dispatch(deleteUserFailure(error.message));
  }
};
const handleSignOut = async () => {
  try {
    dispatch(signOutUserStart())
    const res = await fetch('/api/auth/signout');
    const data = await res.json();
    if (data.success === false) {
      dispatch(deleteUserFailure(data.message));
      return;
    }
    dispatch(deleteUserSuccess(data));
  } catch (error) {
    dispatch(deleteUserFailure(data.message));
  }
}
  return (
    <div className='p-3 max-w-lg mx-auto mt-16 '>
     
      <form onSubmit={handleSubmit} className='flex flex-col gap-3' >
        <input onChange={(e)=>setFile(e.target.files[0])} type='file' ref={fileRef} hidden accept='image/*'/>
      <img onClick={()=>fileRef.current.click()} className='rounded-full h-16 w-16 object-cover self-center mt-2 cursor-pointer  ' src={currentUser.profile ||'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8Y5xaNg8XHozP4KA0hfpm46f653K0-Cb1Dg&s'} alt='profile'/>
      <p className='text-sm self-center' >
        {fileUploadError ? (
         <span className='text-red-700'>error in image upload</span> 
        ) : fileperc>0 && fileperc<100?(
          <span className='text-slate-700'>{`uploading ${fileperc}%`}</span>
        ):fileperc === 100 ?(
          <span className='text-green-700'>image uploaded</span>
        ):('')}
      </p>
      
      <input type='text' placeholder='username' defaultValue={currentUser.username} id='username' className='border p-3 rounded-lg  focus:outline-blue-600 'onChange={handleChange} /> 
      <input type='text' placeholder='email' defaultValue={currentUser.email} id='email' className='border p-3 rounded-lg  focus:outline-blue-600 'onChange={handleChange} />
      <input type='text' placeholder='password' id='password' className='border p-3 rounded-lg  focus:outline-red-700 'onChange={handleChange} />

      <button
          style={{ backgroundColor: 'rgb(59,108,246)' }}
          className="rounded-md p-2  font-semibold hover:text-white w-full"
        >update</button>
      </form>
      <div className='flex justify-between mt-5' >
        <span
          onClick={handleDeleteUser}
          className='text-red-700 cursor-pointer'
        >
          Delete account
        </span>
        <span onClick={handleSignOut} className='text-red-700 cursor-pointer'>Sign out</span>
      </div>
    </div>
  )
}
