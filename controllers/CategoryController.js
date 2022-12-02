const Category = require("../models/Category");
const { Sequelize } = require("sequelize");
const GenericController = require("./GenericController");
const Op = Sequelize.Op;

class CategoryController extends GenericController {
  //to create a class that is a child of another class.
  constructor() { //invoke a superclass's constructor.
    super();
  }

  async getCategories(params) {
    try {
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
      
      const order = this.generateOrder(params);


      if (params.q) {
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
          ...order
        });
      } else {
        result = await Category.findAll({
          ...paramsLimit,
          ...order
        });
      }
      return {
        status: 200,
        msg: result,
      };
    } catch (err) {
      return {
        status: 500,
        msg: "Ocorreu um erro. Favor procurar o administrador do sistema.",
      };
    }
  }

  async getCategory(id) {
    try {
      const result = await Category.findByPk(id);
      return {
        status: 200,
        msg: result,
      };
    } catch (err) {
      return {
        status: 500,
        msg: "Ocorreu um erro. Favor procurar o administrador do sistema.",
      };
    }
  }

  async createCategory(data) {
    try {
      const category = await Category.create(data);
      return {
        status: 200,
        msg: `Categoria, número ${category.id}, criada com sucesso!`,
      }
    } catch (err) {
      return {
        status: 500,
        msg: "Um erro genérico ocorreu, contato o administrador do sistema",
      };
    }
  }

  async updateCategory(id, data) {
    try {
      await Category.update(data, {
        where: {
          id: id,
        },
      });
      return {
        status: 200,
        msg: `Categoria ${id} atualizada com sucesso!`,
      };
    } catch (err) {
      return {
        status: 500,
        msg: "Um erro genérico ocorreu, contato o administrador do sistema",
      };
    }
  }

  async deleteCategory(id) {
    try {
      await Category.destroy({
        where: {
          id: id,
        },
      });
      return {
        status: 200,
        msg: `Categoria ${id} deletado com sucesso!`,
      };
    } catch (err) {
      return {
        status: 500,
        msg: "Um erro genérico ocorreu, contato o administrador do sistema",
      };
    }
  }
}

module.exports = CategoryController;
