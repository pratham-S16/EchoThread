import React from 'react'

export default function Button({children,
    type="button",
    bgColor='bg-blue-600',
    textColor='text-white',
    className='',
    ...props

}) {
  return (
    <button className={`px-4 py-2 rounded-md cursor-pointer  ${bgColor} ${textColor} ${className}`} {...props} 
    >{children}</button>
  )
}

// export default Button;