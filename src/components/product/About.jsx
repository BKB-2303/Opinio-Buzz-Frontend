import React from 'react';
import Navbar from '../Navbar';
import { FaProductHunt, FaStar, FaUsers, FaLinkedin, FaCogs, FaLightbulb, FaChartLine, FaCode, FaHandsHelping } from 'react-icons/fa';

const About = () => {
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-8 px-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center">Welcome to Opinio Buzz</h1>
        <p className="text-lg text-gray-600 mb-8 text-center">
          Your go-to platform for honest and insightful product reviews.
        </p>
        <div className="flex flex-wrap justify-center gap-8 max-w-6xl">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center w-full sm:w-1/2 lg:w-1/3">
            <FaProductHunt className="text-6xl text-blue-500 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">Products</h2>
            <p className="text-gray-600">Explore a wide range of products with detailed reviews and ratings.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg text-center w-full sm:w-1/2 lg:w-1/3">
            <FaStar className="text-6xl text-yellow-500 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">Ratings</h2>
            <p className="text-gray-600">See what others are saying and rate products yourself.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg text-center w-full sm:w-1/2 lg:w-1/3">
            <FaUsers className="text-6xl text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">Community</h2>
            <p className="text-gray-600">Join our community of users sharing their experiences and opinions.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg text-center w-full sm:w-1/2 lg:w-1/3">
            <FaCogs className="text-6xl text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">Services</h2>
            <p className="text-gray-600">Discover a variety of services to enhance your experience.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg text-center w-full sm:w-1/2 lg:w-1/3">
            <FaLightbulb className="text-6xl text-purple-500 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">Insights</h2>
            <p className="text-gray-600">Gain valuable insights and tips from expert reviews.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg text-center w-full sm:w-1/2 lg:w-1/3">
            <FaChartLine className="text-6xl text-orange-500 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">Trends</h2>
            <p className="text-gray-600">Stay updated with the latest trends in the market.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg text-center w-full sm:w-1/2 lg:w-1/3">
            <FaCode className="text-6xl text-indigo-500 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">Development</h2>
            <p className="text-gray-600">Built using modern technologies to provide a seamless experience.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg text-center w-full sm:w-1/2 lg:w-1/3">
            <FaHandsHelping className="text-6xl text-pink-500 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">Support</h2>
            <p className="text-gray-600">Dedicated support team to assist you with any queries.</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg mt-8 max-w-4xl text-center">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">About the Developer</h2>
          <p className="text-gray-600 mb-2">Website developed by Bikash Borah</p>
          <a
            href="https://www.linkedin.com/in/bikash-borah-36137724a/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 flex items-center justify-center"
          >
            <FaLinkedin className="mr-2" /> Bikash Borah on LinkedIn
          </a>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg mt-8 max-w-4xl text-center">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">About the Company</h2>
          <p className="text-gray-600 mb-2">
            This website was created under the company name Imdad Next Web Private Limited.
          </p>
          <p className="text-gray-600">
            Founder: Imdad Mamud Hussain
          </p>
          <a
            href="https://imdadnextweb.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500"
          >
            Visit Imdad Next Web
          </a>
        </div>
      </div>
    </>
  );
};

export default About;
