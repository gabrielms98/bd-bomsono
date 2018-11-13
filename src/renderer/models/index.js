module.exports = function(sequelize, Sequelize){
  var models = {}
  models.Usuario = require('./Usuario')(sequelize, Sequelize);
  return models;
}
