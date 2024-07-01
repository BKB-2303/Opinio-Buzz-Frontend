// import React, { useState, useEffect, useContext } from 'react';
// import { Link } from 'react-router-dom';
// import AppContext from '../../context/AppContext';
// import axios from 'axios';
// import { FaStarHalfAlt, FaBoxOpen, FaInfoCircle, FaArrowCircleUp, FaSyncAlt } from 'react-icons/fa';

// const ShowProduct = () => {
//   const { fetchReviews } = useContext(AppContext);
//   const [products, setProducts] = useState([]);
//   const [starCounts, setStarCounts] = useState({});
//   const [selectedCategory, setSelectedCategory] = useState('All');

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(`${import.meta.env.VITE_API_URL}/product/allProducts`);
//         const fetchedProducts = response.data;
//         setProducts(fetchedProducts);

//         const starCountsData = {};
//         await Promise.all(fetchedProducts.map(async (product) => {
//           if (product.status === "Approved") {
//             const counts = await fetchReviews(product._id);
//             starCountsData[product._id] = counts;
//           }
//         }));

//         setStarCounts(starCountsData);
//       } catch (error) {
//         console.error('Error fetching product data:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   const approvedProducts = products.filter(product => product.status === "Approved");
//   const categories = ['All', ...new Set(approvedProducts.map(product => product.companyCategory))];

//   const handleCategoryChange = (category) => {
//     setSelectedCategory(category);
//   };

//   const filteredProducts = selectedCategory === 'All' 
//     ? approvedProducts 
//     : approvedProducts.filter(product => product.companyCategory === selectedCategory);

//   return (
//     <div className="min-h-screen p-4 flex flex-col items-center">
//       <div className="mb-4 flex flex-wrap justify-center space-x-2">
//         {categories.map(category => (
//         <button
//         key={category}
//         onClick={() => handleCategoryChange(category)}
//         className={`px-4 py-2 rounded-md 
//           ${selectedCategory === category ? 'bg-stone-800 text-white' : ' text-gray-700'}
//           transition duration-300 ease-in-out 
//           hover:bg-stone-600 hover:text-white
//           sm:px-3 sm:py-1.5 md:px-3 md:py-1.5 lg:px-4 lg:py-2 xl:px-4 xl:py-2
//         `}
//       >
//         {category}
//       </button>
      
//         ))}
//       </div>

//       {filteredProducts.length === 0 ? (
//         <div className="text-center">
//           <div className="mb-4">
//             <FaBoxOpen className="text-6xl text-gray-400 mx-auto mb-4" />
//             <p className="text-2xl text-gray-600">No products yet.</p>
//             <p className="text-gray-400">Check back soon for updates!</p>
//             <div className="mt-4 flex justify-center space-x-4">
//               <FaInfoCircle className="text-3xl text-blue-400" />
//               <p className="text-gray-500">Stay tuned for upcoming products and reviews.</p>
//             </div>
//             <div className="mt-4 flex justify-center space-x-4">
//               <FaArrowCircleUp className="text-3xl text-green-400" />
//               <p className="text-gray-500">
//                 In the meantime, learn more about us{' '}
//                 <Link to="/about" className="text-blue-500 underline hover:text-blue-700">
//                   here
//                 </Link>.
//               </p>
//             </div>
//             <div className="mt-4 flex justify-center space-x-4">
//               <FaSyncAlt className="text-3xl text-yellow-400" />
//               <p className="text-gray-500">
//                 Sometimes products are not shown due to network issues. Please{' '}
//                 <button onClick={() => window.location.reload()} className="text-blue-500 underline hover:text-blue-700">
//                   refresh this page
//                 </button>{' '}
//                 if the issue persists, check back again later.
//               </p>
//             </div>
//           </div>
//         </div>
//       ) : (
//         <div className="sm:mx-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2">
//           {filteredProducts.map(product => (
//             <div key={product._id} className="border rounded-lg p-4 shadow-md bg-white flex flex-col justify-between transition-transform transform hover:scale-105 hover:shadow-xl">
//               <div>
//                 <div className="mb-4 h-32 w-full overflow-hidden rounded-lg">
//                   <Link to={`/product/${product._id}`}>
//                     <img 
//                       src={product.companyImage} 
//                       alt={product.companyName} 
//                       className="h-full object-cover hover:opacity-90 transition duration-300 ease-in-out" 
//                     />
//                   </Link>
//                 </div>
//                 <h2 className="text-xl font-semibold mb-2">
//                   <Link to={`/product/${product._id}`} className="hover:text-green-400">
//                     {product.companyName}
//                   </Link>
//                 </h2>
//                 <p className="text-stone-600 text-sm mb-2 line-clamp-3">{product.description}</p>
//                 <p className="text-stone-400 text-sm mb-2">{product.companyCategory}</p>
//                 <div className="flex items-center">
//                   <p className="text-yellow-500 text-base mr-1">Reviews:</p>
//                   <FaStarHalfAlt className="text-yellow-500" />
//                 </div>
//                 <p className="text-gray-500 text-sm">{starCounts[product._id]?.totalRatings || 0} total</p>
//               </div>
//               <Link 
//                 to={`/product/${product._id}`} 
//                 className="inline-block text-red-400 hover:text-green-400 rounded-lg transition duration-300 ease-in-out self-end"
//               >
//                 Visit us
//               </Link>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ShowProduct;
import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../../context/AppContext';
import axios from 'axios';
import { FaStarHalfAlt, FaBoxOpen, FaInfoCircle, FaArrowCircleUp, FaSyncAlt } from 'react-icons/fa';

