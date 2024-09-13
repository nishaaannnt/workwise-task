const express = require('express');
const cartController = require('../controllers/cart.controller');
const router = express.Router();
const { authMiddleware } = require('../middlewares/auth.middleware');

router.post('/buyer/add', authMiddleware, cartController.addToCart);
router.delete('/buyer/remove/:id', authMiddleware, cartController.removeFromCart);
router.get('/buyer/get', authMiddleware, cartController.getCart);

module.exports = router;
