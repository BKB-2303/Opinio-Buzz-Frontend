import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AppContext from '../context/AppContext'

const PrivateRoute = ({ element }) => {
  const { user } = useContext(AppContext);

  return user?.email ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
