import React, { useState } from 'react';
import BuyerSignup from '../components/BuyerSignup';
import SellerSignup from '../components/SellerSignup';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [isSeller, setIsSeller] = useState(false);
  const navigate = useNavigate();

  const handleRoleChange = (role) => {
    setIsSeller(role === 'seller');
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isSeller ? 'Sign Up (Seller)' : 'Sign Up (Buyer)'}
        </h2>

        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={() => handleRoleChange('buyer')}
            className={`p-2 rounded ${!isSeller ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
          >
            Buyer
          </button>
          <button
            onClick={() => handleRoleChange('seller')}
            className={`p-2 rounded ${isSeller ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
          >
            Seller
          </button>
        </div>

        {/* Render Buyer or Seller signup form based on the role */}
        {isSeller ? <SellerSignup /> : <BuyerSignup />}
        <hr className='py-2 border'/>
        <p className='text-center cursor-pointer hover:text-red-900 py-2' onClick={()=>navigate('/login')}>Login here</p>
      </div>
    </div>
  );
};

export default Signup;
