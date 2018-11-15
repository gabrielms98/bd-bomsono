module.exports = function(sequelize, Sequelize){
  var Apartamentos = sequelize.define('Apartamentos', {
    id: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
    NumeroAp: Sequelize.INTEGER,
    idTipos: Sequelize.INTEGER
  },
  {
    indexes: [{fields: ['id']}]
  });

  return Apartamentos;
}
