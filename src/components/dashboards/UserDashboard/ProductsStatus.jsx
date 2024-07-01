// import React, { useContext, useState, useEffect } from 'react';
// import Sidebar from '../Sidebar'; 
// import AppContext from '../../../context/AppContext';
// import axios from 'axios';

// const AllProduct = () => {
//   const [products, setProducts] = useState([]);
//   const [starCounts, setStarCounts] = useState({});
//   const [filter, setFilter] = useState('Approved'); 
//   const { user, fetchReviews } = useContext(AppContext);


//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(`${import.meta.env.VITE_API_URL}/product/all?email=${user?.email}`);
//         const fetchedProducts = response.data;
//         setProducts(fetchedProducts);
//         console.log('Fetched Products:', fetchedProducts);

//         const starCountsData = {};
//         await Promise.all(fetchedProducts.map(async (product) => {
//           const counts = await fetchReviews(product._id);
//           starCountsData[product._id] = counts;
//         }));

//         setStarCounts(starCountsData);
//       } catch (error) {
//         console.error('Error fetching product data:', error);
//       }
//     };

//     fetchData();
//   }, [user?.email]);

//   const navbarItems = [
//     { text: 'Home', link: '/user-dashboard/home' },
//     { text: 'Add Product', link: '/user-dashboard/addProduct' },
//     { text: 'Products & Reviews', link: '/user-dashboard/productStatus' },
//     { text: 'Products & Status', link: '/user-dashboard/allProduct' },
//     { text: 'Profile', link: '/user-dashboard/profile' },
//   ];

//   const filteredProducts = products.filter(product => product.status === filter);

//   return (
//     <div className="flex flex-col md:flex-row">
//       <Sidebar items={navbarItems} />
//       <div className="flex-1 md:ml-16 p-4">
//         <h1 className="text-2xl font-semibold mb-4">Products & Status</h1>
//         <h3 className='textb-base mb-4 text-stone-600'>Please refresh the page you haven't see any status or products</h3>

//         <div className="mb-4 flex flex-wrap">
//           <button
//             className={`px-4 py-2 rounded ${filter === 'Approved' ? 'bg-stone-950 text-white' : 'bg-gray-200'}`}
//             onClick={() => setFilter('Approved')}
//           >
//             Approved
//           </button>
//           <button
//             className={`ml-2 px-4 py-2 rounded ${filter === 'Not approved' ? 'bg-stone-950 text-white' : 'bg-gray-200'}`}
//             onClick={() => setFilter('Not approved')}
//           >
//             Not Approved
//           </button>
//         </div>
//         <div className="grid grid-cols-1 gap-4">
//           {filteredProducts.map(product => (
//             <div key={product._id} className=" rounded-lg p-4 shadow-md border border-stone-400 ">
//               <div className="flex flex-col md:flex-row items-center mb-4">
//                 <img src={product.companyImage} alt="Company" className="  h-16 mr-4 mb-4 md:mb-0" />
//                 <div className="flex-1">
//                   <h2 className="text-xl font-semibold mb-1">Company Name: {product.companyName}</h2>
//                   <p className="text-gray-500">Category: {product.companyCategory}</p>
//                   <p className={`text-gray-500 ${product.status === 'Approved' ? 'text-green-600' : 'text-red-600'}`}>
//                     Status: {product.status}
//                   </p>
//                 </div>
//               </div>
//               <p className="text-yellow-800 mb-4">Total Ratings: {starCounts[product._id]?.totalRatings || 0}</p>
//               {product.servicesImages && product.servicesImages.length > 0 && (
//                 <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
//                   {product.servicesImages.map((image, index) => (
//                     <img
//                       key={index}
//                       src={image}
//                       alt={`Service ${index}`}
//                       className="rounded-lg shadow-md w-full h-28 object-cover"
//                     />
//                   ))}
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AllProduct;
import React, { useContext, useState, useEffect } from 'react';
import Sidebar from '../Sidebar'; 
import AppContext from '../../../context/AppContext';
import axios from 'axios';

