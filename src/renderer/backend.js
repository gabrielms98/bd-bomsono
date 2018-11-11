const Sequelize = require('sequelize');
const remote = require('electron').remote;

//helper functions
const fatal_error = err => {remote.dialog.showErrorBox('Não foi possível conectar ao banco de dados!', err); remote.getCurrentWindow().close();}

//global vars/objects
var models;

const sequelize = new Sequelize('sqlite:bomsono.db');

const sync = () => sequelize.sync();
const loadmodels = () => {
  models = require('./models')(sequelize, Sequelize);
  sync();
}

sequelize.authenticate().then(loadmodels, err => fatal_error(err));

//main object
const backend = {
  install: (Vue, options) => {
    Vue.prototype.$backend = {

      synced: false,

      addCliente(clienteObj, callback=null){
        Object.keys(clienteObj).forEach(function(key){
          if(key=="usuario") return;
        });

        models.Cliente.create({
          Nome: clienteObj.Nome,
          Rua: clienteObj.Rua,
          Num: clienteObj.Num,
          Bairro: clienteObj.Bairro,
          Cidade: clienteObj.Cidade,
          Estado: clienteObj.Estado,
          cep: clienteObj.cep,
          Nacionalidade: clienteObj.Nacionalidade,
          Email: clienteObj.Email,
          Telefone: clienteObj.Telefone,
          Senha: clienteObj.Senha,
          adm: 0,
          usuario: clienteObj.usuario
        }).then(cliente_criado => callback(cliente_criado));
      },

      checkLogin(user, pwd, callback){
        models.Cliente.findOne({where: {usuario: user, Senha: pwd}})
        .then(usuario => callback(usuario));
      },

      admCheck(cid, callback){
        models.Cliente.findOne({where: {id: cid, adm: 1}})
        .then((cliente) => callback(cliente));
      }
    }
  }
}

export default backend
