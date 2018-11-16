module.exports = function(sequelize, Sequelize){
  var Hotel = sequelize.define('Hotel', {
    id: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
    Nome: Sequelize.STRING,
    Endereco: Sequelize.STRING,
    Estrelas: Sequelize.INTEGER
  },
  {
    indexes: [{fields: ['id']}]
  });

  return Hotel;
}
