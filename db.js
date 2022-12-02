//https://sequelize.org/docs/v6/getting-started/
const Sequelize = require('sequelize');
require("dotenv").config();

// console.log("Nome do Banco: " + process.env.DB_NAME);

const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbHost = process.env.DB_HOST;

//Conexão Sequelize ao banco de dados:
const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
    host: dbHost,
    dialect: 'mysql', /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
});

//Opção de conexão a banco sqlite (arquivo de dados que simula um DB):
// const sequelize = new Sequelize({
//     dialect: 'sqlite',
//     storage: './database.sqlite'
//   });
//npm install --save sqlite3


module.exports = sequelize;

