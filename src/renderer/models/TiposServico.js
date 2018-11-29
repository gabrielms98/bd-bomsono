module.exports = function(sequelize, Sequelize){
  var TipoServico = sequelize.define('TipoServico', {
    id: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
    Tipo: Sequelize.STRING,
    Nome: Sequelize.STRING,
    Preco: Sequelize.INTEGER
  },
  {
    indexes: [{fields: ['id']}]
  });

  return TipoServico;
}
