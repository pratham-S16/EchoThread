import React from 'react'
import pic from '../assets/Ett.png'


function Logo({width= '100px'}) {
  return (
    <div className='flex items-center justify-center h-10 w-20 ' >
     <img src={pic} alt='logo' />
    </div> 
  )
}

export default Logo;