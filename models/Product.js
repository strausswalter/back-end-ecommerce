//https://sequelize.org/docs/v6/core-concepts/model-basics/
const { Sequelize, DataTypes } = require('sequelize');
const db = require('../db.js');

const Product = db.define("product", {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    description:{
        type: DataTypes.STRING,
        allowNull: true
    },
    images:{
        type: DataTypes.STRING,
        allowNull: true
    },
    price:{
        type: DataTypes.FLOAT,
        allowNull: false
    },

});

module.exports = Product;