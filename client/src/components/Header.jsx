import React from 'react';
import { Link ,  useNavigate } from 'react-router-dom';
import { MdOutlineManageSearch } from "react-icons/md";
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';


export default function Header() {
    const {currentUser} = useSelector(state=>state.user);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const handleSubmit = (e) => {
      e.preventDefault();
      const urlParams = new URLSearchParams(window.location.search);
      urlParams.set('searchTerm', searchTerm);
      const searchQuery = urlParams.toString();
      navigate(`/search?${searchQuery}`);
    };
    useEffect(() => {
      const urlParams = new URLSearchParams(location.search);
      const searchTermFromUrl = urlParams.get('searchTerm');
      if (searchTermFromUrl) {
        setSearchTerm(searchTermFromUrl);
      }
    }, [location.search]);
  return (
    <header className='bg-slate-400'>
        <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
           <Link to='/'>
            <h1 className='font-bold'>
                <span>Find</span>
                <span className='text-blue-700'>H</span>
            </h1>
            </Link>
            <form onSubmit={handleSubmit} className='relative'>
                <input
                    className='rounded-sm p-2 pl-10 focus:outline-blue-600 w-24 sm:w-64'
                    type='text'
                    placeholder='search..'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button>
                <MdOutlineManageSearch className='absolute left-2 top-1/2 transform -translate-y-1/2 text-blue-700 text-xl' />
                </button>
                
            </form>
            <ul className='flex gap-3'>
            <Link to='/'>
                <li className='hover:underline text-blue-700 font-bold'>Home</li>
                </Link>
                <Link to='/About'>
                <li className='hidden sm:inline hover:text-white ' >About</li>
                </Link>
                <Link to='/Profile'>
                {currentUser ? (<img className='rounded-full h-7 w-7 object-cover' src={currentUser.profile || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8Y5xaNg8XHozP4KA0hfpm46f653K0-Cb1Dg&s'} alt='profile' />):  <li className='hover:text-white' >SignUp</li>}
                </Link>
               
               
               
            </ul>
        </div>
    </header>
  );
}
