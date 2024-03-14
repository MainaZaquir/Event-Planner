
import  { useState } from 'react'
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai'
// import { NavLink } from "react-router-dom"

function Home() {
    const [nav, setNav] = useState(false)
    const handleNav = () =>{
        setNav(!nav)
    }
    
    return (
        <div className='bg-[#e7e7e5]  fixed top-0 w-full z-10 my-2'>
          <div className='flex justify-between items-center h-24 max-w-[1240px] mx-auto px-4'>
            <img className='h-[75px] w-[75px]' src="https://images-workbench.99static.com/wxRe-Rdbsm4ntxzxV9lL715O5nM=/99designs-contests-attachments/122/122876/attachment_122876400" alt="/" />
            <ul className='hidden md:flex cursor-pointer'>
              <a href='/dashboard'><li className='p-4 text-blue-500'>Dashboard</li></a> 
              <a href='/events'><li className='p-4 text-blue-500'>Event</li></a>
              <a href='/contact' className='p-4 text-blue-500'>About</a>
              <a href='/login'><li className='p-4 text-blue-500'>Login</li></a> 
              
              <a href='/register'><li className='p-4 px-12 font-bold text-blue-500'>Sign Up</li></a>
              <a href='/users'><li className='p-4 text-blue-500'>My Profile</li></a>
            </ul>
            <div onClick={handleNav} className='cursor-pointer block md:hidden'>
              {nav ?  <AiOutlineClose size={20}/> : <AiOutlineMenu size={20}  />}
            </div>
            <div className={nav ? 'fixed left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#fff] ease-in-out duration-500' : 'fixed left-[-100%]'}>
            <img className='h-[75px] w-[75px]' src="https://images-workbench.99static.com/wxRe-Rdbsm4ntxzxV9lL715O5nM=/99designs-contests-attachments/122/122876/attachment_122876400" alt="/" />
              <ul className='pt-12 uppercase p-4 '>
              <a href='/dashboard'><li className='p-4 text-blue-500'>Dashboard</li></a> 
              <a href='/events'><li className='p-4 text-blue-500'>Event</li></a>
              <a href='/contact' className='p-4 text-blue-500'>About</a>
              <a href='/login'><li className='p-4 text-blue-500'>Login</li></a> 
              
              <a href='/register'><li className='p-4 px-12 font-bold text-blue-500'>Sign Up</li></a>
              <a href='/users'><li className='p-4 text-blue-500'>My Profile</li></a>
              
              </ul>
            </div>
          </div>
        </div>)
}

export default Home
