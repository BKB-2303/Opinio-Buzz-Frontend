import React, { useState, useContext, useEffect } from 'react';
import Sidebar from '../Sidebar'; 
import AppContext from '../../../context/AppContext'; 

const AddProduct = () => {
  const navbarItems = [
    { text: 'Home', link: '/user-dashboard/home' },
    { text: 'Add Product', link: '/user-dashboard/addProduct' },
    { text: 'Products & Reviews', link: '/user-dashboard/product-review' },
    { text: 'Products & Status', link: '/user-dashboard/product-status' },
    { text: 'Profile', link: '/user-dashboard/profile' },
  ];

  const { addProduct, user } = useContext(AppContext);

  const [productData, setProductData] = useState({
    companyName: user?.companyName || '',
    url: user?.companyWebsite || '',
    companyImage: '',
    servicesImages: '',
    description: '',
    contactNumber: user?.phoneNumber || '',
    aboutCompany: '',
    companyCategory: '',
    userEmail: user?.email || ''
  });

  const [error, setError] = useState('');
  const [isConfirmed, setIsConfirmed] = useState(false);

  useEffect(() => {
    if (user) {
      setProductData(prevData => ({
        ...prevData,
        userEmail: user.email,
        companyName: user.companyName || '',
        url: user.companyWebsite || '',
        contactNumber: user.phoneNumber || ''
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProductData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleCheckboxChange = () => {
    setIsConfirmed(!isConfirmed);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (productData.contactNumber.length !== 10) {
      setError('Contact number must be exactly 10 digits long.');
      return;
    }

    if (!isConfirmed) {
      setError('You must confirm that all information provided is correct.');
      return;
    }

    await addProduct({
      ...productData,
      servicesImages: productData.servicesImages.split(',').map(img => img.trim()), 
    });

    setProductData({
      companyName: user?.companyName || '',
      url: user?.companyWebsite || '',
      companyImage: '',
      servicesImages: '',
      description: '',
      contactNumber: user?.phoneNumber || '',
      aboutCompany: '',
      companyCategory: '',
      userEmail: user?.email || ''
    });

    setIsConfirmed(false);
    setError('');
  };


  const categoryOptions = [
    'Electronics',
    'Cars',
    'House',
    'Fashion',
    'Health & Beauty',
    'Food & Beverage',
    'Sports & Outdoors',
    'Books & Media',
    'Toys & Games',
    'Home Improvement',
    'Art & Crafts',
    'Pet Supplies',
    'Travel & Leisure',
    'Software & Technology',
    'Office Supplies',
    'Baby & Kids',
    'Jewelry & Accessories',
    'Financial Services',
    'Education',
    "Bikes",
        'Other'
  ]

  return (
    <div className="flex flex-col md:flex-row">
      <Sidebar items={navbarItems} />
      <div className="flex-grow p-4">
        <h2 className="text-xl font-bold mb-4">Add Your Product Here</h2>
        {/* Support contact details */}
        <div className="mb-4">
          <h3 className="text-base font-bold mb-2">Need to update your product details?</h3>
          <p className="text-gray-600 mb-2">
            If you would like to make changes to your uploaded product details, please contact us at:
          </p>
          <p className="text-green-800 mb-2">opiniobuzzsupport@gmail.com</p>
          <p className="text-gray-600">
            Our support team will assist you promptly.
          </p>
        </div>

        {/* Note about email notification */}
        <h4 className="text-sm sm:text-base text-stone-600 mb-4">
          *After submitting the product, an email is sent to Opinio Buzz Admin.
        </h4>

        {/* Form for adding a product */}
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto text-sm">
          {error && <div className="mb-4 text-red-500">{error}</div>}
          <div className="mb-4">
            <label htmlFor="companyName" className="block text-gray-700 font-bold mb-2">
              Company Name
            </label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              value={productData.companyName}
              onChange={handleChange}
              className="shadow appearance-none border rounded border-stone-400 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-stone-300 focus:border-stone-950"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="url" className="block text-gray-700 font-bold mb-2">
              Company Website/Product URL (Optional)
            </label>
            <input
              type="url"
              id="url"
              name="url"
              value={productData.url}
              onChange={handleChange}
              className="shadow appearance-none border border-stone-400  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-stone-300 focus:border-stone-950"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="companyImage" className="block text-gray-700 font-bold mb-2">
              Company/Product Image URL
            </label>
            <input
              type="text"
              id="companyImage"
              name="companyImage"
              value={productData.companyImage}
              onChange={handleChange}
              className="shadow appearance-none border border-stone-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-stone-300 focus:border-stone-950"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="servicesImages" className="block text-gray-700 font-bold mb-2">
              Services Images URLs (Optional)
            </label>
            <input
              type="text"
              id="servicesImages"
              name="servicesImages"
              value={productData.servicesImages}
              onChange={handleChange}
              className="shadow appearance-none border border-stone-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-stone-300 focus:border-stone-950"
            />
            <p className="text-xs text-gray-500 mt-1">For multiple URLs, use commas to separate them.</p>
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700 font-bold mb-2">
              Short Summary or Tagline about your company/Product
            </label>
            <textarea
              id="description"
              name="description"
              value={productData.description}
              onChange={handleChange}
              className="shadow appearance-none border border-stone-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-stone-300 focus:border-stone-950"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="contactNumber" className="block text-gray-700 font-bold mb-2">
              Contact Number
            </label>
            <input
              type="text"
              id="contactNumber"
              name="contactNumber"
              value={productData.contactNumber}
              onChange={handleChange}
              className="shadow appearance-none border  border-stone-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-stone-300 focus:border-stone-950"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="aboutCompany" className="block text-gray-700 font-bold mb-2">
              About Company/Product (Brief Description)
            </label>
            <textarea
              id="aboutCompany"
              name="aboutCompany"
              value={productData.aboutCompany}
              onChange={handleChange}
              className="shadow appearance-none border border-stone-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-stone-300 focus:border-stone-950"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="companyCategory" className="block text-gray-700 font-bold mb-2">
              Company/Product Type
            </label>
            <select
              id="companyCategory"
              name="companyCategory"
              value={productData.companyCategory}
              onChange={handleChange}
              className="shadow appearance-none border border-stone-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-stone-300 focus:border-stone-950"
              required
            >
              <option value="">Select a category...</option>
              {categoryOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
          <input
            type="hidden"
            id="userEmail"
            name="userEmail"
            value={productData.userEmail}
            readOnly
          />
          <div className="mb-4">
            <label htmlFor="isConfirmed" className="inline-flex items-center">
              <input
                type="checkbox"
                id="isConfirmed"
                name="isConfirmed"
                checked={isConfirmed}
                onChange={handleCheckboxChange}
                className="form-checkbox h-4 w-4 text-stone-950 transition duration-150 ease-in-out"
              />
              <span className="ml-2 text-gray-700">I confirm that all information provided is correct and I have read it all.</span>
            </label>
          </div>
          <div className="mb-4">
            <button
              type="submit"
              className={`bg-stone-950 hover:bg-stone-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${!isConfirmed ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={!isConfirmed}
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
