
// import React from "react";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Login from "./components/auth/Login";
// import Register from "./components/auth/Register";
// import Forgot from "./components/auth/Forgot";
// import ResetPassword from "./components/auth/ResetPassword";
// import HomePage from './components/product/Home';
// import ProductDetails from './components/product/ProductDetail';
// import About from './components/product/About';

// import AdminHome from './components/dashboards/AdminDashboard/Home/Home';
// import UserHome from './components/dashboards/UserDashboard/Home/Home';
// import AddProduct from './components/dashboards/UserDashboard/AddProduct';
// import ProductsStatus from './components/dashboards/UserDashboard/ProductsStatus';
// import ProductsReviews from './components/dashboards/UserDashboard/ProductsReviews';
// import UserProfile from './components/dashboards/UserDashboard/Profile';
// import AllUser from './components/dashboards/AdminDashboard/AllUser';
// import ProductControl from './components/dashboards/AdminDashboard/ProductControl';
// import AdminProfile from './components/dashboards/AdminDashboard/Profile';
// import ErrorPage from "./components/Error/ErrorPage";

// const App = () => {
//   return (
//     <>
//       <Router>
//         <ToastContainer />
//         <Routes>
//           <Route path="/" element={<HomePage />} />
          
//           <Route path="*" element={<ErrorPage />} />

//           <Route path="/about" element={<About />} />

//           <Route path="/register" element={<Register />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/forgot-password" element={<Forgot />} />
//           <Route path="/reset_password/:id/:token" element={<ResetPassword />} />
//           <Route path="/product/:id" element={<ProductDetails />} />
//           <Route path="/admin-dashboard">
//             <Route path="home" element={<AdminHome />} />
//             <Route path="allUser" element={<AllUser />} />
//             <Route path="product-control" element={<ProductControl />} />
//             <Route path="profile" element={<AdminProfile />} />
//           </Route>
//           <Route path="/user-dashboard">
//             <Route path="home" element={<UserHome />} />
//             <Route path="addProduct" element={<AddProduct />} />
//             <Route path="product-status" element={<ProductsStatus />} />
//             <Route path="product-review" element={<ProductsReviews />} />
//             <Route path="profile" element={<UserProfile />} />
//           </Route>
//         </Routes>
//       </Router>
//     </>
//   );
// };

// export default App;
import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Forgot from "./components/auth/Forgot";
import ResetPassword from "./components/auth/ResetPassword";
import HomePage from './components/product/Home';
import ProductDetails from './components/product/ProductDetail';
import About from './components/product/About';

import AdminHome from './components/dashboards/AdminDashboard/Home/Home';
import UserHome from './components/dashboards/UserDashboard/Home/Home';
import AddProduct from './components/dashboards/UserDashboard/AddProduct';
import ProductsStatus from './components/dashboards/UserDashboard/ProductsStatus';
import ProductsReviews from './components/dashboards/UserDashboard/ProductsReviews';
import UserProfile from './components/dashboards/UserDashboard/Profile';
import AllUser from './components/dashboards/AdminDashboard/AllUser';
import ProductControl from './components/dashboards/AdminDashboard/ProductControl';
import AdminProfile from './components/dashboards/AdminDashboard/Profile';
import ErrorPage from "./components/Error/ErrorPage";

const App = () => {
 
  const isAuthenticated = () => {
    const role = localStorage.getItem("role");
    
    return role === "admin" || role === "businessuser"; 
  };

 
  const PrivateRoute = ({ element, path }) => {
    return isAuthenticated() ? element : <Navigate to="/login" />;
  };

  return (
    <>
      <Router>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<Forgot />} />
          <Route path="/reset_password/:id/:token" element={<ResetPassword />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          
          {/* Admin Dashboard Routes */}
          <Route path="/admin-dashboard/*" element={<PrivateRoute path="/admin-dashboard" element={<AdminHome />} />} />
          <Route path="/admin-dashboard/allUser" element={<PrivateRoute path="/admin-dashboard/allUser" element={<AllUser />} />} />
          <Route path="/admin-dashboard/product-control" element={<PrivateRoute path="/admin-dashboard/product-control" element={<ProductControl />} />} />
          <Route path="/admin-dashboard/profile" element={<PrivateRoute path="/admin-dashboard/profile" element={<AdminProfile />} />} />
          
          {/* User Dashboard Routes */}
          <Route path="/user-dashboard/*" element={<PrivateRoute path="/user-dashboard" element={<UserHome />} />} />
          <Route path="/user-dashboard/addProduct" element={<PrivateRoute path="/user-dashboard/addProduct" element={<AddProduct />} />} />
          <Route path="/user-dashboard/product-status" element={<PrivateRoute path="/user-dashboard/product-status" element={<ProductsStatus />} />} />
          <Route path="/user-dashboard/product-review" element={<PrivateRoute path="/user-dashboard/product-review" element={<ProductsReviews />} />} />
          <Route path="/user-dashboard/profile" element={<PrivateRoute path="/user-dashboard/profile" element={<UserProfile />} />} />

          
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
