const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/CategoryController');

const categoryCtrl = new CategoryController();

//GET
router.get("/", async (req, res) => {
    const result = await categoryCtrl.getCategories(req.query);//Passar req.query (parametros após '?' para no CategoryController poder receber para fazer buscas personalizadas.
    res.send(result);
})

router.get("/:id", async (req, res) => {
    const result = await categoryCtrl.getCategory(req.params.id);
    res.send(result);
})

//Cria um category:
router.post("/", async (req, res) => {
    const result = await categoryCtrl.createCategory(req.body);//req.body será passado via JSON
    res.send(result);
});

//Edita um category: PUT - Atualizar, todos os campos, de um dado/registro, do DB
//Pode usar apenas o PATCH
// router.put("/:id", async (req, res) => {
//     categoryCtrl.updateCategory(req.params.id, {});
//     res.send('Dados alterados com sucesso');
// });

//Edita um category - PATCH - Atualizar, informações parciais (ou todos os campos como o PUT), de um registro do DB
router.patch("/:id", async (req, res) => { //Chamou a rota...

    //Dispara a função com await para aguardar a atualização do banco de dados, para depois informar (res.send)
    //São passados para a função, o req.params.id, e passar o que setá sendo chamado no corpo da requisição
    const result = await categoryCtrl.updateCategory(req.params.id, req.body);

    //res.send --> resposta ao solicitante da requisição
    // res.send('Dados alterados com sucesso');
    res.send(result); //Passa como mensagem ao usuário, a saída da função updateCategory (     return `Atualizando a categoria ${id}`;).

});

//Deleta um category:
router.delete("/:id", async (req, res) => {
    const result = await categoryCtrl.deleteCategory(req.params.id);
    res.send(result); //Passa como mensagem ao usuário, a saída da função deleteCategory ( return `Deletando a categoria ${id}`; ).
});

module.exports = router;