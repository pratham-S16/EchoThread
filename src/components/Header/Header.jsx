import React from 'react'
import { Link } from 'react-router-dom'
import Container from '../container/Container'
import Logo from '../logo'
import LogoutBtn from './LogoutBtn'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import authService from '../../appwrite/auth'

function Header() {
  const authStatus=useSelector((state)=>state.auth.status);
  // const authStatus=false;
  const navigate= useNavigate();

  const navItems=[{
    name:"Home",
    slug:'/',
    active:true,
  },
  {
    name:"Login",
    slug:'/login',
    active:!authStatus,
  },{
    name:"SignUp",
    slug:'/signup',
    active:!authStatus,
  },{
    name:"AllPosts",
    slug:'/all-posts',
    active:authStatus,
  },{
    name:"AddPost",
    slug:'/add-post',
    active:authStatus,
  }]
  return (
    <header className='py-3 shadow bg-[#6a9aa8]'>
      <Container>
        <nav className='flex'>

          <div className='mr-4'> 
            <Link to='/'>
            <Logo width='70px'/>
            </Link>
          </div>

          <ul className='flex ml-auto'>
              {navItems.map((item)=>
                 item.active ? (<li key={item.name}>
                    <button
                    onClick={()=>navigate(item.slug)}
                    className='inline-block px-6 py-2 font-medium text-lg cursor-pointer duration-200 hover:bg-[#b8e1e9] rounded-full'
                    >{item.name}
                    </button>
                    
                 </li>) : null
              )}
              {authStatus && (
                <li  >
                  <LogoutBtn />
                </li>
              )}
          </ul>


        </nav>
      </Container>
    </header>
  )
}

export default Header;