import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';

export default function SignUp() {
  const [formData, setformData] = useState({});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setformData({
      ...formData,
      [e.target.id]: e.target.value,
    });
    console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.username || !formData.email || !formData.password || !formData.cpassword) {
      setError('All fields are necessary');
      setLoading(false);
      return;
    }

    if (formData.password !== formData.cpassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must contain at least 6 characters');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/Auth/Signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        setError(errorData.message || 'An error occurred during signup');
        setLoading(false);
        return;
      }

      const data = await res.json();
      console.log('this is the data sent', data);
      setformData({});
      setError('');
      navigate('/Sign-In')
    } catch (err) {
      setError('An error occurred during signup');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto w-full">
      <h1 className="text-3xl text-center font-bold my-8">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full">
        <input
          className="border p-3 rounded-md w-full focus:outline-blue-600"
          type="text"
          placeholder="username"
          id="username"
          onChange={handleChange}
        />
        <input
          className="border p-3 rounded-md w-full focus:outline-blue-600"
          type="text"
          placeholder="email"
          id="email"
          onChange={handleChange}
        />
        <input
          className="border p-3 rounded-md w-full focus:outline-blue-600"
          //type="password"
          placeholder="password"
          id="password"
          onChange={handleChange}
        />
        <input
          className="border p-3 rounded-md w-full focus:outline-red-700"
          //type="password"
          placeholder="confirm password"
          id="cpassword"
          onChange={handleChange}
        />
        {error && <p className="text-red-500 text-center font-bold">{error}</p>}
        <button
          style={{ backgroundColor: 'rgb(59,108,246)' }}
          className="rounded-md p-2 my-8 font-semibold hover:text-white w-full"
          type="submit"
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Sign Up'}
        </button>
      </form>
      <div className="flex gap-1 justify-center flex-wrap text-center">
        <p className="text-blue-700">Already have an account?</p>
        <Link to="/Sign-In">
          <span className="font-bold hover:text-blue-700">Sign-In</span>
        </Link>
      </div>
    </div>
  );
}
