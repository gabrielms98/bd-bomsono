module.exports = function(sequelize, Sequelize){
  var Consumo = sequelize.define('Consumo', {
    id: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
    Preco: Sequelize.INTEGER,
    EstadiaID: Sequelize.INTEGER,
    TipoServicoID: Sequelize.INTEGER,
    FuncionarioID: Sequelize.INTEGER
  },
  {
    indexes: [{fields: ['id']}]
  });

  return Consumo;
}
