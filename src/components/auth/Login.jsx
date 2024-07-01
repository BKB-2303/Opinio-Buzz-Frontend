import React, { useContext } from "react";
import { useState } from "react";
import AppContext from "../../context/AppContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import { Link } from "react-router-dom";
import Logo from '../../assets/logo-black.svg'
const Login = () => {
  const { login } = useContext(AppContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const onChangerHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
  
    const result = await login(formData.email, formData.password);
    // console.log(result); 
  
    if (result.success) {
      
      if (result.role === "businessuser") {
        navigate("/user-dashboard/home");
      } else if (result.role === "admin") {
        navigate("/admin-dashboard/home");
      } else {
        setError("Invalid email or password. Please try again.");
      }
    }
    else{
      setError("Invalid email or password. Please try again.");

    }
  

  };
  
  return (
    <>
<Navbar />
      <div className="container mx-auto px-4 flex flex-col items-center justify-center">
        <img src={Logo} className="w-32" alt="Logo" />
        <h1 className="text-center text-stone-600 text-2xl font-bold my-4">
          Login
        </h1>
        {error && (
          <div className="text-red-500 text-sm mb-4">{error}</div> // Display error message
        )}
        <form className="max-w-sm w-full" onSubmit={submitHandler}>
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Your email
            </label>
            <input
              name="email"
              value={formData.email}
              onChange={onChangerHandler}
              type="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="example@gmail.com"
              required
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Your password
            </label>
            <input
              name="password"
              value={formData.password}
              onChange={onChangerHandler}
              type="password"
              id="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>
          <button
            type="submit"
            className="text-white bg-stone-950 hover:bg-stone-800 focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center mb-4"
          >
            Login
          </button>
          <Link
            to="/forgot-password"
            className=" text-stone-900 hover:underline font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            Forgot Password
          </Link>
          <Link
            to="/register"
            className=" text-stone-900 hover:underline font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            Register
          </Link>
        </form>
      </div>
    </>
  );
};

export default Login;
