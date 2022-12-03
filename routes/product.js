const express = require('express');
const router = express.Router();

const Jwt = require('../utils/Jwt');
const ProductController = require('../controllers/ProductController');

const { getProducts, getProduct } = require('../controllers/ProductController');

const productCtrl = new ProductController();//Apagar caso não use Classes (caso use codificação funcional).
const jwt = new Jwt();


//GET
//TODO: Ativar verifyToken após integração com front-end.
router.get("/", async (req, res) => {
    // let result = jwt.verifyToken(req.headers.authorization);
    // if(result.status === 200){
        result = await productCtrl.getProducts(req.query);
    // }
    res.statusCode = result.status;
    res.send(result.msg);});

    //TODO: Ativar verifyToken após integração com front-end.
router.get("/:id", async (req, res) => {
    // let result = jwt.verifyToken(req.headers.authorization);
    // if(result.status === 200){
        result = await productCtrl.getProduct(req.params.id);//Apagar "productCtrl." caso use a opção de importação no padrão de codificação funcional
    // }
    res.statusCode = result.status;
    res.send(result.msg);
});


//Cria um produto:
router.post("/", async (req, res) => {
    //TODO: Ativar token após integração com front-end
    // let result = jwt.verifyToken(req.headers.authorization);
    // if(result.status === 200){
        result = await productCtrl.createProduct(req.body);
    // }
    res.statusCode = result.status;
    res.send(result);
});

//Editar um produto:
//PUT - Atualizar, todos os campos, de um dado/registro, no DB
//Pode usar apenas o PATCH
// router.put("/:id", async (req, res) => { 
//     res.send('Ola mundo product!!');
// });

//Edita um Product - PATCH - Atualizar, informações parciais (ou todos os campos como o PUT), de um registro do DB
router.patch("/:id", async (req, res) => { //Chamou a rota...
    let result = jwt.verifyToken(req.headers.authorization);
    if(result.status === 200){
        result = await productCtrl.updateProduct(req.params.id, req.body);
    }
  
    res.statusCode = result.status;
    res.send(result.msg);
});

//Deleta um Product:
router.delete("/:id", async (req, res) => {
    let result = jwt.verifyToken(req.headers.authorization);
    if(result.status === 200){
        result = await productCtrl.deleteProduct(req.params.id);
    }
    res.statusCode = result.status;
    res.send(result.msg);
});


module.exports = router;