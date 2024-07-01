import React, { useContext, useEffect, useState } from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { useParams } from 'react-router-dom';
import AppContext from '../../context/AppContext';
import RatingImg from '../../assets/rating.png';

const DisplayReview = () => {
  const { id } = useParams();
  const { reviews, fetchReviews, starCounts } = useContext(AppContext);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [sortedReviews, setSortedReviews] = useState([]);
  const [sortByLatest, setSortByLatest] = useState(false);

  useEffect(() => {
    fetchReviews(id);
  }, [id]);

  useEffect(() => {
    setSortedReviews([...reviews]);
  }, [reviews]);

  const toggleShowAllReviews = () => {
    setShowAllReviews(!showAllReviews);
  };

  const toggleSortByLatest = () => {
    setSortByLatest(!sortByLatest);
    setSortedReviews(prevReviews =>
      prevReviews.slice().sort((a, b) => sortByLatest 
        ? new Date(a.createdAt) - new Date(b.createdAt) 
        : new Date(b.createdAt) - new Date(a.createdAt)
      )
    );
  };

  const displayedReviews = showAllReviews ? sortedReviews : sortedReviews.slice(0, 6);

  return (
    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 mb-10">
      <div className="flex flex-col sm:flex-row items-center justify-center">
        <div className="mb-4 sm:mb-0 sm:mr-4">
          <img src={RatingImg} alt="" className="w-32 sm:w-48" />
        </div>
        <div className="text-center">
          <div className="flex flex-col sm:flex-row items-center justify-center mb-4">
            <p className="text-red-400 text-xl">Total Reviews: {starCounts.totalRatings || 0}</p>
          </div>

          {[5, 4, 3, 2, 1].map((stars, index) => (
            <div key={index} className="flex items-center justify-center mb-2">
              <span className="mr-2">{starCounts[`count${stars}Star`] || 0}</span>
              <span className="text-gray-400">(people rate as)</span>
              {Array.from({ length: stars }, (_, index) => (
                <AiFillStar key={index} className="text-yellow-500" />
              ))}
              {Array.from({ length: 5 - stars }, (_, index) => (
                <AiOutlineStar key={index} className="text-gray-400" />
              ))}
            </div>
          ))}
        </div>
      </div>

      <h1 className="text-xl sm:text-2xl font-semibold mb-4">Reviews</h1>

      <div className="flex justify-end mb-4">
        <button
          onClick={toggleSortByLatest}
          className="px-4 py-2 bg-stone-950 text-white rounded-md hover:bg-stone-800 focus:outline-none focus:bg-stone-700"
        >
          {sortByLatest ? 'Sort by Oldest' : 'Sort by Latest'}
        </button>
      </div>

      {sortedReviews.length === 0 ? (
        <p className="text-gray-500">No reviews yet. Be the first to review this product!</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayedReviews.map((review) => (
            <div
              key={review._id}
              className="flex flex-col items-start border p-4 rounded-md shadow-md transition-transform transform hover:scale-105 hover:shadow-lg hover:border-yellow-500"
            >
              <img
                src={review.avatarImage}
                alt={review.Name}
                className="h-12 w-12 rounded-full object-cover mb-4"
              />
              <div className="flex items-center mb-2">
                <h2 className="text-lg font-semibold">{review.Name}</h2>
                <div className="flex ml-2">
                  {Array.from({ length: review.ratingCount }, (_, index) => (
                    <AiFillStar key={index} className="text-yellow-500" />
                  ))}
                  {Array.from({ length: 5 - review.ratingCount }, (_, index) => (
                    <AiOutlineStar key={index} className="text-gray-400" />
                  ))}
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-2">{review.description}</p>
              <p className="text-xs text-gray-400">Date: {new Date(review.createdAt).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      )}

      {sortedReviews.length > 6 && !showAllReviews && (
        <div className="flex justify-center mt-4">
          <button
            onClick={toggleShowAllReviews}
            className="px-4 py-2 bg-stone-950 text-white rounded-md hover:bg-stone-800 focus:outline-none focus:bg-stone-700"
          >
            Read More Reviews
          </button>
        </div>
      )}

      {showAllReviews && (
        <div className="flex justify-center mt-4">
          <button
            onClick={toggleShowAllReviews}
            className="px-4 py-2 bg-stone-950 text-white rounded-md hover:bg-stone-800 focus:outline-none focus:bg-stone-700"
          >
            Hide Reviews
          </button>
        </div>
      )}
    </div>
  );
};

export default DisplayReview;
