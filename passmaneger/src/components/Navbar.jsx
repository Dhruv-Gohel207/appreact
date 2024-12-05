import React from 'react'
import '../index.css';

const Navbar = () => {
  return (
    <nav className='bg-purple-200 '>
      <div className="mycontainer flex justify-between items-center px-4 py-5 h-14 overflow-hidden">

        <div className="logo font-bold mx-auto text-xl">
            <span className='text-purple-800 font-bold '>&lt;</span>
            Pass
            <span className='text-purple-800 font-bold '>MNGR/&gt;</span>
            </div>
        {/* <ul>
            <li className='flex gap-4'>                  
                 <a className='hover:font-bold' href="/">Home</a>
                 <a className='hover:font-bold' href="#">About</a>
                 <a className='hover:font-bold' href="#">Contact</a>
            </li>
        </ul> */}
        <button className='px-2 bg-purple-300 rounded-full py-2'> 
          <img className='w-20 ' src="icon/GitHub_Lockup_Dark.png" alt="" />
        </button>
      </div>

    </nav>
  )
}

export default Navbar