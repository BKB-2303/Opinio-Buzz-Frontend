import React, { useContext } from 'react';
import { FiUser, FiMail, FiPhone, FiMapPin } from 'react-icons/fi'; // Importing required icons from react-icons
import AppContext from '../../../context/AppContext';
import Sidebar from '../Sidebar';

const Profile = () => {
  const { user } = useContext(AppContext);

  const navbarItems = [
    { text: 'Home', link: '/admin-dashboard/home' },
    { text: 'All User', link: '/admin-dashboard/allUser' },
    { text: 'Product Control', link: '/admin-dashboard/product-control' },
    { text: 'Profile', link: '/admin-dashboard/profile' },
  ];

  return (
    <>
      <Sidebar items={navbarItems} />
      <div className="ml-16 p-4">
        <h1 className="text-2xl font-semibold mb-2">Welcome, {user?.name}</h1>
        <div className="bg-white shadow-md rounded-lg p-4">
          <div className="mb-4 flex items-center">
            <FiMail className="text-gray-500 mr-2" />
            <h3 className="text-lg font-semibold">Email:</h3>
            <p className="ml-2">{user?.email}</p>
          </div>
          <div className="mb-4 flex items-center">
            <FiUser className="text-gray-500 mr-2" />
            <h3 className="text-lg font-semibold">Company Name:</h3>
            <p className="ml-2">{user?.companyName}</p>
          </div>
          <div className="mb-4 flex items-center">
            <FiPhone className="text-gray-500 mr-2" />
            <h3 className="text-lg font-semibold">Phone Number:</h3>
            <p className="ml-2">{user?.phoneNumber}</p>
          </div>
          <div className="mb-4 flex items-center">
            <FiMapPin className="text-gray-500 mr-2" />
            <h3 className="text-lg font-semibold">Location:</h3>
            <p className="ml-2">{user?.location}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
