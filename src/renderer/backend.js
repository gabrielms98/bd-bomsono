const Sequelize = require('sequelize');
const remote = require('electron').remote;

//helper functions
const fatal_error = err => {remote.dialog.showErrorBox('Não foi possível conectar ao banco de dados!', err); remote.getCurrentWindow().close();}

//global vars/objects
var models;

const sequelize = new Sequelize('sqlite:laborrural.db');

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

      setCliente(){
        
      }
    }
  }
}

export default backend
