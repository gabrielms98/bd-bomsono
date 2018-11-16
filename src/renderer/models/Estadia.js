module.exports = function(sequelize, Sequelize){
  var Estadia = sequelize.define('Estadia', {
    id: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
    Checkin: Sequelize.DATE,
    Checkout: Sequelize.DATE,
    ValorTotal: Sequelize.INTEGER,
    ReservaID: Sequelize.INTEGER,
    ApartamentosID: Sequelize.INTEGER
  },
  {
    indexes: [{fields: ['id']}]
  });

  return Estadia;
}
