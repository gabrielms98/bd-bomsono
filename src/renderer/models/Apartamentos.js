module.exports = function(sequelize, Sequelize){
  var Apartamentos = sequelize.define('Apartamentos', {
    id: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
    NumeroAp: Sequelize.INTEGER,
    Ocupado: Sequelize.BOOLEAN,
    idTipos: Sequelize.INTEGER,
    EstadiaID: Sequelize.INTEGER
  },
  {
    indexes: [{fields: ['id', 'idTipos', 'EstadiaID']}]
  });

  return Apartamentos;
}
