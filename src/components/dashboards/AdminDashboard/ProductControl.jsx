import React, { useState, useContext } from 'react';
import axios from 'axios';
import Sidebar from '../Sidebar'; 
import AppContext from '../../../context/AppContext';

const Request = () => {
  const { products, setProducts } = useContext(AppContext);
  const [filter, setFilter] = useState('Not approved'); 

  const navbarItems = [
    { text: 'Home', link: '/admin-dashboard/home' },
    { text: 'All User', link: '/admin-dashboard/allUser' },
    { text: 'Product Control', link: '/admin-dashboard/product-control' },
    { text: 'Profile', link: '/admin-dashboard/profile' },
  ];

  const handleStatusChange = async (productId, currentStatus) => {
    try {
      const newStatus = currentStatus === 'Approved' ? 'Not approved' : 'Approved';

      await axios.put(`${import.meta.env.VITE_API_URL}/product/${productId}`, {
        status: newStatus,
      });

      
      setProducts(prevProducts =>
        prevProducts.map(product =>
          product._id === productId ? { ...product, status: newStatus } : product
        )
      );

      alert(`Product status updated to ${newStatus}`);
    } catch (error) {
      console.error('Error updating product status:', error);
    }
  };

  const handleDelete = async (productId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete the product details?");

    if (confirmDelete) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/product/${productId}`);

      
        setProducts(prevProducts =>
          prevProducts.filter(product => product._id !== productId)
        );

     
        alert("Product deleted successfully");
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  
  const filteredProducts = products.filter(product => product.status === filter);

  return (
    <div>
      <Sidebar items={navbarItems} />
      <div className="ml-16">
        <h1 className="text-2xl font-semibold mb-4">All Products</h1>
        <div className="flex mb-4">
          <button
            onClick={() => setFilter('Not approved')}
            className={`mr-2 bg-gray-300 hover:bg-gray-400 text-gray-800 py-1 px-2 rounded-lg focus:outline-none ${filter === 'Not approved' ? 'bg-gray-400' : ''}`}
          >
            Not Approved
          </button>
          <button
            onClick={() => setFilter('Approved')}
            className={`bg-gray-300 hover:bg-gray-400 text-gray-800 py-1 px-2 rounded-lg focus:outline-none ${filter === 'Approved' ? 'bg-gray-400' : ''}`}
          >
            Approved
          </button>
        </div>
        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProducts.map(product => (
            <div key={product._id} className="bg-white shadow-md rounded-lg p-4 border-2 border-stone-400">
              <p className="text-gray-600 mb-2"><span className="font-semibold">Company Name:</span> {product.companyName}</p>
              <p className="text-gray-600 mb-2"><span className="font-semibold">Description:</span> {product.description}</p>
              <p className="text-gray-600 mb-2"><span className="font-semibold">Category:</span> {product.companyCategory}</p>
              <img src={product.companyImage} alt={product.companyName} className="h-10 w-auto rounded-lg mb-2" />
              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2">
                {product.servicesImages && product.servicesImages.length > 0 && (
                  product.servicesImages.map((image, index) => (
                    <img key={index} src={image} alt={`Service ${index}`} className="h-24 w-auto rounded-lg" />
                  ))
                )}
              </div>
              <p className="text-gray-600 my-2"><span className="font-semibold">Status:</span> {product.status}</p>
              <div className="flex">
                <button
                  onClick={() => handleStatusChange(product._id, product.status)}
                  className="bg-stone-950 hover:bg-stone-700 text-sm text-white py-1 px-2 rounded-lg mr-2"
                >
                  {product.status === 'Approved' ? 'Mark Not Approved' : 'Mark Approved'}
                </button>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded-lg"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Request;
