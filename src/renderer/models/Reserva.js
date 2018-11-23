module.exports = function(sequelize, Sequelize){
  var Reserva = sequelize.define('Reserva', {
    id: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
    NumPessoas: Sequelize.INTEGER,
    TiposID: Sequelize.INTEGER,
    HoteisID: Sequelize.INTEGER,
    UsuarioID: Sequelize.INTEGER,
    Entrada: Sequelize.DATEONLY,
    Saida: Sequelize.DATEONLY
  },
  {
    indexes: [{fields: ['id']}]
  });

  return Reserva;
}
