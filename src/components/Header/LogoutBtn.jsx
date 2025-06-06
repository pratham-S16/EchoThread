import React,{useEffect} from 'react'
import { useDispatch } from 'react-redux'
import appwriteService from '../../appwrite/config'
import authService from '../../appwrite/auth'
import { logout } from '../../store/authSlice'


function LogoutBtn() {
    const dispatch= useDispatch();
    const logoutHandler= ()=>{
        authService.logout().then(()=>{
            dispatch(logout());
        });
    }

    
  return (
    <button className='inline-block px-6 py-2 duration-200 font-medium text-lg cursor-pointer hover:bg-[#b8e1e9] rounded-full' onClick={logoutHandler}>Logout</button>
  )
}

export default LogoutBtn;