import React from 'react'

const Navbar = () => {
  return (
    <div className='w-full flex justify-between h-12 items-center px-5 bg-indigo-300 shadow stiky'>
        <div>
            <h1 className='text-2xl font-bold'>Jainish.dev</h1>
        </div>
        <div>
            <ul className='flex gap-5'>
                <li className='cursor-pointer' ></li>
            </ul>
        </div>
    </div>
  )
}

export default Navbar