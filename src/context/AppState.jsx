import React, { useEffect, useState } from "react";
import AppContext from "./AppContext";
import axios from "axios";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AppState = (props) => {
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState();
  const [reload, setReload] = useState(false);
  const [products, setProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [starCounts, setStarCounts] = useState({});
  
  // const url = "http://localhost:1000/api";
  const url="https://opinio-buzz-backend.onrender.com/api";
useEffect(() => {
    const lstoken = localStorage.getItem("token");
    if (lstoken) {
      setToken(lstoken);
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (token) {
      userProfile();
  
    }
  }, [token, reload]);
//fetch all products
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${url}/product/allProducts`);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    fetchData();
  }, []);

  const register = async (name, email, password, companyName, phoneNumber, location, companyWebsite = '', role = 'business user') => {
    try {
      const api = await axios.post(
        `${url}/user/register`,
        { name, email, password, companyName, phoneNumber, location, companyWebsite, role },
        {
          headers: {
            "Content-Type": "Application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(api.data.message, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });

      return api.data;
    } catch (error) {
      toast.error("Registration failed", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
      console.error("Error registering user:", error);
    }
  };

 

  // logout user
  const login = async (email, password) => {
    try {
      const response = await axios.post(
        `${url}/user/login`,
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
  
      const { data } = response;
  
      // Assuming the server response includes the role
      const { token, role } = data;
      setToken(token);
      setIsAuthenticated(true);
      localStorage.setItem("token", token);
  
      toast.success(response.data.message, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
  
      return { success: true, role }; 
    } catch (error) {
    
      toast.error("Login Failed. Please try again.", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
  
      return { success: false }; // Return failure if login fails
    }
  };
  
  const logout = () => {
    setIsAuthenticated(false);
    setToken(" ");
    localStorage.removeItem("token");
  
  
  };

  // const userProfile = async () => {
  //   const api = await axios.get(`${url}/user/profile`, {
  //     headers: {
  //       "Content-Type": "Application/json",
  //       Auth: token,
  //     },
  //     withCredentials: true,
  //   });
  //   // console.log("user profile ", api.data);
  //   setUser(api.data.user);
  // };
// Assuming 'token' is defined somewhere in your component or context
const userProfile = async () => {
  try {
    const response = await axios.get(`${url}/user/profile`, {
      headers: {
        Authorization: `Bearer ${token}`, // Correctly formatted Authorization header
      },
    });
    // console.log('User profile:', response.data);
    setUser(response.data.user); // Assuming response.data.user contains the user object
  } catch (error) {
    // console.error('Error fetching user profile:', error);
    // Handle error, e.g., show error message to user
  }
};




useEffect(() => {
  const fetchUserData = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response = await axios.get(`${url}/user/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data.user);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }
  };
  fetchUserData();
}, [reload]);

const updateProfile = async (name, companyName, phoneNumber, location, companyWebsite) => {
  const token = localStorage.getItem('token');
  if (!token) {
    toast.error("No authentication token found", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
    return;
  }

  try {
    const api = await axios.put(
      `${url}/user/profile`,
      { name, companyName, phoneNumber, location, companyWebsite },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );


    setUser(api.data.user);
    setReload(!reload);
    return api.data;
  } catch (error) {
   
    console.error("Error updating profile:", error);
  }
};
  

const addProduct = async (productData) => {
  const token = localStorage.getItem('token');  

  if (!token) {
   
    console.error('No authentication token found');
    return; 
  }

  try {
    const api = await axios.post(
      `${url}/product/add`,
      productData,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, 
        },
        withCredentials: true,
      }
    );

    toast.success('Product added successfully and sent a email to Opinio Buzz!', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
      transition: Bounce,
    });

   

    return api.data; 
  } catch (error) {
    toast.error('Product addition failed', {
      position: 'top-right',
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
      transition: Bounce,
    });

    console.error('Error adding product:', error);
    throw error; 
  }
};
    
    const fetchProductById = async (url, id) => {
      try {
        const response = await axios.get(`${url}/product/${id}`, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
  

        setProducts(response.data.product);
        
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    
    const fetchReviews = async (id) => {
      try {
        const response = await axios.get(`${url}/product/${id}/reviews`);
        const fetchedReviews = response.data;
    
        // Calculate star counts and total ratings
        const counts = { count1Star: 0, count2Star: 0, count3Star: 0, count4Star: 0, count5Star: 0, totalRatings: 0 };
        fetchedReviews.forEach(review => {
          counts[`count${review.ratingCount}Star`] += 1;
          counts.totalRatings += 1;
        });
    
        setReviews(fetchedReviews);
        setStarCounts(counts);
        return counts;
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };
    
    
  return (
    <AppContext.Provider
      value={{
        token,
        url,
        isAuthenticated,
        setIsAuthenticated,
        register,
        login,
        logout,
        user,
        updateProfile,
        addProduct,
        products, setProducts,
        reviews, fetchReviews,
        fetchProductById,
        starCounts,
        reload, setReload,
        
      }}
    >
      {props.children}
      <ToastContainer />
    </AppContext.Provider>
  );
};

export default AppState;
