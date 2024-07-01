import React, { useContext, useState, useEffect } from 'react';
import AppContext from '../../../context/AppContext';
import Sidebar from '../Sidebar'; 
import axios from 'axios';
import { AiFillStar } from 'react-icons/ai';

const ProductStatus = () => {
  const { user, products } = useContext(AppContext);

  const [productReviews, setProductReviews] = useState(() => {
  
    const storedReviews = localStorage.getItem('productReviews');
    return storedReviews ? JSON.parse(storedReviews) : {};
  });

  useEffect(() => {
   
    if (user && user.email && products.length > 0) {
      fetchProductReviews(user.email);
    }
  }, [user, products]); 

  useEffect(() => {
    
    localStorage.setItem('productReviews', JSON.stringify(productReviews));
  }, [productReviews]); 

  const fetchProductReviews = async (email) => {
    try {
    
      const reviewsResponse = await axios.get(`${import.meta.env.VITE_API_URL}/product/reviews/user/${email}`);

    
      const groupedReviews = {};
      reviewsResponse.data.forEach((review) => {
        if (!groupedReviews[review.productId]) {
          groupedReviews[review.productId] = [];
        }
        groupedReviews[review.productId].push(review);
      });

    
      setProductReviews(groupedReviews);

    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const deleteReview = async (reviewId) => {
    try {
 
      if (!window.confirm('Are you sure you want to delete this review?')) {
        return; 
      }

    
      await axios.delete(`${import.meta.env.VITE_API_URL}/product/reviews/${reviewId}`);

     
      const updatedReviews = { ...productReviews };
      Object.keys(updatedReviews).forEach((productId) => {
        updatedReviews[productId] = updatedReviews[productId].filter((review) => review._id !== reviewId);
      });
      setProductReviews(updatedReviews);

    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };

  const [expandedProduct, setExpandedProduct] = useState(null);

  const toggleExpand = (productId) => {
    if (expandedProduct === productId) {
      setExpandedProduct(null);
    } else {
      setExpandedProduct(productId);
    }
  };

  const navbarItems = [
    { text: 'Home', link: '/user-dashboard/home' },
    { text: 'Add Product', link: '/user-dashboard/addProduct' },
    { text: 'Products & Reviews', link: '/user-dashboard/product-review' },
    { text: 'Products & Status', link: '/user-dashboard/product-status' },
    { text: 'Profile', link: '/user-dashboard/profile' },
  ];

  return (
    <div className="flex flex-col md:flex-row">
      <Sidebar items={navbarItems} />
      <div className="flex-1 ml-0 md:ml-16 p-4">
        <h2 className="text-xl font-bold mb-4">Products & Reviews</h2>
        <h3 className='textb-base mb-4 text-stone-600'>Please refresh the page you haven't see any updates or products</h3>
        {products.map((product) => (
          <div key={product._id} className="mb-8  ">
            <div className="flex flex-col md:flex-row items-center mb-2  ">
              <img src={product.companyImage} alt="Company Image" className="w-20 h-20 rounded-lg md:mr-4 mb-4 md:mb-0" />
              <h3 className="text-lg font-semibold">{product.companyName}</h3>
            </div>
            <button
              className="text-green-500 hover:text-gren-700 focus:outline-none mb-4"
              onClick={() => toggleExpand(product._id)}
            >
              {expandedProduct === product._id ? 'Hide Reviews' : 'See Reviews'}
            </button>
            {expandedProduct === product._id && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {productReviews[product._id] && (
                  productReviews[product._id].map((review) => (
                    <div key={review._id} className="bg-gray-100 rounded-lg p-4 border-2 border-stone-300 ">
                      <div className="flex items-center mb-2">
                        <img src={review.avatarImage} alt="Avatar" className="w-12 h-12 rounded-full mr-4" />
                        <div>
                          <p className="font-medium">{review.Name}</p>
                          <p className="text-gray-600">{review.description}</p>
                          <p className="text-gray-600 flex items-center">Rated {review.ratingCount} <AiFillStar className='text-yellow-400 ml-1' /></p>
                        </div>
                      </div>
                      <button
                        className="text-red-500 hover:text-red-800 focus:outline-none"
                        onClick={() => deleteReview(review._id)}
                      >
                        Delete
                      </button>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductStatus;
