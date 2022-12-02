const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/CategoryController');
const Jwt = require('../utils/Jwt');

const categoryCtrl = new CategoryController();
const jwt = new Jwt();

//GET
router.get("/", async (req, res) => {
    let result = jwt.verifyToken(req.headers.authorization);
    if(result.status === 200){
        result = await categoryCtrl.getCategories(req.query);//Passar req.query (parametros após '?' para no CategoryController poder receber para fazer buscas personalizadas.
    }
    res.statusCode = result.status;
    res.send(result.msg);})

router.get("/:id", async (req, res) => {
    let result = jwt.verifyToken(req.headers.authorization);
    if(result.status === 200){
        result = await categoryCtrl.getCategory(req.params.id);
    }
    res.statusCode = result.status;
    res.send(result.msg);
})

//Cria um category:
router.post("/", async (req, res) => {
    let result = jwt.verifyToken(req.headers.authorization);
    if(result.status === 200){
        result = await categoryCtrl.createCategory(req.body);//req.body será passado via JSON
    }
    res.statusCode = result.status;
    res.send(result.msg);
});

//Edita um category: PUT - Atualizar, todos os campos, de um dado/registro, do DB
//Pode usar apenas o PATCH
// router.put("/:id", async (req, res) => {
//     categoryCtrl.updateCategory(req.params.id, {});
//     res.send('Dados alterados com sucesso');
// });

//Edita um category - PATCH - Atualizar, informações parciais (ou todos os campos como o PUT), de um registro do DB
router.patch("/:id", async (req, res) => { //Chamou a rota...
    let result = jwt.verifyToken(req.headers.authorization);
    if(result.status === 200){
        result = await categoryCtrl.updateCategory(req.params.id, req.body);
    }
    res.statusCode = result.status;
    res.send(result.msg);
});

//Deleta um category:
router.delete("/:id", async (req, res) => {
    let result = jwt.verifyToken(req.headers.authorization);
    if(result.status === 200){
        result = await categoryCtrl.deleteCategory(req.params.id);
    }
    res.statusCode = result.status;
    res.send(result.msg); //Passa como mensagem ao usuário, a saída da função deleteCategory ( return `Deletando a categoria ${id}`; ).
});

module.exports = router;