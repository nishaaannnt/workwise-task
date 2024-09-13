const express = require('express');
const productController = require('../controllers/product.controller');
const router = express.Router();
const { authMiddleware, verifySeller } = require('../middlewares/auth.middleware');

// Product CRUD for Sellers
router.post('/seller/add', authMiddleware, verifySeller, productController.addProduct);
router.put('/seller/update/:id', authMiddleware, verifySeller, productController.updateProduct); 
router.delete('/seller/delete/:id', authMiddleware, verifySeller, productController.deleteProduct); 

// Product Search for Buyers
router.get('/getProducts', productController.getProducts);
router.get('/search', productController.searchProducts);

module.exports = router;
