module.exports = function(sequelize, DataTypes){
  var models = {}
  models.Cliente = require('./Cliente')(sequelize, DataTypes);

  return models;
}
