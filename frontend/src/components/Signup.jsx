import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
export const Signup = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Signup</h2>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              //   value={email}
              //   onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Your email"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              //   value={password}
              //   onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1 p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
          >
            Signup
          </button>
          <p className="text-md mb-6 text-center">If ALready Have an Accoutn <span className="underline">
            <NavLink to={"/login"}>Login</NavLink>
            </span></p>
        </form>
      </div>
    </div>
  );
};
