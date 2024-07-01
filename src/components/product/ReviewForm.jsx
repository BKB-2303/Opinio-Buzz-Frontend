import React, { useState, useEffect } from 'react';
import { AiFillStar, AiOutlineStar, AiOutlineClose } from 'react-icons/ai';
import { useParams } from "react-router-dom";

const avatarUrls = [
    'https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png',
    'https://randomuser.me/api/portraits/women/11.jpg',
    'https://randomuser.me/api/portraits/men/14.jpg',
    'https://randomuser.me/api/portraits/women/3.jpg',
    'https://randomuser.me/api/portraits/men/18.jpg',
    'https://randomuser.me/api/portraits/women/5.jpg',
    'https://randomuser.me/api/portraits/men/4.jpg',
];

const RatingForm = ({ onClose, userEmail }) => {
    const { id } = useParams(); 
    const [rating, setRating] = useState(0); 
    const [selectedAvatar, setSelectedAvatar] = useState(avatarUrls[0]); 
    const [name, setName] = useState(''); 
    const [error, setError] = useState('');
    const [submitSuccess, setSubmitSuccess] = useState(false); 

    useEffect(() => {
        setSelectedAvatar(avatarUrls[0]); 
    }, []); 

    const handleRatingChange = (value) => {
        setRating(value); 
    };

    const handleAvatarSelect = (url) => {
        setSelectedAvatar(url); 
    };

    const handleNameChange = (event) => {
        setName(event.target.value); 
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        
        
        if (rating === 0) {
            setError('Please select a rating');
            return;
        } else {
            setError('');
        }

    
        const reviewData = {
            Name: name.trim(),
            userEmail: userEmail,
            productId: id, 
            avatarImage: selectedAvatar, 
            ratingCount: rating,
            description: event.target.review.value, 
        };

        
        fetch(`${import.meta.env.VITE_API_URL}/product/${id}/reviews`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reviewData),
        })
        .then(response => response.json())
        .then(data => {
            setSubmitSuccess(true); 
        })
        .catch(error => {
            console.error('Error submitting review:', error);
          
        });
    };



    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70">
            <div className="bg-white bg-opacity-90 p-4 border border-gray-200 rounded-md shadow-md max-w-md w-full relative">
                <button
                    onClick={onClose}
                    className="absolute top-0 right-0 mt-2 mr-2 text-gray-500 hover:text-gray-700"
                >
                    <AiOutlineClose size={20} />
                </button>
                {submitSuccess ? (
                    <div>
                        <h2 className="text-xl text-stone-600 font-semibold mb-4 text-center">Thank you for your review!</h2>
                        <p className="text-orange-400 mb-4 text-center">
                            Your review has been submitted successfully. You can now see your review.
                            Please refresh the page to see your review live.
                        </p>
                        
                    </div>
                ) : (
                    <div>
                        <h2 className="text-xl text-stone-600 font-semibold mb-4 text-center">Write a Review</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {error && <p className="text-red-500">{error}</p>}
                            <div className="flex items-center justify-center mb-4 space-x-2">
                                {/* Render avatar options */}
                                {avatarUrls.map((url, index) => (
                                    <button
                                        key={index}
                                        type="button"
                                        onClick={() => handleAvatarSelect(url)}
                                        className={`p-1 rounded-full border border-gray-300 ${
                                            selectedAvatar === url ? 'ring-2 ring-blue-500' : ''
                                        }`}
                                    >
                                        <img
                                            src={url}
                                            alt={`Avatar ${index + 1}`}
                                            className="h-8 w-8 rounded-full"
                                        />
                                    </button>
                                ))}
                            </div>
                            <div className="flex items-center justify-center mb-4">
                                {/* Render 5 stars */}
                                {[...Array(5)].map((_, index) => (
                                    <button
                                        key={index}
                                        type="button"
                                        onClick={() => handleRatingChange(index + 1)}
                                    >
                                        {index < rating ? (
                                            <AiFillStar className="text-yellow-500" size={24} />
                                        ) : (
                                            <AiOutlineStar className="text-gray-400" size={24} />
                                        )}
                                    </button>
                                ))}
                            </div>
                            <input
                                type="text"
                                value={name}
                                onChange={handleNameChange}
                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-stone-900"
                                placeholder="Your Name"
                                required
                            />
                            <textarea
                                name="review"
                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-stone-900"
                                placeholder="Write your review..."
                                rows={4}
                            />
                            <div className="mt-4 flex justify-center">
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-stone-950 text-white rounded-md hover:bg-stone-800 focus:outline-none focus:bg-stone-700"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RatingForm;
