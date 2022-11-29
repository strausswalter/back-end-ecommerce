const express = require('express');
const router = express.Router();
const User = require('../controllers/UserController');

const userCtrl = new User();

router.get("/", async (req, res) => {
    res.send(userCtrl.getUsers());
});

//Cria um usuario:
// router.get("/", async (req, res) => {
//     res.send(userCtrl.getUsers());
// });

//Edita um usuário:
// router.get("/:id", async (req, res) => {
//     res.send(userCtrl.getUser(req.params.id));
// })

//Deleta um usuário:
// router.get("/:id", async (req, res) => {
//     res.send(userCtrl.getUser(req.params.id));
// })

//Lista um usuário
router.get("/:id", async (req, res) => {
    res.send(userCtrl.getUser(req.params.id));
})

module.exports = router;