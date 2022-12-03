const User = require("../models/User");
const { Sequelize } = require("sequelize");
const Op = Sequelize.Op;
const bcrypt = require("bcryptjs");

const Mail = require("../utils/Mail");
const Jwt = require("../utils/Jwt");

const GenericController = require("./GenericController");

class AuthController extends GenericController {
  constructor() {
    super();
    this.mail = new Mail();
    this.jwt = new Jwt();
  }

  async validateEmail(token) {
    let user = User.findOne({
      where: {
        token: token,
      },
    });
    if (user) {
      await User.update(
        {
          active: true,
        },
        {
          where: {
            token: token,
          },
        }
      );
      return {
        result: "Usuário validado com sucesso!",
        status: 200,
      };
    }
    return {
      result: "Token não encontrado",
      status: 404,
    };
  }

  async updatePassword(token, newPassword) {
    let user = await User.findOne({
      where: {
        token: token,
      },
    });

    if (user) {
      User.update(
        {
          password: bcrypt.hashSync(newPassword, 10), //Cryptografar e salvar no DB o novo password.
          token: null,
        },
        {
          where: {
            email: user.email, // ou:  token: token,
          },
        }
      );
      return {
        status: 200,
        result: "Senha alterada com sucesso",
      };
    }
    return {
      status: 404,
      result: "Token inválido",
    };
  }

  async recoveryPassword(email) {
    let user = await User.findOne({
      where: {
        email: email,
      },
    });
    if (user) {
      //Confirma se usuario existe no DB
      // let token = btoa(email + new Date());
      let token = this.generatePin();
      User.update(
        {
          token: token,
        },
        {
          where: {
            email: email,
          },
        }
      );

      let html = `<h1>Mensagem de Recuperação</h1>
                        <p>Olá, click no link abaixo para recuperar a sua senha:</p>
                        <p><a href="http://localhost:3001/auth/recovery/${token}">Código de verificação para reset de senha</a></p>
                        `;
      this.mail.sendEmail(email, "Recuperação de Senha", html); //sem await para enviar email de imediato.
      return {
        status: 200,
        result:
          "Solicitação realizada. Em alguns instantes você receberá um e-mail.",
      };
    }
    return {
      status: 404,
      result: "Usuário não encontrado.",
    };
  }

  async login(userEmail, password) {
  
    const user = await User.findOne({
      //comando sequelize similar ao await User.findByPk(id);
      where: {
        [Op.or]: {
          username: userEmail,
          email: userEmail,
        },
      },
    });

    if (user) {//Verificar se o usuario existe no DB
      let passVerify = bcrypt.compareSync(password, user.password); //comparar o password passado, com o password do banco (user.password)
      // console.log(`Condição passVerify é: ${passVerify}`);

      if (passVerify) {//Verifica se password é válido
        if(user.active){
            let token = this.jwt.generateToken({
                email: user.email,
                username: user.username,
                name: user.name,
              });
              const {email, username, name, id, role, active} = user;//Extraindo as informações do user que irei enviar via json (ao invés de delete user.password)
              return {
                result: {
                  msg: "Usuário logado com sucesso",
                  token: token,
                  user: {
                    email, 
                    username, 
                    name, 
                    id, 
                    role, 
                    active
                  },
                },
                status: 200,
              };
        }//Se active false:
        let token = this.generatePin();
        User.update({token: token}, {
            where:{
                id: user.id
            }
        });

        let html = `<h1>Confirmação de e-mail</h1>
                    <p>Olá, o código de validação do seu e-mail é: ${token}, use-o para confirmar sua identidade</p>
                    `;
        this.mail.sendEmail(user.email, "Validação de E-mail", html);//sem await para enviar email de imediato.

        return{
            result:{
                msg: "Usuário desativado, enviamos um e-mail para você ativar a sua conta.",
            },
            status: 401,
        };
        
      }
    }
    return {
      result: "Dados inválidos",
      status: 401,
    };
  }
}

module.exports = AuthController;
