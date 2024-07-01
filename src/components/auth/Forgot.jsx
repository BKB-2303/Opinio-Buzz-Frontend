import React, { useState } from "react";
import Navbar from "../Navbar";
import { Link } from "react-router-dom";
import axios from "axios";

const Forgot = () => {
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");


  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${import.meta.env.VITE_API_URL}/user/forgot-password`, { email })
      .then((res) => {
        if (res.data.success) {
          setSuccessMessage(res.data.message);
          setEmail(""); 
          setErrorMessage(""); 
        } else {
          setSuccessMessage("");
          setErrorMessage(res.data.message || "Failed to send reset link. Please try again later.");
        }
      })
      .catch((err) => {
        console.error("Error:", err);
        setSuccessMessage("");
        setErrorMessage("Failed to send reset link. Please try again later.");
      });
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center bg-gray-50 ">
        <div className="bg-white p-8 shadow-md rounded-md max-w-md w-full">
          <h2 className="text-2xl font-semibold mb-4">Forgot Password</h2>
          {successMessage && (
            <div className="text-green-600 mb-4">{successMessage}</div>
          )}
          {errorMessage && (
            <div className="text-red-500 mb-4">{errorMessage}</div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-semibold mb-2"
              >
                Email
              </label>
              <input
                type="email"
                placeholder="Enter Email"
                autoComplete="off"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2"
                required
              />
            </div>

            <div>
              <button
                type="submit"
                className="bg-stone-950 text-white font-bold py-2 px-4 rounded-md hover:bg-stone-800 focus:outline-none focus:shadow-outline-blue"
              >
                Send Link
              </button>
            </div>
          </form>

          <p className="mt-4">
            Don't have an account?{" "}
            <Link to="/register" className="text-stone-900 hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Forgot;
