const { DataTypes } = require('sequelize')
const { sequelize } = require('../config/db')
const User = require('./users.model');

const Product = sequelize.define('Product',{
    id:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    category:{
        type:DataTypes.STRING,
        allowNull: false,
    },
    description:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    price:{
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    discount:{
        type: DataTypes.FLOAT,
        defaultValue:0
    },
    sellerId: {
        type:DataTypes.UUID,
        allowNull:false,
        references:{
            model: User,
            key:'id'
        }
    }
    },{
        timestamps:true
    }
)

Product.belongsTo(User,{as:'seller',foreignKey:'sellerId'});

module.exports = Product;
