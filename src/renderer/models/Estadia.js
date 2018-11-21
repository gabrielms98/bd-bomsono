module.exports = function(sequelize, Sequelize){
  var Estadia = sequelize.define('Estadia', {
    id: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
    Checkin: Sequelize.DATEONLY,
    Checkout: Sequelize.DATEONLY,
    ValorTotal: Sequelize.INTEGER,
    ReservaID: Sequelize.INTEGER,
    ApartamentosID: Sequelize.INTEGER,
    ClienteID: Sequelize.INTEGER
  },
  {
    indexes: [{fields: ['id']}]
  });

  return Estadia;
}
