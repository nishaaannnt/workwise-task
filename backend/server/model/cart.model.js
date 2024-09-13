const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db')
const User = require('./users.model');
const Product = require('./product.model');

const Cart = sequelize.define('Cart', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  buyerId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
  productId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Product,
      key: 'id',
    },
  },
}, {
  timestamps: true,
});

Cart.belongsTo(User, { as: 'buyer', foreignKey: 'buyerId' });
Cart.belongsTo(Product, { as: 'product', foreignKey: 'productId' }); 

module.exports = Cart;
