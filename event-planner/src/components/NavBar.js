import React,{useState} from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { Link,useNavigate } from 'react-router-dom';

const NavLinks = ({ className, isLoggedIn, handleLogout }) => {
  if (isLoggedIn) {
    return (
      <ul className={className}>
        <Link to='/dashboard'><li className='p-4 px-12 font-bold text-blue-500'>Dashboard</li></Link>
        <Link to='/events'><li className='p-4 px-12 font-bold text-blue-500'>Event</li></Link>
        <Link to='/'><li className='p-4 px-12 font-bold text-blue-500'>About</li></Link>
        <Link to='/users'><li className='p-4 px-12 font-bold text-blue-500'>My Profile</li></Link>
        <Link to='/task_assign'><li className='p-4 px-12 font-bold text-blue-500'>Assign Task</li></Link>
        <Link to='/budget'><li className='p-4 px-12 font-bold text-blue-500'>Budget</li></Link>
        <li className='p-4 px-12 font-bold text-blue-500 cursor-pointer' onClick={handleLogout}>Logout</li>
      </ul>
    );
  } else {
    return (
      <ul className={className}>
        <Link to='/login'><li className='p-4 px-12 font-bold text-blue-500'>Login</li></Link>
        <Link to='/register'><li className='p-4 px-12 font-bold text-blue-500'>Sign Up</li></Link>
      </ul>
    );
  }
};

function Home() {
  const [nav, setNav] = useState(false);
  const navigate = useNavigate()
  const isLoggedIn = localStorage.getItem('jwt'); // Check if user is logged in

  const handleNav = () => {
    setNav(!nav);
  };

  const handleLogout = () => {
    localStorage.removeItem('jwt'); // Remove JWT token from local storage
    // You can also redirect the user to the login page or perform any other actions needed
    navigate('login')

  };

  return (
    <div className='bg-[#e7e7e5]  fixed top-0 w-full z-10 my-2'>
      <div className='flex justify-between items-center h-24 max-w-[1240px] mx-auto px-4'>
        <a href='/dashboard'><img className='h-[75px] w-[75px]' src="https://images-workbench.99static.com/wxRe-Rdbsm4ntxzxV9lL715O5nM=/99designs-contests-attachments/122/122876/attachment_122876400" alt="/" /></a>
        <NavLinks className='hidden md:flex cursor-pointer' isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
        <div onClick={handleNav} className='cursor-pointer block md:hidden'>
          {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
        </div>
        <div className={nav ? 'fixed left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#fff] ease-in-out duration-500' : 'fixed left-[-100%]'}>
          <a href='/dashboard'><img className='h-[75px] w-[75px]' src="https://images-workbench.99static.com/wxRe-Rdbsm4ntxzxV9lL715O5nM=/99designs-contests-attachments/122/122876/attachment_122876400" alt="/" /></a>
          <NavLinks className='pt-12 uppercase p-4 ' isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
        </div>
      </div>
    </div>
  );
}

export default Home;
