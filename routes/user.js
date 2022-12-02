const express = require('express');
const router = express.Router();
const User = require('../controllers/UserController');
const Jwt = require('../utils/Jwt');

const userCtrl = new User();
const jwt = new Jwt();

//GET
router.get("/", async (req, res) => {
    let result = jwt.verifyToken(req.headers.authorization);
    if(result.status === 200){
        result = await userCtrl.getUsers(req.query);
    };

    res.statusCode = result.status;
    res.send(result.result);})

router.get("/:id", async (req, res) => {
    let result = jwt.verifyToken(req.headers.authorization);
    if(result.status === 200){
        result = await userCtrl.getUser(req.params.id);
    }
    res.statusCode = result.status;
    res.send(result.result);
})

//Cria um User:
router.post("/", async (req, res) => {
    let result = jwt.verifyToken(req.headers.authorization);
    if(result.status === 200){
        result = await userCtrl.createUser(req.body);//req.body será passado via JSON
    }
    res.statusCode = result.status;
    res.send(result.result);
});

//Edita um User - PATCH - Atualizar, informações parciais (ou todos os campos como o PUT), de um registro do DB
router.patch("/:id", async (req, res) => { 
    let result = jwt.verifyToken(req.headers.authorization);
    if(result.status === 200){
        result = await userCtrl.updateUser(req.params.id, req.body);
    }

    res.statusCode = result.status;
    res.send(result.result);
});

//Deleta um User:
router.delete("/:id", async (req, res) => {
    let result = jwt.verifyToken(req.headers.authorization);
    if(result.status === 200){
        result = await userCtrl.deleteUser(req.params.id);
    }
    res.statusCode = result.status;
    res.send(result.result);
});

module.exports = router;