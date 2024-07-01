import React, { useContext, useState } from 'react';
import AppContext from '../../../context/AppContext';
import Sidebar from '../Sidebar';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEdit, FaSave, FaUser, FaPhone, FaMapMarkerAlt, FaGlobe, FaBuilding } from 'react-icons/fa';

const Profile = () => {
  const { user, updateProfile } = useContext(AppContext);
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: '',
    companyName: '',
    phoneNumber: '',
    location: '',
    companyWebsite: ''
  });
  const [successMessage, setSuccessMessage] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value
    });
  };

  const handleEdit = () => {
    setProfileData({
      name: user?.name || '',
      companyName: user?.companyName || '',
      phoneNumber: user?.phoneNumber || '',
      location: user?.location || '',
      companyWebsite: user?.companyWebsite || ''
    });
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      await updateProfile(
        profileData.name,
        profileData.companyName,
        profileData.phoneNumber,
        profileData.location,
        profileData.companyWebsite
      );
      setSuccessMessage(true); 
      setIsEditing(false);
      setTimeout(() => {
        setSuccessMessage(false); 
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  const navbarItems = [
    { text: 'Home', link: '/user-dashboard/home' },
    { text: 'Add Product', link: '/user-dashboard/addProduct' },
    { text: 'Products & Reviews', link: '/user-dashboard/product-review' },
    { text: 'Products & Status', link: '/user-dashboard/product-status' },
    { text: 'Profile', link: '/user-dashboard/profile' }
  ];

  return (
    <div className="flex flex-col md:flex-row">
      <Sidebar items={navbarItems} />
      <div className="flex-grow p-6">
        <div className="bg-white shadow-md rounded-lg p-6 max-w-3xl mx-auto">
          <h1 className="text-2xl font-bold mb-4 text-gray-800">Welcome, {user?.name}</h1>
          <h3 className="text-xl text-gray-600 mb-6">Your Registered Email Id: {user?.email}</h3>
          {isEditing ? (
            <>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  <FaBuilding className="inline mr-2" /> Company Name:
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={profileData.companyName}
                  onChange={handleChange}
                  placeholder={user?.companyName || 'Enter company name'}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-stone-300 focus:border-stone-950"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  <FaPhone className="inline mr-2" /> Phone Number:
                </label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={profileData.phoneNumber}
                  onChange={handleChange}
                  placeholder={user?.phoneNumber || 'Enter phone number'}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-stone-300 focus:border-stone-950"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  <FaMapMarkerAlt className="inline mr-2" /> Location:
                </label>
                <input
                  type="text"
                  name="location"
                  value={profileData.location}
                  onChange={handleChange}
                  placeholder={user?.location || 'Enter location'}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-stone-300 focus:border-stone-950"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  <FaGlobe className="inline mr-2" /> Company Website:
                </label>
                <input
                  type="text"
                  name="companyWebsite"
                  value={profileData.companyWebsite}
                  onChange={handleChange}
                  placeholder={user?.companyWebsite || 'Enter company website'}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-stone-300 focus:border-stone-950"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  <FaUser className="inline mr-2" /> Name:
                </label>
                <input
                  type="text"
                  name="name"
                  value={profileData.name}
                  onChange={handleChange}
                  placeholder={user?.name || 'Enter your name'}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-stone-300 focus:border-stone-950"
                />
              </div>
              <button
                onClick={handleSave}
                className="bg-stone-950 hover:bg-stone-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                <FaSave className="inline mr-2" /> Save
              </button>
            </>
          ) : (
            <>
              <h1 className="text-xl text-gray-800 mb-2"><FaBuilding className="inline mr-2" /> Company Name: {user?.companyName}</h1>
              <h1 className="text-xl text-gray-800 mb-2"><FaPhone className="inline mr-2" /> Phone Number: {user?.phoneNumber}</h1>
              <h1 className="text-xl text-gray-800 mb-2"><FaMapMarkerAlt className="inline mr-2" /> Location: {user?.location}</h1>
              <h1 className="text-xl text-gray-800 mb-6"><FaGlobe className="inline mr-2" /> Company Website: {user?.companyWebsite}</h1>
              <button
                onClick={handleEdit}
                className="bg-stone-950 hover:bg-stone-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                <FaEdit className="inline mr-2" /> Edit
              </button>
            </>
          )}
          <ToastContainer />
          {successMessage && (
            <div className="max-w-md mx-auto bg-green-100 border border-green-400 text-stone-800 px-4 py-3 rounded relative mt-4" role="alert">
              Profile updated successfully!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
