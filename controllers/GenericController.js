//Exemplo de superclass. Classe pai a ser importada via extends no filho CategoryController.js

class GenericController {
  generatePagination(params) {
    //Page limit: Ex: localhost:3001/category?q=r&limit=2&page=1
    const limit = params.limit ? parseInt(params.limit) : 10, //params.limit foi passado? Existe? Converter para Int (usando ParseInt), pois todos os dados de uma URI, retornam como string.
          page = params.page ? parseInt(params.page) - 1 : 0; //params.page foi passado?

    return [limit, page];
  }
}

module.exports = GenericController;