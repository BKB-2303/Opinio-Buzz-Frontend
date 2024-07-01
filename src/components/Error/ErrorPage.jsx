import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineHome } from 'react-icons/ai'; // Importing icons from react-icons library

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-stone-200 text-stone-900 p-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-8">Page Not Found</h2>
        <p className="text-lg mb-8">
          Sorry, the page you are looking for does not exist. It might have been moved or deleted.
        </p>
        <Link to="/" className="flex items-center justify-center text-stone-600 hover:text-stone-400 rounded py-2 px-4 transition-colors duration-300">
          <AiOutlineHome className="mr-2" />
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
