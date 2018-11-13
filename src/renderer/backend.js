const Sequelize = require('sequelize');
const remote = require('electron').remote;

//helper functions

//global vars/objects
var models;

const sequelize = new Sequelize('bomsono', 'gabriel', 'bee3c4f5', {
  host: 'localhost',
  dialect: 'mysql',
  operatorsAliases: false,
  port: 5432,
  pool: {
    max: 999,
    min: 0,
    acquire: 3000,
    idle: 10000
  },
  storage: 'testando.db'
});

const fatal_error = err => {remote.dialog.showErrorBox('Não foi possível conectar ao banco de dados!', err); remote.getCurrentWindow().close();}


const sync = () => sequelize.sync();
const loadmodels = () => {
  models = require('./models')(sequelize, Sequelize);
  sync();
};

sequelize.authenticate().then(loadmodels, err => fatal_error(err));

// models.Cliente.create({
//   Nome: 'Gabriel Martins Silva',
//   Rua: 'Padre A',
//   Num: '61',
//   Bairro: 'Ramdela',
//   Cidade: 'Viciosa',
//   Estado: 'Minus',
//   cep: '61616161',
//   Nacionalidade: 'Full BR',
//   Email: 'email@aleatorio.com',
//   Telefone: '616161616',
//   Senha: '12345',
//   adm: 1,
//   usuario: 'gabriel'
// });
sequelize.sync();

//main object
const backend = {
  install: (Vue, options) => {
    Vue.prototype.$backend = {

      synced: false,

      addCliente(clienteObj, callback=null){
        Object.keys(clienteObj).forEach(function(key){
          if(key=="usuario") return;
        });

        models.Usuario.create({
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
        models.Usuario.findOne({where: {usuario: user, Senha: pwd}})
        .then(usuario => callback(usuario));
      },

      admCheck(cid, callback){
        models.Usuario.findOne({where: {id: cid, adm: 1}})
        .then((cliente) => callback(cliente));
      }
    }
  }
}

export default backend
