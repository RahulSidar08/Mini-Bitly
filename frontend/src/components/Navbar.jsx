import React from "react";
import { Link } from 'react-router-dom';
export const Navbar = () => {
  return (
    <>
      {/* Header */}
      <header className="bg-white text-black h-20 shadow-lg p-2 w-full border-b-5 fixed top-0 max-sm:w-full max-sm:flex">
        <div className="flex w-full justify-between items-center p-5">
          <h1 className="text-2xl font-bold text-blue-600">LinkSnap</h1>
          <nav className="space-x-4">
            <Link to="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
            <Link
              to="/register"
              className="text-white bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Sign Up
            </Link>
          </nav>
        </div>
      </header>
    </>
  );
};
