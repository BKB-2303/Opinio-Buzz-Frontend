import React, { useContext } from 'react';
import AppContext from '../../../../context/AppContext';
import Sidebar from '../../Sidebar';
import { FiHome, FiPlusCircle, FiCheckCircle, FiList, FiUser } from 'react-icons/fi'; 
import Logo from '../../../../assets/logo-black.svg';

const Home = () => {
  const { user } = useContext(AppContext);
  const navbarItems = [
    { text: 'Home', icon: <FiHome />, link: '/user-dashboard/home', summary: 'Navigate back to your dashboard homepage.' },
    { text: 'Add Product', icon: <FiPlusCircle />, link: '/user-dashboard/addProduct', summary: 'Here you can add your products to the system.' },
    { text: 'Products & Reviews', icon: <FiCheckCircle />, link: '/user-dashboard/product-review', summary: 'Read and manage reviews of your products.' },
    { text: 'Products & Status', icon: <FiList />, link: '/user-dashboard/product-status', summary: 'Browse through all products listed in your account and their status.' },
    { text: 'Profile', icon: <FiUser />, link: '/user-dashboard/profile', summary: 'Update and manage your profile information.' },
  ];

  return (
    <div className="flex flex-col sm:flex-row"> 
      <Sidebar items={navbarItems} />
      <div className="ml-0 sm:ml-16 p-4 sm:p-8 flex-1"> 
        <div className="flex items-center mb-4 sm:mb-4">
          <img src={Logo} className="w-24 h-24 mr-2 sm:w-32 sm:h-32" alt="Logo" /> 
          <h1 className="text-xl sm:text-2xl font-bold">User Dashboard</h1> 
        </div>

        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-4 sm:mb-4">
          <h2 className="text-lg sm:text-xl font-bold mb-2 sm:mb-4">{user?.name}, Welcome to Your Dashboard</h2> 
          <p className="text-gray-700">
            This is your personalized dashboard where you can manage and upload your products, check their status, view product ratings, read and manage your reviews.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-4 sm:mb-4">
          <h2 className="text-lg sm:text-xl font-bold mb-2 sm:mb-4">Quick Links</h2> 
          <ul className="list-disc list-inside">
            {navbarItems.map((item, index) => (
              <li key={index} className="flex items-center mb-2">
                <span className="mr-2">{item.icon}</span>
                <div>
                  <a href={item.link} className="text-stone-950 hover:underline">{item.text}</a>
                  <p className="text-sm text-gray-500">{item.summary}</p> 
                </div>
              </li>
            ))}
          </ul>
          <p className="text-gray-700 mt-2">Or you can open your sidebar to navigate.</p> 
        </div>

       
        <div className=" bg-white shadow-md p-4 sm:p-6 mb-4 sm:mb-6">
        <p className="text-gray-600 mb-2">If you face any issues:</p>
        <p className="text-gray-600 mb-2">Call us: <strong>7894523975</strong></p>
        <p className="text-gray-600 mb-2">Email: <a href="mailto:opiniobuzzzsupport@gmail.com" className="text-stone-950 hover:underline">opiniobuzzzsupport@gmail.com</a></p>
        <p className="text-gray-600 mb-2">If you do not see updates, please refresh the page.</p>
      </div>
       
      </div>

    </div>
  );
};

export default Home;
