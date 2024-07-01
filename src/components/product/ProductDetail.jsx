import React, { useState, useEffect, useContext } from 'react';

import { MdArrowBack } from 'react-icons/md';
import { FiPhoneCall, FiExternalLink } from 'react-icons/fi'; 
import { useParams } from "react-router-dom";
import ReviewForm from "./ReviewForm"; 
import DisplayReview from './DisplayReview'
import AppContext from '../../context/AppContext'
import { Link } from 'react-router-dom';
const productsDetail = () => {
  const [showReviewForm, setShowReviewForm] = useState(false);

  const { products, fetchProductById,url} = useContext(AppContext);
  const { id } = useParams();
 
  const toggleReviewForm = () => {
    setShowReviewForm(!showReviewForm);
  };


  useEffect(() => {
    fetchProductById(url, id);
  }, [id, url,fetchProductById]);
  if (!products) {
    return <div>Loading...</div>;
  }

  return (
    <>
    <div className="p-4">
  <Link to={'/'} className="flex items-center ml-4  text-stone-950 hover:text-stone-700 rounded-lg px-4 py-2 mb-4">
    <MdArrowBack size={18} />
    <h1 className="text-sm font-semibold ml-2">Home</h1>
  </Link>
  <div className="border rounded-lg p-4 shadow-md bg-white max-w-screen-xl mx-auto">
    <div className="mb-4 flex justify-center items-center">
      <img
        src={products.companyImage}
        alt={products.companyName}
        className="h-48 w-auto max-w-full rounded-lg object-cover"
      />
    </div>
    <h2 className="text-xl font-semibold mb-2">{products.companyName}  </h2> 
    <a href="#allreviews" className='text-red-400 hover:text-green-400'>See All reviews</a>
    <p className="text-stone-900 mb-4">{products.description}</p>
    <p className="text-stone-400 mb-2">{products.companyCategory}</p>
    <p className="text-stone-500 mb-2"><span className='text-yellow-700'>About  </span> {products.aboutCompany}</p>
    
    {products.servicesImages && products.servicesImages.length > 0 && (
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Services Images</h3>
        {/* Responsive grid for services images */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2">
          {products.servicesImages.map((image, index) => (
            <div key={index} className="flex justify-center relative overflow-hidden rounded-lg hover:scale-105 transition-transform duration-300">
              <img
                src={image}
                alt={`Service ${index}`}
                className="h-full sm:h-56 sm:w-56 w-full rounded-lg object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    )}

    <div className="flex items-center text-gray-500 mb-2">
      <a href={`tel:${products.contactNumber}`} className="flex items-center">
        <FiPhoneCall size={20} className="mr-2 text-red-700" />
        Call us: {products.contactNumber}
      </a>
    </div>
    
    {products.url && (
      <div className="flex items-center text-gray-500 mb-2">
        <FiExternalLink size={20} className="mr-2 text-green-800 " />
       <a href={products.url} target="_blank" className="text-green-800 hover:text-green-400">For More Information</a>
      </div>
    )}

    <button
      onClick={toggleReviewForm}
      className="inline-block mt-4 px-4 py-2 bg-stone-950 text-white rounded-lg hover:bg-stone-800 transition duration-150 ease-in-out"
    >
      Write a Review
    </button>
  </div>

  {showReviewForm && (
    <ReviewForm products={products} userEmail={products.userEmail} onClose={toggleReviewForm} />
  )}
</div>;


<div id="allreviews">
<DisplayReview/>

</div>
    </>
  );
};

export default productsDetail;
