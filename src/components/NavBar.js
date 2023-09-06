import React from 'react'
import logo from "../MovieLogo.png"
import { Link } from 'react-router-dom'

function NavBar() {
  return (
    <div className='flex border space-x-8 items-center pl-6 py-4'>
        <Link to='/'><img src={logo} className='w-[50px]'/></Link>
        <Link to='/' className='text-blue-500'>Movies</Link>
        <Link to='/WatchList' className='text-blue-500' >WatchList</Link>
        <h1 className=' text-sky-700 relative text-3xl font-bold left-96' >Movies Review</h1>
        
    </div>
  )
}

export default NavBar