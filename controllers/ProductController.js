const Product = require("../models/Product");
const { Sequelize } = require("sequelize");
const GenericController = require('./GenericController');
const Op = Sequelize.Op;

class ProductController extends GenericController{
  constructor(){ //invoke a superclass's constructor.
    super();
  }

  async getProducts(params) {
    try{
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

    const order = this.generateOrder(params);


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
        ...order

      });
    }else{
      result = await Product.findAll({
        ...paramsLimit,
        ...order
      });

    }
    return {
      status: 200,
      msg: result,//TODO: Mudar msg para data ??
    };
    }catch (err) {
      return {
        status: 500,
        msg: "Ocorreu um erro. Favor procurar o administrador do sistema.",
      };
    }
  }

  async getProduct(id) {
    try{
    const result = await Product.findByPk(id);
      return {
        status: 200,
        msg: result,
      };
      }catch (err) {
    return {
      status: 500,
      msg: "Ocorreu um erro. Favor procurar o administrador do sistema.",
    };
  }
}

async createProduct(data) {
  try{
    const product = await Product.create(data);
  return {
    status: 200,
    msg: `Produto, número ${product.id}, criado com sucesso!`,
  }
}catch (err) {
  return {
    status: 500,
    msg: "Um erro genérico ocorreu, contato o administrador do sistema",
  };
}
}

async updateProduct(id, data){
  try
  {await Product.update(data, {
    where: {
      id: id,
    },
  });
  return {
    status: 200,
    msg: `Produto ${id} atualizado com sucesso`,
  };
  
}catch (err) {
  return {
    status: 500,
    msg: "Um erro genérico ocorreu, contato o administrador do sistema",
  };
}
  //No insomnia não passar id no json. Passar id na URL.
}

async deleteProduct(id){
  try
  {await Product.destroy({
    where: {
      id: id
    },
  });
  return{
    status: 200,
    msg:  `Produto ${id} deletado com sucesso!`,
  };
}catch(err){
  return {
    status: 500,
    msg: "Um erro genérico ocorreu, contato o administrador do sistema",
    // msg: "Um erro genérico ocorreu, contato o administrador do sistema" + erro.toString(),

  };
}
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

   
  // }
}

module.exports = ProductController;
