import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo-no-background.svg"

const Navbar = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);


 
  const toggleNavbar = () => setNavbarOpen(!navbarOpen);

 
  return (
    <nav className="bg-stone-950 border-gray-400">
    <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
        <img
          src={Logo}
          className="h-12"
          alt="Opinio Buzz Logo"
        />
        <span className="self-center text-2xl font-semibold whitespace-nowrap text-stone-300">
          Opinio Buzz
        </span>
      </a>
      <button
        onClick={toggleNavbar}
        type="button"
        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-400 rounded-lg md:hidden hover:bg-stone-800 focus:outline-none focus:ring-2 focus:ring-gray-200"
        aria-controls="navbar-multi-level"
        aria-expanded={navbarOpen ? "true" : "false"}
      >
        <span className="sr-only">Open main menu</span>
        <svg
          className="w-5 h-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 17 14"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 1h15M1 7h15M1 13h15"
          />
        </svg>
      </button>
      <div
        className={`${
          navbarOpen ? "block" : "hidden"
        } w-full md:block md:w-auto`}
        id="navbar-multi-level"
      >
        <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 bg-stone-950 md:bg-transparent">
          <li>
            <a
              href="/"
              className="block py-2 px-6  text-white rounded md:bg-transparent md:text-gray-400 md:hover:text-white hover:bg-stone-900"
              aria-current="page"
            >
              Home
            </a>
          </li>
          <li>
            <Link
              to="/about"
              className="block py-2 px-3 hover:text-stone-400 text-white rounded hover:bg-stone-700 md:hover:bg-transparent md:border-0 md:hover:text-stone-400"
            >
              About Us
            </Link>
          </li>
          <li>
          <a
  href="tel:+1234567890" 
  className="block py-2 px-3 hover:text-stone-400 text-white rounded hover:bg-stone-600 md:hover:bg-transparent md:border-0 md:hover:text-stone-400"
>
  Contact
</a>

          </li>
          <li>
            <Link
              to="/login"
              className="block py-2 px-3 hover:text-stone-400 text-white rounded hover:bg-stone-700 md:hover:bg-transparent md:border-0 md:hover:text-stone-400"
            >
              Login
            </Link>
          </li>
          <li>
            <Link
              to="/register"
              className="block py-2 px-3 hover:text-stone-400 text-white rounded hover:bg-stone-700 md:hover:bg-transparent md:border-0 md:hover:text-stone-400"
            >
              Business Register
            </Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  
  
  );
};

export default Navbar;
