import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import Signup from '../pages/Signup';      
import Products from '../pages/Products';  
import Cart from '../pages/Cart';          
import Seller from '../pages/Seller';      
import Navbar from '../components/Navbar';

// Custom route to protect routes
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

// Custom route for seller-only pages
const SellerRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(atob(token.split('.')[1])); // Decode the JWT payload to get user role

  return token && user.role === 'seller' ? children : <Navigate to="/login" />;
};

const AppRouter = () => (
  
  <Router>
    <Navbar />
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup/>} />

      {/* Protected Routes (Buyers and Sellers) */}
      <Route path="/products" element={<PrivateRoute><Products /></PrivateRoute>} />
      <Route path="/cart" element={<PrivateRoute><Cart /></PrivateRoute>} />

      {/* Protected Seller Routes */}
      <Route path="/seller" element={<SellerRoute><Seller /></SellerRoute>} />

      {/* Redirect any unknown route to login */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  </Router>
);

export default AppRouter;
