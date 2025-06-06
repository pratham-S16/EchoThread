
import { useDispatch } from 'react-redux'
import './App.css'
import { useEffect, useState } from 'react';
import authService from './appwrite/auth';
import { login, logout } from './store/authSlice';
import Header  from './components/Header/Header'; 
import  Footer  from './components/Footer/Footer';
import { Outlet } from 'react-router-dom';

function App() {


  const [loading,setLoading]=useState(true);
  const dispatch=useDispatch();

  useEffect(()=>{
    authService.getCurrentUser()
    .then((userData)=>{
      if(userData)
      {
        dispatch(login({userData}));
      }
      else{
        dispatch(logout())
      }
    })
    .finally(()=>setLoading(false))
  },[])

  
  return !loading ? (
    <div className='min-h-screen  flex flex-wrap content-between bg-[#ffffff]'>
    <div className='w-full flex flex-col min-h-screen'>
      <Header/>
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer/>
    </div>
    </div>
  ): null 

  
}

export default App;


// checked 