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
  storage: 'bomsono.sqlite'
});

const fatal_error = err => {remote.dialog.showMessageBox({type: 'warning', title: 'Não foi possivel conectar com o banco de dados!', message: 'Verifique sua conexao!'}); remote.getCurrentWindow().close();}


const sync = () => sequelize.sync();
const loadmodels = () => {
  models = require('./models')(sequelize, Sequelize);
  sync();
  backend.install.synced = true;
};

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
          adm: clienteObj.adm,
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
      },

      addTipo(tipoObj, callback=null){
        models.Tipos.create({
          PrecoDiaria: tipoObj.PrecoDiaria,
          Acessibilidade: tipoObj.Acessibilidade,
          CamasCasal: tipoObj.CamasCasal,
          CamasSolteiro: tipoObj.CamasSolteiro,
          Televisao: tipoObj.Televisao,
          Frigobar: tipoObj.Frigobar
        }).then(tipo => callback(tipo));
      },

      getAllTipos(callback=null){
        models.Tipos.findAll()
        .then(tipo => callback(tipo));
      },
       getAllApt(callback=null){
         models.Apartamentos.findAll()
         .then(apt => callback(apt));
       }
    }
  }
}

export default backend
