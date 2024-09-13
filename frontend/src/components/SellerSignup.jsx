import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signupSeller } from '../service/services';

const SellerSignup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      await signupSeller({ email, password, username, role: 'seller' });
      setError('');
      console.log("success")
      navigate('/login');
    } catch (err) {
        console.log(err);
      setError('Signup failed. Please check your details.');
    }
  };

  return (
    <>
      {error && <p className="text-red-500">{error}</p>}
      <input
        type="text"
        placeholder="Username"
        className="w-full mb-4 p-2 border rounded"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        className="w-full mb-4 p-2 border rounded"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full mb-6 p-2 border rounded"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        onClick={handleSignup}
        className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
      >
        Sign Up (Seller)
      </button>
    </>
  );
};

export default SellerSignup;
