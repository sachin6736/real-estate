import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.user); // Get loading and error from Redux state

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      dispatch(signInFailure('All fields are necessary'));
      return;
    }

    dispatch(signInStart()); // Set loading to true and clear previous errors

    try {
      const res = await fetch('/api/Auth/Signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        dispatch(signInFailure(errorData.message || 'An error occurred during signin'));
        return;
      }

      const data = await res.json();
      dispatch(signInSuccess(data)); // Dispatch success action with response data
      navigate('/'); // Redirect after successful sign-in
    } catch (err) {
      dispatch(signInFailure('An error occurred during signin'));
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto w-full">
      <h1 className="text-3xl text-center font-bold my-8">Sign In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full">
        <input
          className="border p-3 rounded-md w-full focus:outline-blue-600"
          type="text"
          placeholder="email"
          id="email"
          onChange={handleChange}
        />
        <input
          className="border p-3 rounded-md w-full focus:outline-blue-600"
          type="password"
          placeholder="password"
          id="password"
          onChange={handleChange}
        />
        {error && <p className="text-red-500 text-center font-bold">{error}</p>}
        <button
          style={{ backgroundColor: 'rgb(59,108,246)' }}
          className="rounded-md p-2 my-8 font-semibold hover:text-white w-full"
          type="submit"
          disabled={loading} // Disable button when loading
        >
          {loading ? 'Loading...' : 'Sign In'}
        </button>
      </form>
      <div className="flex gap-1 justify-center flex-wrap text-center">
        <p className="text-blue-700">Don't have an account?</p>
        <Link to="/Sign-Up">
          <span className="font-bold hover:text-blue-700">Sign-Up</span>
        </Link>
      </div>
    </div>
  );
}