const ShowProduct = () => {
  const { fetchReviews } = useContext(AppContext);
  const [products, setProducts] = useState([]);
  const [starCounts, setStarCounts] = useState({});
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/product/allProducts`);
        const fetchedProducts = response.data;
        setProducts(fetchedProducts);

        const starCountsData = {};
        await Promise.all(fetchedProducts.map(async (product) => {
          if (product.status === "Approved") {
            const counts = await fetchReviews(product._id);
            starCountsData[product._id] = counts;
          }
        }));

        setStarCounts(starCountsData);
        setLoading(false); // Data fetching is complete
      } catch (error) {
        console.error('Error fetching product data:', error);
        setLoading(false); // Data fetching failed
      }
    };

    fetchData();
  }, []);

  const approvedProducts = products.filter(product => product.status === "Approved");
  const categories = ['All', ...new Set(approvedProducts.map(product => product.companyCategory))];

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const filteredProducts = selectedCategory === 'All' 
    ? approvedProducts 
    : approvedProducts.filter(product => product.companyCategory === selectedCategory);

  return (
    <div className="min-h-screen p-4 flex flex-col items-center">
      <div className="mb-4 flex flex-wrap justify-center space-x-2">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => handleCategoryChange(category)}
            className={`px-4 py-2 rounded-md 
              ${selectedCategory === category ? 'bg-stone-800 text-white' : ' text-gray-700'}
              transition duration-300 ease-in-out 
              hover:bg-stone-600 hover:text-white
              sm:px-3 sm:py-1.5 md:px-3 md:py-1.5 lg:px-4 lg:py-2 xl:px-4 xl:py-2
            `}
          >
            {category}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex flex-col justify-center items-center h-64 space-y-4">
          <div className="w-16 h-16 border-4 border-t-4 border-gray-200 border-t-stone-500 rounded-full animate-spin"></div>
          <h1 className="text-lg font-semibold text-stone-300">Loading! Please wait...</h1>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center">
          <div className="mb-4">
            <FaBoxOpen className="text-6xl text-gray-400 mx-auto mb-4" />
            <p className="text-2xl text-gray-600">No products yet.</p>
            <p className="text-gray-400">Check back soon for updates!</p>
            <div className="mt-4 flex justify-center space-x-4">
              <FaInfoCircle className="text-3xl text-blue-400" />
              <p className="text-gray-500">Stay tuned for upcoming products and reviews.</p>
            </div>
            <div className="mt-4 flex justify-center space-x-4">
              <FaArrowCircleUp className="text-3xl text-green-400" />
              <p className="text-gray-500">
                In the meantime, learn more about us{' '}
                <Link to="/about" className="text-blue-500 underline hover:text-blue-700">
                  here
                </Link>.
              </p>
            </div>
            <div className="mt-4 flex justify-center space-x-4">
              <FaSyncAlt className="text-3xl text-yellow-400" />
              <p className="text-gray-500">
                Sometimes products are not shown due to network issues. Please{' '}
                <button onClick={() => window.location.reload()} className="text-blue-500 underline hover:text-blue-700">
                  refresh this page
                </button>{' '}
                if the issue persists, check back again later.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="sm:mx-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2">
          {filteredProducts.map(product => (
            <div key={product._id} className="border rounded-lg p-4 shadow-md bg-white flex flex-col justify-between transition-transform transform hover:scale-105 hover:shadow-xl">
              <div>
                <div className="mb-4 h-32 w-full overflow-hidden rounded-lg">
                  <Link to={`/product/${product._id}`}>
                    <img 
                      src={product.companyImage} 
                      alt={product.companyName} 
                      className="h-full object-cover hover:opacity-90 transition duration-300 ease-in-out" 
                    />
                  </Link>
                </div>
                <h2 className="text-xl font-semibold mb-2">
                  <Link to={`/product/${product._id}`} className="hover:text-green-400">
                    {product.companyName}
                  </Link>
                </h2>
                <p className="text-stone-600 text-sm mb-2 line-clamp-3">{product.description}</p>
                <p className="text-stone-400 text-sm mb-2">{product.companyCategory}</p>
                <div className="flex items-center">
                  <p className="text-yellow-500 text-base mr-1">Reviews:</p>
                  <FaStarHalfAlt className="text-yellow-500" />
                </div>
                <p className="text-gray-500 text-sm">{starCounts[product._id]?.totalRatings || 0} total</p>
              </div>
              <Link 
                to={`/product/${product._id}`} 
                className="inline-block text-red-400 hover:text-green-400 rounded-lg transition duration-300 ease-in-out self-end"
              >
                Visit us
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShowProduct;
