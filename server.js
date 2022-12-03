const express = require('express');
const cors = require('cors');

require("dotenv").config();//Para usar variaveis de ambiente do arquivo .env
const app = express();
// const port = 3001;  Usando variaveis de ambiente no lugar (arquivo .env)
const db = require('./db.js');

//Rotas - carregar modulos de rotas:
const user = require('./routes/user');
const auth = require('./routes/auth');
const product = require('./routes/product');
const category = require('./routes/category');
// const session = require('express-session');
// const passport = require('passport');

//Rotas - montar a função middleware no caminho especificado:
app.use(express.json());  
app.use(cors());
// app.use(session({ //iniciando o express-session
//     secret: '5f77c00dc1387f36ebf52264de3eedc3281c57a8978455e54',
//     resave: false,
//     saveUninitialized: false,
//     cookie:{ 
//         secure: true,
//         maxAge: 1000 * 60 * 30 //Cookies expiram em 30 minutos (1s * 60 (1 minuto) * 30min)
//     }
// }))
// app.use(passport.initialize());
// app.use(passport.session());

app.use('/user', user);
app.use('/auth', auth);
app.use('/product', product);
app.use('/category', category);

// passport.use("register", new localStrategy({
//         usernameField: "username",
//         passwordField: "password",
//         passReqToCallback: true
//     }, async function( req, email, password, done ){
//         authCtrl.register(req.body, email, password, done);
//         res.send("Usuário criado com sucesso.");
//     }))

db.sync();
app.listen(process.env.PORT, function(){
    console.log("Aplicativo Rodando!!");
});

//Rodar no terminal com: node run watch