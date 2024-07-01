import React from 'react';
import Sidebar from '../../Sidebar';
import { FaUsers, FaBoxOpen } from 'react-icons/fa'; 
import Logo from '../../../../assets/logo-black.svg'; 

const Home = () => {
  const navbarItems = [
    { text: 'Home', link: '/admin-dashboard/home' },
    { text: 'All User', link: '/admin-dashboard/allUser' },
    { text: 'Product Control', link: '/admin-dashboard/product-control' },
    { text: 'Profile', link: '/admin-dashboard/profile' },
  ];

  return (
    <div className="flex flex-col md:flex-row"> 
      <Sidebar items={navbarItems} />
      <div className="flex-1 ml-0 md:ml-16 p-4"> 
        <div className="flex items-center mb-4">
          <img src={Logo} alt="Logo" className="h-20  mr-2" /> 
          <h1 className="text-2xl font-bold">Admin Home</h1>
        </div>
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Dashboard Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-4 shadow-md">
              <FaUsers className="text-4xl text-blue-500 mb-4 mx-auto" />
              <h3 className="text-lg font-semibold mb-2 text-center">User Management</h3>
              <p className="text-gray-600 text-center">
                Manage users of the Opinio Buzz platform.
              </p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-md">
              <FaBoxOpen className="text-4xl text-blue-500 mb-4 mx-auto" />
              <h3 className="text-lg font-semibold mb-2 text-center">Product Control</h3>
              <p className="text-gray-600 text-center">
                Control and manage products across the platform.
              </p>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Home;
