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
  storage: 'bomsono.db'
});

const fatal_error = err => {remote.dialog.showMessageBox({type: 'warning', title: 'Falha ao conectar com o banco de dados!', message: 'Se voce é o dono do aplicativo, verifique se o banco de dados esta online ou se os parametros de conecção do sequelize estão corretos'}); remote.getCurrentWindow().close();}


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

      addUsuario(usuarioObj, callback=null){
        Object.keys(usuarioObj).forEach(function(key){
          if(key=="usuario") return;
        });

        models.Usuario.create({
          Nome: usuarioObj.Nome,
          Rua: usuarioObj.Rua,
          Num: usuarioObj.Num,
          Bairro: usuarioObj.Bairro,
          Cidade: usuarioObj.Cidade,
          Estado: usuarioObj.Estado,
          cep: usuarioObj.cep,
          Nacionalidade: usuarioObj.Nacionalidade,
          Email: usuarioObj.Email,
          Telefone: usuarioObj.Telefone,
          Senha: usuarioObj.Senha,
          adm: usuarioObj.adm,
          usuario: usuarioObj.usuario
        }).then(usuario_criado => callback(usuario_criado));
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
