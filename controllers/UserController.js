const User = require("../models/User");

const { Sequelize } = require("sequelize");
const GenericController = require("./GenericController");
const Op = Sequelize.Op;
const bcrypt = require('bcryptjs');
const Mail = require('../utils/Mail');

class UserController extends GenericController {
  //to create a class that is a child of another class.
  constructor() { //invoke a superclass's constructor.
    super();
    this.mail = new Mail();
  }

  async getUsers(params) {
    try {
      //Também pode usar desestruturação: getUser({ page, limit })
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
        result = await User.findAll({
          where: {
            [Op.or]:{//Buscar por nome ou email ou username
              name: {
                [Op.like]: `%${params.q}%`,
                //Buscar por nome, passando o parametro 'q' no request. Para buscas com '?q'. Exemplo: localhost:3001/product?q=vEstido
                //Tiago Silva recomendou usar `%${params.q.toLowerCase()}%`,  mas não gostei do resultado na busca.
                //Caso coloque % só no final, busca do inicio em diante, se colocar r vai retornar todos os resultados que iniciam com r.
              },
              email:{
                [Op.like]: `%${params.q}%`,
              },
              username:{
                [Op.like]: `%${params.q}%`,
              },
            },
          },
          ...paramsLimit,
          ...order
        });
      } else {
        result = await User.findAll({
          ...paramsLimit,
          ...order
        });
      }
      return {
        status: 200,
        result: result,
      };
    } catch (err) {
      return {
        status: 500,
        result: "Ocorreu um erro. Favor procurar o administrador do sistema.",
      };
    }
  }

  async getUser(id) {
    try {
      const result = await User.findByPk(id);
      return {
        status: 200,
        result: result,
      };
    } catch (err) {
      return {
        status: 500,
        // msg: "Ocorreu um erro. Favor procurar o administrador do sistema.",
        result: "Um erro genérico ocorreu, contato o administrador do sistema." + err.toString(),

      };
    }
  }

//TODO: Corrigir código. Em erro aparecendo código 200 ok !!
  async createUser(data) {
    try {
      data.password = bcrypt.hashSync(data.password, 10);
      data.token = this.generatePin();
      //criptografar a senha antes de escrever no banco
      const user = await User.create(data);
      
      //Envio de email para validar email do usuário, durante processo createUser
      let html = `<h1>Confirmação de e-mail</h1>
                  <p>Olá, o código de validação do seu e-mail é: ${data.token}, use-o para confirmar sua identidade</p>
                  `;
      this.mail.sendEmail(data.email, "Validação de E-mail", html);//sem await para enviar email de imediato.


      return {
        status: 200,
        result: `Usuário, número ${user.id}, criado com sucesso!`,
      };
    } catch (err) {
      return {
        status: 500,
        // msg: "Um erro genérico ocorreu, contato o administrador do sistema",
        result: "Um erro genérico ocorreu, contato o administrador do sistema." + err.toString(),
      };
    }
  }

  async updateUser(id, data) {
    try {
      await User.update(data, {
        where: {
          id: id,
        },
      });
      return {
        status: 200,
        result: `Usuário ${id} atualizado com sucesso!`,
      };
    } catch (err) {
      return {
        status: 500,
        result: "Um erro genérico ocorreu, contato o administrador do sistema",
      };
    }
  }

  async deleteUser(id) {
    try {
      await User.destroy({
        where: {
          id: id,
        },
      });
      return {
        status: 200,
        result: `Usuário ${id} deletado com sucesso!`,
      };
    } catch (err) {
      return {
        status: 500,
        result: "Um erro genérico ocorreu, contato o administrador do sistema",
      };
    }
  }
}


module.exports = UserController;