import React, { useState } from "react";
import { useForm } from "react-hook-form";
import authService from "../appwrite/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";
// import { Input, logo} from './index';
import Button from "./Button";
import Input from "./Input";
import Logo from "./Logo";
import { Link } from "react-router-dom";
import conf from "../conf/conf";

function Signup() {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const create = async (data) => {
    setError("");
    try {
      const res = await authService.createAccount(data);

      if (res) {
        const userData = await authService.getCurrentUser();
        console.log(userData);

        if (userData) {
          dispatch(login(userData));
        }
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
      >
        <div className="mb-2 flex flex-row justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Create account
        </h2>
        <div className="flex flex-col justify-center text-gray-600 gap-2">
            <div className="flex flex-row justify-center gap-1">
    <h2>Already have an account?</h2>
          <Link
            to="/login"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign In
          </Link>
            </div>
          

          {error && <p className="text-red-600  text-center">{error}</p>}
        </div>

        <form onSubmit={handleSubmit(create)}>
          <div className="space-y-5">
            <Input
              label="Name"
              placeholder="Enter your name"
              {...register("name", { required: true })}
            />
            <Input
              type="email"
              label="Email"
              placeholder="Enter your email"
              {...register("email", {
                required: true,
                validate: {
                  matchpattern: (value) =>
                    /^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/.test(value) ||
                    "Email is not valid",
                },
              })}
            />
            <Input
              label="Password"
              placeholder="Enter your password"
              type="password"
              {...register("password", { required: true })}
            />
            <Button type="submit" classname="w-full">
              Create Account{" "}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
