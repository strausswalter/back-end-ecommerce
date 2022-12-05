const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');
const UserController = require('../controllers/UserController');

const authCtrl = new AuthController();
const userCtrl = new UserController();

router.post("/valida-token", async (req, res) => {
    const result = await authCtrl.validaToken(req.body.email);
    
    res.statusCode = result.status;
    res.send(result.result);
});




//Recovery password - Solicitação de reset de senha e envio email
router.post("/recovery", async (req, res) => {
    const result = await authCtrl.recoveryPassword(req.body.email);
    res.statusCode = result.status;
    res.send(result.result);
});

// Recovery password - Usuário enviará token recebido por email
router.post("/confirm-recovery", async (req, res) => {
    const result = await authCtrl.updatePassword(req.body.token, req.body.newPassword);
    res.statusCode = result.status;
    res.send(result.result);
});

//Login: localhost:3001/auth/login
router.post("/login", async (req, res) => {
    // console.log(req.body);
    const result = await authCtrl.login(req.body.userEmail, req.body.password);
    res.statusCode = result.status;
    res.send(result.result);
});

router.post("/register", async (req, res) => {
    const result = await userCtrl.createUser(req.body);
    res.statusCode = result.status;
    res.send(result);

})

router.post("/valida-email", async (req, res) => {
    const result = await authCtrl.validateEmail(req.body.token);
    res.statusCode = result.status;
    res.send(result.result);

});



module.exports = router;