const AllProduct = () => {
  const [products, setProducts] = useState([]);
  const [starCounts, setStarCounts] = useState({});
  const [filter, setFilter] = useState('Approved'); 
  const [showDetails, setShowDetails] = useState(false); // State to toggle details
  const { user, fetchReviews } = useContext(AppContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/product/all?email=${user?.email}`);
        const fetchedProducts = response.data;
        setProducts(fetchedProducts);

        const starCountsData = {};
        await Promise.all(fetchedProducts.map(async (product) => {
          const counts = await fetchReviews(product._id);
          starCountsData[product._id] = counts;
        }));

        setStarCounts(starCountsData);
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    fetchData();
  }, [user?.email]);

  const navbarItems = [
    { text: 'Home', link: '/user-dashboard/home' },
    { text: 'Add Product', link: '/user-dashboard/addProduct' },
    { text: 'Products & Reviews', link: '/user-dashboard/product-review' },
    { text: 'Products & Status', link: '/user-dashboard/product-status' },
    { text: 'Profile', link: '/user-dashboard/profile' },
  ];

  const filteredProducts = products.filter(product => product.status === filter);

  return (
    <div className="flex flex-col md:flex-row">
      <Sidebar items={navbarItems} />
      <div className="flex-1 md:ml-16 p-4">
        <h1 className="text-2xl font-semibold mb-4">Products & Status</h1>
        <h3 className="text-base mb-4 text-gray-600">Please refresh the page if you don't see any status or products.</h3>

        <div className="mb-4 flex flex-wrap">
          <button
            className={`px-4 py-2 rounded ${filter === 'Approved' ? 'bg-stone-950 text-white' : 'bg-gray-200'}`}
            onClick={() => setFilter('Approved')}
          >
            Approved
          </button>
          <button
            className={`ml-2 px-4 py-2 rounded ${filter === 'Not approved' ? 'bg-red-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setFilter('Not approved')}
          >
            Not Approved
          </button>
        </div>
        
        <div className="grid grid-cols-1 gap-4">
          {filteredProducts.map(product => (
            <div key={product._id} className="rounded-lg p-4 shadow-md border-2 border-stone-400 mb-4">
              <div className="flex flex-col md:flex-row items-center mb-4">
                <img src={product.companyImage} alt="Company" className="h-16 mr-4 mb-4 md:mb-0" />
                <div className="flex-1">
                  <h2 className="text-xl font-semibold mb-1">Company Name: {product.companyName}</h2>
                  <p className="text-gray-500">Category: {product.companyCategory}</p>
                  <p className={`text-gray-500 ${product.status === 'Approved' ? 'text-green-600' : 'text-red-600'}`}>
                    Status: {product.status}
                  </p>
                </div>
              </div>
              
              <p className="text-yellow-800 mb-4">Total Ratings: {starCounts[product._id]?.totalRatings || 0}</p>
              
              {showDetails && (
                <div className="mb-4">
                  <p className="text-gray-700 mb-2"> <span className='text-stone-400'>Contact Number:</span> {product.contactNumber}</p>
                  <p className="text-gray-700 text-base mb-2"><span className='text-stone-400'>Short Summary: </span>{product.description}</p>

               <p className="text-gray-700 text-sm mb-2"><span className='text-stone-400'>About us: </span> {product.aboutCompany}</p>
                 
                </div>
              )}
              
              <button
                className="hover:underline text-green-600 "
                onClick={() => setShowDetails(!showDetails)}
              >
                {showDetails ? 'Hide Details' : 'See Details'}
              </button>
              
              {product.servicesImages && product.servicesImages.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-4">
                  {product.servicesImages.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Service ${index}`}
                      className="rounded-lg shadow-md w-full h-28 object-cover"
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllProduct;
