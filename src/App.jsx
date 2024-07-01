
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
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import PrivateRoute from './components/PrivateRoute';

const App = () => {
  return (
    <>
      <Router>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<ErrorPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<Forgot />} />
          <Route path="/reset_password/:id/:token" element={<ResetPassword />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/admin-dashboard">
            <Route path="home" element={<PrivateRoute element={<AdminHome />} />} />
            <Route path="allUser" element={<PrivateRoute element={<AllUser />} />} />
            <Route path="product-control" element={<PrivateRoute element={<ProductControl />} />} />
            <Route path="profile" element={<PrivateRoute element={<AdminProfile />} />} />
          </Route>
          <Route path="/user-dashboard">
            <Route path="home" element={<PrivateRoute element={<UserHome />} />} />
            <Route path="addProduct" element={<PrivateRoute element={<AddProduct />} />} />
            <Route path="product-status" element={<PrivateRoute element={<ProductsStatus />} />} />
            <Route path="product-review" element={<PrivateRoute element={<ProductsReviews />} />} />
            <Route path="profile" element={<PrivateRoute element={<UserProfile />} />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
};

export default App;
