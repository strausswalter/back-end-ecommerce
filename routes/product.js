const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController');

//Opção de importação de cada função do módulo ProductController:
const { getProducts, getProduct } = require('../controllers/ProductController');

const productCtrl = new ProductController();//Apagar caso não use Classes (caso use codificação funcional).

//	GET - Recupera dados do servidor
router.get("/", async (req, res) => {
    //Apagar "productCtrl." caso use a opção de importação no padrão de codificação funcional
    //req.query: passar parametros da busca GET (como page e limit)
    const result = await productCtrl.getProducts(req.query);
    res.send(result);
});

router.get("/:id", async (req, res) => {
    const result = await productCtrl.getProduct(req.params.id);//Apagar "productCtrl." caso use a opção de importação no padrão de codificação funcional
    res.send(result);
});


//Cria um produto:
router.post("/", async (req, res) => {
    const result = await productCtrl.createProduct({});
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

    //Dispara a função com await para aguardar a atualização do banco de dados, para depois informar (res.send)
    //São passados para a função, o req.params.id, e passar o que setá sendo chamado no corpo da requisição
    const result = await productCtrl.updateProduct(req.params.id, {});

    //res.send --> resposta ao solicitante da requisição
    // res.send('Dados alterados com sucesso');
    res.send(result); //Passa como mensagem ao usuário, a saída da função updateProduct (     return `Atualizando a categoria ${id}`;).

});

//Deleta um Product:
router.delete("/:id", async (req, res) => {
    const result = await productCtrl.deleteProduct(req.params.id);
    res.send(result); //Passa como mensagem ao usuário, a saída da função deleteProduct ( return `Deletando a categoria ${id}`; ).
});


module.exports = router;