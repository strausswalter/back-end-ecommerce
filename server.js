const express = require('express');
// const path = require('path');
require("dotenv").config();//Para usar variaveis de ambiente do arquivo .env
const app = express();
// const port = 3001;  Usando variaveis de ambiente no lugar (arquivo .env)
const db = require('./db.js');

//Rotas - carregar modulos de rotas:
const user = require('./routes/user');
const auth = require('./routes/auth');
const product = require('./routes/product');
const category = require('./routes/category');

//Rotas - montar a função middleware no caminho especificado:
app.use(express.json());
app.use('/user', user);
app.use('/auth', auth);
app.use('/product', product);
app.use('/category', category);

db.sync();
app.listen(process.env.PORT, function(){
    console.log("Aplicativo Rodando!!");
});

//Rodar no terminal com: node run watch