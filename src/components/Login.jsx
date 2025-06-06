import React, {useState}from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom'
import {login as authLogin} from '../store/authSlice'
import authService from '../appwrite/auth'
import Button from './Button'
import Input from './Input'
import Logo from './logo'
import { set, useForm } from 'react-hook-form';

function Login() {
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const {register,handleSubmit}=useForm();
    const [error,setError]=useState("");

    const handlelogin =async(data)=>{
        // console.log("1st step",data);
        setError("");
        try {
            const res=await authService.login(data);
            // console.log("2nd step logging in",res);
            if(res)
            {
                const userData=await authService.getCurrentUser();
                // console.log("3rd step user data",userData);
                if(userData)
                {
                    dispatch(authLogin({userData}));
                    console.log("userdata dispatched")
                }
                
                navigate("/");
            }
        } catch (error) {
            setError(error.message);
        }
    }

  return (
    <div className='flex items-center justify-center w-full my-8'
    >
        <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
        <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                       <Logo width="100%" />
                    </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
        <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
        </p>
        <div>
            {error && <p className='text-red-500 text-center'>{error}</p>}
        </div>
        <form onSubmit={handleSubmit(handlelogin)} className='mt-8'>
        <div className='space-y-5'>
            <Input label="Email" type="email" placeholder="Enter your email"
            {...register("email",{required:true,
                validate:{
                    matchpattern:(value)=>/^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/.test(value) || "Email is not valid"
                }
            })}
            />
            <Input label="Password" type="password" placeholder="Enter your password"
             {...register("password",{required:true})}
            />
            <Button type='submit' classname='w-full'
            >SignIn</Button>
        </div>

        </form>
        </div>
        </div>
  )
}

export default Login