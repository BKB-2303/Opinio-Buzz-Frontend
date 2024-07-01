import React, { useContext, useState } from "react";
import AppContext from "../../context/AppContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Navbar from "../Navbar";
import Logo from '../../assets/logo-black.svg'
const Register = () => {
  const { register } = useContext(AppContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    companyName: "",
    phoneNumber: "",
    location: "",
    companyWebsite: "",
    role: "businessuser", 
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const { name, email, password, companyName, phoneNumber, location, companyWebsite, role } = formData;

  const submitHandler = async (e) => {
    e.preventDefault();
    const result = await register(name, email, password, companyName, phoneNumber, location, companyWebsite, role);
    if (result.success) {
      navigate('/login');
    }
    // console.log(formData);
  };

  return (
    <>
    <Navbar/>
    <div className="container mx-auto px-4">
  <img src={Logo} className="mx-auto w-32  " alt="Logo" />
  <h1 className="text-center text-2xl font-bold mb-4">Register Here</h1>
  <form className="max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={submitHandler}>
    <div className="mb-4">
      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
        Your Name
      </label>
      <input
        type="text"
        id="name"
        name="name"
        value={formData.name}
        onChange={onChangeHandler}
        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-stone-950"
        placeholder="John Doe"
        required
      />
    </div>
    <div className="mb-4">
      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
        Your Email
      </label>
      <input
        type="email"
        id="email"
        name="email"
        value={formData.email}
        onChange={onChangeHandler}
        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-stone-950"
        placeholder="example@gmail.com"
        required
      />
    </div>
    <div className="mb-4">
      <label htmlFor="password" className="block text-sm font-medium text-gray-700">
        Your Password
      </label>
      <input
        type="password"
        id="password"
        name="password"
        value={formData.password}
        onChange={onChangeHandler}
        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-stone-950"
        required
      />
    </div>
    <div className="mb-4">
      <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
        Company Name
      </label>
      <input
        type="text"
        id="companyName"
        name="companyName"
        value={formData.companyName}
        onChange={onChangeHandler}
        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-stone-950"
        placeholder="Company Name"
        required
      />
    </div>
    <div className="mb-4">
      <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
        Phone Number
      </label>
      <input
        type="tel"
        id="phoneNumber"
        name="phoneNumber"
        value={formData.phoneNumber}
        onChange={onChangeHandler}
        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-stone-950"
        placeholder="Phone Number"
        required
      />
    </div>
    <div className="mb-4">
      <label htmlFor="location" className="block text-sm font-medium text-gray-700">
        Location
      </label>
      <input
        type="text"
        id="location"
        name="location"
        value={formData.location}
        onChange={onChangeHandler}
        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-stone-950"
        placeholder="Location"
        required
      />
    </div>
    <div className="mb-4">
      <label htmlFor="companyWebsite" className="block text-sm font-medium text-gray-700">
        Company Website (optional)
      </label>
      <input
        type="url"
        id="companyWebsite"
        name="companyWebsite"
        value={formData.companyWebsite}
        onChange={onChangeHandler}
        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-stone-950"
        placeholder="https://example.com"
      />
    </div>
    <button
      type="submit"
      className="w-full bg-stone-950 hover:bg-stone-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    >
      Register
    </button>
    <p className="text-center mt-4 text-sm text-gray-600">
      Already have an account? <Link to="/login" className="text-stone-950 hover:underline">Login here</Link>
    </p>
  </form>
</div>

    </>
  );
};

export default Register;
