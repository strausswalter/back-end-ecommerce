const Product = require("../models/Product");
const { Sequelize } = require("sequelize");
const GenericController = require('./GenericController');
const Op = Sequelize.Op;


class ProductController extends GenericController{
  constructor(){ //invoke a superclass's constructor.
    super();
  }

  async getProducts(params) {
    //Também pode usar desestruturação: getProducts({ page, limit })
    let result;

    const pagination = this.generatePagination(params),
    limit = pagination[0],
    page = pagination[1];

    //Page limit: criando os parametros do limit.
    const paramsLimit = {
      offset: page * limit,
      limit: parseInt(limit), 
    };

  
    if(params.q){//Verifica se existe parametro 'q' no request
      result = await Product.findAll({
        where: {
          name: {
            [Op.like]: `%${params.q}%`, 
            //Para buscas com '?q'. Exemplo: localhost:3001/product?q=vEstido
            //Tiago Silva recomendou usar `%${params.q.toLowerCase()}%`,  mas não gostei do resultado na busca.
          },
        },
        ...paramsLimit,
      });
    }else{
      result = await Product.findAll(paramsLimit);
    }
    return result;
  }

  async getProduct(id) {
    const result = await Product.findByPk(id);
    return result;
}

async createProduct(data) {
  return `Criado novo produto`;
}

async updateProduct(id, data){
  return `Atualizando o produto ${id}`;

}

async deleteProduct(id){
  return `Deletando o produto ${id}`;
}












  //Buscar produto por id de lista json manual (sem banco de dados):
  // getProduct(id) {
  //   const result = PRODUCTS[id];
  //   if(result !== null && result !== undefined){
  //       return result;
  //   }
  //   return {
  //       msg: "Nenhum produto encontrado"
  //   }
  // }

    //TODO: Corrigir, não está funcionando.
  // filterProductByName(name) {
  //   let arrayProducts = [];
  //   let keys = Object.keys(PRODUCTS);
  //   for (const productId of keys) {
  //   }
  // }
}

module.exports = ProductController;
