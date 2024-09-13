const Cart  = require('../model/cart.model'); 
const Product = require('../model/product.model'); 

// Add product to cart (Buyer only)
async function addToCart (req, res, next) {
  try {
    const { productId } = req.body;
    const buyerId = req.user.id; 

    const product = await Product.findOne({ where: { id: productId } });
    if (!product) {
      return res.status(401).json({message:"Product not found"});
    }
    const cartItem = await Cart.create({
      buyerId,
      productId,
    });

    res.status(201).json({ message: 'Product added to cart', data: cartItem });
  } catch (err) {
    next(err);
  }
};

// Remove product from cart (Buyer only)
async function removeFromCart (req, res, next) {
  try {
    const { id } = req.params;
    const buyerId = req.user.id;

    const cartItem = await Cart.findOne({ where: { id, buyerId } });
    if (!cartItem) {
      return res.status(401).json({message:"Item not found in cart"});
    }
    await cartItem.destroy();

    res.status(200).json({ message: 'Product removed from cart' });
  } catch (err) {
    next(err);
  }
};

// Get buyer's cart
async function getCart (req, res, next) {
  try {
    const buyerId = req.user.id;

    const cartItems = await Cart.findAll({
      where: { buyerId },
      include: [{ model: Product, as: 'product' }]
    });

    res.status(200).json({ cart: cartItems });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  addToCart: addToCart,
  removeFromCart: removeFromCart,
  getCart: getCart
};
