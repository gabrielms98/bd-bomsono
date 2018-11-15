module.exports = function(sequelize, Sequelize){
  var Tipos = sequelize.define('Tipos', {
    id: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
    PrecoDiaria: Sequelize.INTEGER,
    Acessibilidade: Sequelize.BOOLEAN,
    CamasCasal: Sequelize.INTEGER,
    CamasSolteiro: Sequelize.INTEGER,
    Televisao: Sequelize.BOOLEAN,
    Frigobar: Sequelize.BOOLEAN
  },
  {
    indexes: [{fields: ['id']}]
  });

  return Tipos;
}
