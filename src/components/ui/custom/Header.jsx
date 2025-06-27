import React from 'react'
import { FaBolt } from "react-icons/fa6";
import { Button } from '../button';

function Header() {
  return (
    <div className='p-1 flex items-center justify-between'>
     <FaBolt className='text-xl text-blue-600' />
     <div className='flex gap-5 mt-2'>
      <Button variant="ghost">
        Sign In
      </Button >
      <Button className="text-white bg-gradient-to-l from-blue-500 via-blue-600 to-blue-900 " >
        Get Started
      </Button>
     </div>
    </div>
  )
}

export default Header
