import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineInfoCircle, AiOutlineLock, AiOutlineMail } from 'react-icons/ai'; // Importing icons from react-icons library

const Footer = () => {
  return (
    <footer className="bg-stone-900 text-white p-4 text-center mt-16 w-full">
      <div className="container mx-auto">
        <nav>
          <ul className="flex justify-center space-x-4">
            <li>
              <Link to="/about" className="flex items-center text-sm sm:text-base hover:underline">
                <AiOutlineInfoCircle className="mr-1" />
                About
              </Link>
            </li>
            <li>
              <Link to="/" className="flex items-center text-sm sm:text-base hover:underline">
                <AiOutlineLock className="mr-1" />
                Privacy Policy
              </Link>
            </li>
            <li>
              <a href="tel:+1234567890" className="flex items-center text-sm sm:text-base hover:underline">
                <AiOutlineMail className="mr-1" />
                Contact
              </a>
            </li>
            <li>
              <a href="mailto:opiniobuzzsupport@gmail.com" className="flex items-center text-sm sm:text-base hover:underline">
                <AiOutlineMail className="mr-1" />
                Email
              </a>
            </li>
          </ul>
        </nav>
        <hr className="my-6 border-stone-800 sm:mx-auto lg:my-8" />
        <p className="text-sm sm:text-base mt-8">&copy; {new Date().getFullYear()} Opinio Buzz. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
