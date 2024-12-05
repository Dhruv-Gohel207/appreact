import React from 'react'

const Footer = () => {
  return (
      <div className='bg-purple-500 py-5 fixed bottom-0 w-full flex justify-center'>
        <div className='text-white flex items-center justify-center'>
   <div className="logo text-center font-bold mx-auto text-xl flex pl-2 mr-0 ">
            <span className='text-purple-800 font-bold '>&lt;</span>
            <span className='text-white'>Pass</span>
            <span className='text-purple-800 font-bold '>MNGR/&gt;</span>
            </div>

    <lord-icon className="w-4"
    src="https://cdn.lordicon.com/dqhmanhc.json"
    trigger="loop"
    delay="1000"
    state="morph-glitter"
    colors="primary:#f28ba8,secondary:#c71f16,tertiary:#e8e230,quaternary:#f9c9c0,quinary:#ee66aa"
    >
</lord-icon>
<div className='flex pr-10 mr-11 text-center'>
"this Website Using for Keep Your PassWord safe And Whenever You Forgot the Password You can have on this web"
        </div>
        </div>
        </div>

  )
}

export default Footer