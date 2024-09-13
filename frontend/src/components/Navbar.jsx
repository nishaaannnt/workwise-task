import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { setAuthToken } from '../service/services'; // Import setAuthToken function

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setAuthToken(null);
    navigate('/login');
  };

  return (
    <nav className="bg-blue-500 p-4 flex justify-between items-center">
      <div className="text-white text-2xl">
        <Link to="/" className="font-bold">By Nishant Dixit for workwise</Link>
      </div>
      <div>
        <Link to="/products" className="text-white mr-4 hover:underline">Products</Link>
        <Link to="/cart" className="text-white mr-4 hover:underline">Cart</Link>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
