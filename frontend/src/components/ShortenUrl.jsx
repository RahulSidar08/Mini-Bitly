import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
export const ShortenUrl = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    let inputData = {
      longUrl: data.url,
      customAlias: data.alias,
      expirationDate: data.date,
    };
    try {
      const response = await axios.post(
        "https://mini-bitly-tjgu.onrender.com/api/urls/shorten",
        inputData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong!");
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 mx-auto mt-10">
      <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Create Short Link</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-700">Long URL</label>
            <input
              id="url"
              name="url"
              type="text"
              autoComplete="url"
              {...register("url", { required: true })}
              className={`w-full mt-1 p-2 border rounded focus:outline-none focus:ring focus:border-blue-300 ${
                errors.url ? "border-red-500" : "border-gray-300"
              } placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
              placeholder="https://example.com"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">
                {errors.email?.type === "required" && (
                  <p role="alert">Email is required</p>
                )}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">
              Custom Alias (optional)
            </label>
            <input
              placeholder="example alias"
              id="alias"
              name="alias"
              type="text"
              autoComplete="alias"
              {...register("alias", { required: true })}
              className={`w-full mt-1 p-2 border rounded focus:outline-none focus:ring focus:border-blue-300 ${
                errors.url ? "border-red-500" : "border-gray-300"
              } placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700">
              Expiration Date (optional)
            </label>
            <input
              type="date"
              id="date"
              name="date"
              autoComplete="date"
              {...register("date", { required: true })}
              className={`w-full mt-1 p-2 border rounded focus:outline-none focus:ring focus:border-blue-300 ${
                errors.url ? "border-red-500" : "border-gray-300"
              } placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-900 transition"
          >
            Create Short URL
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

