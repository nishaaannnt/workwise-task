import React, { useState, useEffect } from 'react';
import { getProducts, addToCart, searchProduct } from '../service/services';

const Products = () => {
  const [products, setProducts] = useState([]);
  const fetchProducts = async () => {
    const result = await getProducts();
    setProducts(result);
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddToCart = async (productId) => {
    try {
      await addToCart(productId);
      alert('Product added to cart');
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };
  const handleSearchBar = async (e) => {
    try {
      let name = e.target.value;
      console.log(name);
      if(name == "") {
        fetchProducts();
        return
      }
      const result = await searchProduct(name);
      console.log(result);
      if(!Array.isArray(result) || result.length == 0) {
        setProducts([]);
        return;
      }
      setProducts(result)
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Products</h1>
      <div className='py-4 flex gap-2'>
      <label htmlFor="searchBar">Search Product Name</label>
      <input type="text" onChange={(e) => handleSearchBar(e)} placeholder='search your product' className='rounded-md p-1 border border-black' name='searchBar'/>
      </div>
      <div className="grid grid-cols-3 gap-6">
        {products.map(product => (
          <div key={product.id} className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p>{product.description}</p>
            <p className="text-gray-600">${product.price}</p>
            <button
              onClick={() => handleAddToCart(product.id)}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
