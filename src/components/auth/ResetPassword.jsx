import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from "../Navbar";

function ResetPassword() {
  const [password, setPassword] = useState('');
  const [resetStatus, setResetStatus] = useState('');
  const navigate = useNavigate();
  const { id, token } = useParams();
 

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/user/reset-password/${id}/${token}`, {
        newPassword: password,
      });
  
      if (response.data.success) {
        setResetStatus("Password reset successful!");
       
        setTimeout(() => {
          navigate('/login'); 
        }, 2000); 
      } else {
        setResetStatus("Password reset failed. Please try again."); 
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      setResetStatus("Failed to reset password. Please try again later.");
    }
  };
  
  

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center bg-gray-50 min-h-screen">
        <div className="bg-white p-8 shadow-md rounded-md max-w-md w-full">
          <h4 className="text-2xl font-semibold mb-4">Reset Password</h4>
          {resetStatus && (
            <p className={resetStatus.includes('failed') ? 'text-red-500' : 'text-green-500'}>
              {resetStatus}
            </p>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-semibold mb-2">
                New Password
              </label>
              <input
                type="password"
                placeholder="Enter Password"
                autoComplete="off"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-indigo-900 text-white font-bold py-2 px-4 rounded-md hover:bg-indigo-800 focus:outline-none focus:shadow-outline-blue"
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default ResetPassword;
