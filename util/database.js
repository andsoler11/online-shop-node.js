const Sequelize = require('sequelize');

const sequelize = new Sequelize('shoppingappnode', 'root', '', {
    dialect: 'mysql', 
    host: 'localhost'
});

module.exports = sequelize;