module.exports = function(sequelize, Sequelize){
  var models = {}

  models.Usuario = require('./Usuario')(sequelize, Sequelize);
  models.Tipos = require('./Tipos')(sequelize, Sequelize);
  models.Apartamentos = require('./Apartamentos')(sequelize, Sequelize);
  models.Reserva = require('./Reserva')(sequelize, Sequelize);
  models.Estadia = require('./Estadia')(sequelize, Sequelize);
  models.Hotel = require('./Hotel')(sequelize, Sequelize);
  models.Consummo = require('./Consumo')(sequelize, Sequelize);
  models.TipoServico = require('./TiposServico')(sequelize, Sequelize);

  return models;
}
