import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../redux/authSlice";
import { store } from "../redux/store";
export const Navbar = () => {
  let userData = localStorage.getItem("user");
  const user = useSelector((state) => state.Auth.user);
  const dispatch = useDispatch();
  function handleDelte(e){
    e.preventDefault()
    console.log("deleted")
    localStorage.removeItem("user")
    dispatch(logout());
  }
  return (
    <>
      <header className="bg-white text-black h-20 shadow-lg p-2 w-full border-b-5 fixed top-0 max-sm:w-full max-sm:flex">
        <div className="flex w-full justify-between items-center p-5">
          <h1 className="text-2xl font-bold text-blue-600">LinkSnap</h1>
          <nav className="space-x-4">
            {userData ? (
              <div>
                <Link
                onClick={handleDelte}
                  className="text-white bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  Logout
                </Link>
              </div>
            ) : (
              <div className="flex space-x-4">
                <Link to="/login" className="text-white bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-700" >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="text-white bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </nav>
        </div>
      </header>
    </>
  );
};
