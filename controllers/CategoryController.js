const Category = require("../models/Category");
const { Sequelize } = require("sequelize");
const GenericController = require('./GenericController');
const Op = Sequelize.Op;

class CategoryController extends GenericController{//to create a class that is a child of another class.
  constructor(){ //invoke a superclass's constructor.
    super();
  }

  async getCategories(params) {
        //Também pode usar desestruturação: getCategories({ page, limit })
    let result;

    const pagination = this.generatePagination(params),
          limit = pagination[0],
          page = pagination[1];
    
    //Page limit: criando os parametros do limit.
    const paramsLimit = {
      offset: page * limit,
      limit: parseInt(limit), 
    };

    if(params.q){
      result = await Category.findAll({
        where: {
          name: {
            [Op.like]: `%${params.q}%`, 
            //Buscar por nome, passando o parametro 'q' no request. Para buscas com '?q'. Exemplo: localhost:3001/product?q=vEstido
            //Tiago Silva recomendou usar `%${params.q.toLowerCase()}%`,  mas não gostei do resultado na busca.
            //Caso coloque % só no final, busca do inicio em diante, se colocar r vai retornar todos os resultados que iniciam com r.
          },
        },
        ...paramsLimit,
      });
    }else{
      result = await Category.findAll(paramsLimit);
    }
    return result;
  }

  async getCategory(id) {
    const result = await Category.findByPk(id);
    return result;
}

  async createCategory(data) {
    return `Criada nova categoria`;
}

  async updateCategory(id, data){
    return `Atualizando a categoria ${id}`;

  }

  async deleteCategory(id){
    return `Deletando a categoria ${id}`;
  }


}

module.exports = CategoryController;