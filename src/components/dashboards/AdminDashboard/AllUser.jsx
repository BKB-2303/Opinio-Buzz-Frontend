import React, { useEffect, useState,useContext } from 'react';
import Sidebar from '../Sidebar';
import axios from 'axios';
import AppContext from '../../../context/AppContext'

const AllUser = () => {
  const { user, updateProfile } = useContext(AppContext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const navbarItems = [
    { text: 'Home', link: '/admin-dashboard/home' },
    { text: 'All User', link: '/admin-dashboard/allUser' },
    { text: 'Product Control', link: '/admin-dashboard/product-control' },
    { text: 'Profile', link: '/admin-dashboard/profile' },
  ];


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/user/all`);
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const deleteUser = async (userId, userEmail) => {
    try {
      if (userEmail === user?.email) {
        alert("You cannot delete your own account.");
        return;
      }

      const confirmDelete = window.confirm("Are you sure you want to delete this user from Opinio Buzz system?");
      if (!confirmDelete) return;

      await axios.delete(`${import.meta.env.VITE_API_URL}/user/delete/${userId}`);
     
      setUsers(users.filter(user => user._id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
     
    }
  };

  return (
    <div className="flex flex-col md:flex-row">
      <Sidebar items={navbarItems} />
      <div className="ml-0 md:ml-16 p-4 flex-grow">
        <h1 className="text-2xl font-bold mb-4">All Users</h1>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">Error: {error}</p>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {users.map(user => (
              <div key={user._id} className="bg-white rounded-lg p-4 shadow-md border-2 border-stone-400 ">
                <p className="text-gray-600 mb-2"><span className="font-semibold">ID:</span> {user._id}</p>
                <p className="text-gray-600 mb-2"><span className="font-semibold">Name:</span> {user.name}</p>
                <p className="text-gray-600 mb-2"><span className="font-semibold">Email:</span> {user.email}</p>
                <p className="text-gray-600 mb-2"><span className="font-semibold">Company Name:</span> {user.companyName}</p>
                <p className="text-gray-600 mb-2"><span className="font-semibold">Phone Number:</span> {user.phoneNumber}</p>
                <p className="text-gray-600 mb-2"><span className="font-semibold">Location:</span> {user.location}</p>
                <p className="text-gray-600 mb-2"><span className="font-semibold">Created At:</span> {new Date(user.createdAt).toLocaleDateString()}</p>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded mt-2"
                  onClick={() => deleteUser(user._id, user.email)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllUser;
