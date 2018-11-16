module.exports = function(sequelize, Sequelize){
  var Usuario = sequelize.define('Usuario', {
    id: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
    Nome: Sequelize.STRING,
    Rua: Sequelize.STRING,
    Num: Sequelize.INTEGER,
    Bairro: Sequelize.STRING,
    Cidade: Sequelize.STRING,
    Estado: Sequelize.STRING,
    cep: Sequelize.INTEGER,
    Nacionalidade: Sequelize.STRING,
    Email: Sequelize.STRING,
    Telefone: Sequelize.INTEGER,
    Senha: Sequelize.INTEGER,
    adm: Sequelize.INTEGER,
    usuario: Sequelize.STRING,
    EstadiaID: Sequelize.INTEGER,
  },
  {
    indexes: [{fields: ['id','EstadiaID']}]
  });

  return Usuario;
}
