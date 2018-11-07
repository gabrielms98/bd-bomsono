module.exports = function(sequelize, DataTypes){
  var Cliente = sequelize.define('Cliente', {
    id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    Nome: DataTypes.STRING,
    Rua: DataTypes.STRING,
    Num: DataTypes.INTEGER,
    Bairro: DataTypes.STRING,
    Cidade: DataTypes.STRING,
    Estado: DataTypes.STRING,
    cep: DataTypes.INTEGER,
    Nacionalidade: DataTypes.STRING,
    Email: DataTypes.STRING,
    Telefone: DataTypes.INTEGER,
    Senha: DataTypes.INTEGER
  },
  {
    indexes: [{fields: ['id']}]
  });
  
  return Cliente;
}
