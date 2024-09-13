const Product = require('../model/product.model');
const { Op } = require('sequelize');

async function addProduct(req, res, next) {
  try {
    const { name, category, description, price, discount } = req.body;
    const sellerId = req.user.id;

    const doublePrice = parseFloat(price);
    const doubleDiscount = parseFloat(discount);

    if (isNaN(doublePrice) || doublePrice < 0) {
      return res.status(400).json({ error: 'Invalid price value' });
    }

    const newProduct = await Product.create({
      name,
      category,
      description,
      price: doublePrice,
      discount: doubleDiscount,
      sellerId
    });
    res.status(201).json({ message: 'Product added successfully', data: newProduct });
  } catch (err) {
    next(err);
  }
}


// Update an existing product (Seller only)
async function updateProduct (req, res, next) {
  try {
    const { id } = req.params;
    const { name, category, description, price, discount } = req.body;
    const sellerId = req.user.id;

    const product = await Product.findOne({ where: { id, sellerId } });

    if (!product) {
      return res.status(404).json({message:'Product not found'});
    }

    product.name = name || product.name;
    product.category = category || product.category;
    product.description = description || product.description;
    product.price = price || product.price;
    product.discount = discount || product.discount;

    await product.save();

    res.status(200).json({ message: 'Product updated successfully', data: product });
  } catch (err) {
    next(err); 
  }
};

// Delete a product (Seller only)
async function deleteProduct (req, res, next) {
  try {
    const { id } = req.params;
    const sellerId = req.user.id;

    const product = await Product.findOne({ where: { id, sellerId } });

    if (!product) {
      throw new ErrorHandler(404, 'Product not found');
    }

    await product.destroy();

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (err) {
    next(err); 
  }
};

// Get products (Buyers)
async function getProducts (req, res, next) {
  try {
    // Find products based on filters (simple)
    const products = await Product.findAll();

    res.status(200).json(products);
  } catch (err) {
    next(err); 
  }
};

async function searchProducts (req, res, next) {
  try {
    // here i am adding all these but in frontend only name is used for search
    const { name, category, minPrice, maxPrice, minDiscount, maxDiscount } = req.query;

    const filters = {};
    // could have made a util for these below lines but i guess keeping it like this also works
    if (name) {
      filters.name = { [Op.iLike]: `%${name}%` }; // Case- insessitive search for product name
    }
    if (category) {
      filters.category = category; 
    }
    if (minPrice || maxPrice) {
      filters.price = {
        ...(minPrice && { [Op.gte]: minPrice }),
        ...(maxPrice && { [Op.lte]: maxPrice }), 
      };
    }
    if (minDiscount || maxDiscount) {
      filters.discount = {
        ...(minDiscount && { [Op.gte]: minDiscount }),
        ...(maxDiscount && { [Op.lte]: maxDiscount }), 
      };
    }
    // Fetch products based on the filters
    const products = await Product.findAll({ where: filters });

    if (products.length === 0) {
      return res.status(200).json({ message: 'No products found' });
    }

    res.status(200).json(products);
  } catch (err) {
    next(err);
  }
}



module.exports = {
  addProduct: addProduct,
  updateProduct: updateProduct,
  deleteProduct: deleteProduct,
  getProducts: getProducts,
  searchProducts: searchProducts
}