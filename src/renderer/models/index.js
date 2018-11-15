module.exports = function(sequelize, Sequelize){
  var models = {}

  models.Usuario = require('./Usuario')(sequelize, Sequelize);
  models.Tipos = require('./Tipos')(sequelize, Sequelize);
  models.Apartamentos = require('./Apartamentos')(sequelize, Sequelize);
  return models;
}
