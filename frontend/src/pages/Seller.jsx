import React, { useState, useEffect } from 'react';
import { getProducts, addProduct, updateProduct, deleteProduct } from '../service/services';

const Seller = () => {
  const [products, setProducts] = useState([]);
  const [productData, setProductData] = useState({
    name: '',
    category: '',
    description: '',
    price: '',
    discount: ''
  });
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const result = await getProducts();
      setProducts(result);
    };
    fetchProducts();
  }, []);

  const handleAddProduct = async () => {
    try {
      await addProduct(productData);
      setProductData({ name: '', category: '', description: '', price: '', discount: '' });
      const result = await getProducts();
      setProducts(result);
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const handleUpdateProduct = async (id) => {
    try {
      await updateProduct(id, productData);
      const result = await getProducts();
      setProducts(result);
      setEditModalVisible(false); // Close the modal
      setProductData({ name: '', category: '', description: '', price: '', discount: '' }); // Clear form data
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await deleteProduct(id);
      setProducts(products.filter(product => product.id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const openEditModal = (product) => {
    setSelectedProduct(product);
    setProductData({
      name: product.name,
      category: product.category,
      description: product.description,
      price: product.price,
      discount: product.discount
    });
    setEditModalVisible(true);
  };

  const closeEditModal = () => {
    setEditModalVisible(false);
    setProductData({ name: '', category: '', description: '', price: '', discount: '' });
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Seller Product Management</h1>

      <div className="bg-white p-6 mb-6 shadow rounded">
        <h2 className="text-xl font-bold mb-4">Add Product</h2>
        <input
          type="text"
          placeholder="Name"
          className="w-full mb-4 p-2 border rounded"
          value={productData.name}
          onChange={(e) => setProductData({ ...productData, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Category"
          className="w-full mb-4 p-2 border rounded"
          value={productData.category}
          onChange={(e) => setProductData({ ...productData, category: e.target.value })}
        />
        <textarea
          placeholder="Description"
          className="w-full mb-4 p-2 border rounded"
          value={productData.description}
          onChange={(e) => setProductData({ ...productData, description: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price"
          className="w-full mb-4 p-2 border rounded"
          value={productData.price}
          onChange={(e) => setProductData({ ...productData, price: e.target.value })}
        />
        <input
          type="number"
          placeholder="Discount"
          className="w-full mb-4 p-2 border rounded"
          value={productData.discount}
          onChange={(e) => setProductData({ ...productData, discount: e.target.value })}
        />
        <button
          onClick={handleAddProduct}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Add Product
        </button>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {products.map(product => (
          <div key={product.id} className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p>{product.description}</p>
            <p className="text-gray-600">${product.price}</p>
            <p className="text-gray-600">Discount: {product.discount || 0}</p>
            <div className='flex gap-4'>
              <button
                onClick={() => openEditModal(product)}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteProduct(product.id)}
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Product Modal */}
      {editModalVisible && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Edit Product</h2>
            <input
              type="text"
              placeholder="Name"
              className="w-full mb-4 p-2 border rounded"
              value={productData.name}
              onChange={(e) => setProductData({ ...productData, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Category"
              className="w-full mb-4 p-2 border rounded"
              value={productData.category}
              onChange={(e) => setProductData({ ...productData, category: e.target.value })}
            />
            <textarea
              placeholder="Description"
              className="w-full mb-4 p-2 border rounded"
              value={productData.description}
              onChange={(e) => setProductData({ ...productData, description: e.target.value })}
            />
            <input
              type="number"
              placeholder="Price"
              className="w-full mb-4 p-2 border rounded"
              value={productData.price}
              onChange={(e) => setProductData({ ...productData, price: e.target.value })}
            />
            <input
              type="number"
              placeholder="Discount"
              className="w-full mb-4 p-2 border rounded"
              value={productData.discount}
              onChange={(e) => setProductData({ ...productData, discount: e.target.value })}
            />
            <div className="flex gap-4">
              <button
                onClick={() => handleUpdateProduct(selectedProduct.id)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Update Product
              </button>
              <button
                onClick={closeEditModal}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Seller;
