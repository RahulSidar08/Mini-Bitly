import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/authSlice";
const Login = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state) => state.Auth.user);
  const onSubmit = async (data) => {
    try {
      let userData = {
        email: data.email,
        password: data.password,
      };
      const res = await axios.post(
        `http://localhost:3000/user/login`,
        userData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        console.log(res.data.user)
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
        localStorage.setItem("user",res.data.user.email)
        setTimeout(() => {
          navigate("/")
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              {...register("email", { required: true })}
              className={`appearance-none relative block w-full px-3 py-2 border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
              placeholder="Email address"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">
                {errors.email?.type === "required" && (
                  <p role="alert">Email is required</p>
                )}
              </p>
            )}
          </div>
          <div className="mb-6">
            <label className="block text-gray-700">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="password"
              {...register("password", { required: true })}
              className={`appearance-none relative block w-full px-3 py-2 border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
              placeholder="Email address"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">
                {errors.password?.type === "required" && (
                  <p role="alert">Password is required</p>
                )}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
          >
            Login
          </button>
          <p className="text-md mb-6 text-center">
            If You don't have an Account{" "}
            <span className="underline">
              <NavLink to={"/signup"}>Signup</NavLink>
            </span>
          </p>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
