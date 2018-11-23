const Sequelize = require('sequelize');
const remote = require('electron').remote;
const Op = Sequelize.Op;

//helper functions

//global vars/objects
var models;

const sequelize = new Sequelize('bomsono', 'gabriel', '12345', {
  host: '127.0.0.1',
  dialect: 'mysql',
  operatorsAliases: false,
  port: 5432,
  storage: 'bomsono.db'
});

const fatal_error = err => {remote.dialog.showMessageBox({type: 'warning', title: 'Falha ao conectar com o banco de dados!', message: 'Se voce é o dono do aplicativo, verifique se o banco de dados esta online ou se os parametros de conexão do sequelize estão corretos'});remote.getCurrentWindow().close();}


const sync = () => sequelize.sync();
const loadmodels = () => {
  models = require('./models')(sequelize, Sequelize);
  sync();
  backend.install.synced = true;
};

sequelize.authenticate().then(loadmodels, err => fatal_error(err));


//main object
const backend = {
  install: (Vue, options) => {
    Vue.prototype.$backend = {

      synced: false,

      addUsuario(usuarioObj, callback=null){
        Object.keys(usuarioObj).forEach(function(key){
          if(key=="usuario") return;
        });

        models.Usuario.create({
          Nome: usuarioObj.Nome,
          Rua: usuarioObj.Rua,
          Num: usuarioObj.Num,
          Bairro: usuarioObj.Bairro,
          Cidade: usuarioObj.Cidade,
          Estado: usuarioObj.Estado,
          cep: usuarioObj.cep,
          Nacionalidade: usuarioObj.Nacionalidade,
          Email: usuarioObj.Email,
          Telefone: usuarioObj.Telefone,
          Senha: usuarioObj.Senha,
          adm: usuarioObj.adm,
          usuario: usuarioObj.usuario
        }).then(usuario_criado => callback(usuario_criado));
      },

      checkLogin(user, pwd, callback){
        models.Usuario.findOne({where: {usuario: user, Senha: pwd}})
        .then(usuario => callback(usuario));
      },

      admCheck(cid, callback){
        models.Usuario.findOne({where: {id: cid, adm: 1}})
        .then((cliente) => callback(cliente));
      },

      addTipo(tipoObj, callback=null){
        models.Tipos.create({
          PrecoDiaria: tipoObj.PrecoDiaria,
          Acessibilidade: tipoObj.Acessibilidade,
          CamasCasal: tipoObj.CamasCasal,
          CamasSolteiro: tipoObj.CamasSolteiro,
          Televisao: tipoObj.Televisao,
          Frigobar: tipoObj.Frigobar,
          QntAp: tipoObj.QntAp
        }).then(tipo => callback(tipo));
      },

      getAllTipos(callback=null){
        models.Tipos.findAll()
        .then(tipo => callback(tipo));
      },

      getAllApt(hid, callback=null){
        models.Apartamentos.findAll({where: {HotelID: hid}})
       .then(all_apt => callback(all_apt));
      },

      getAllHoteis(callback=null){
        models.Hotel.findAll()
        .then(hotel => callback(hotel));
      },

      getEstadia(eid, callback=null){
        models.Estadia.findOne({where: {id: eid}})
        .then(estadia => callback(estadia));
      },

      getAp(aid, callback=null){
        models.Apartamentos.findOne({where: {id: aid}})
        .then(ap => callback(ap));
      },

      getAllClientesHosp(eid, callback=null){
        models.Estadia.findAll({where: {id: eid}})
        .then(all_estadias => callback(all_estadias));
      },

      getUsuario(uid, callback=null){
        models.Usuario.findOne({where: {id: uid}})
        .then(usuario => callback(usuario));
      },

      getHotel(nome_hotel, callback=null){
        models.Hotel.findOne({where: {Nome: nome_hotel}})
        .then(hotel => callback(hotel));
      },

      getTipo(casal, solteiro, tv, access, frig, callback=null){
        models.Tipos.findOne({where: {CamasCasal: casal, CamasSolteiro: solteiro, Televisao: tv, Frigobar: frig, Acessibilidade: access}})
        .then(tipo => callback(tipo));
      },

      addAp(apObj, callback=null){
        models.Apartamentos.create({
          NumeroAp: apObj.NumeroAp,
          Ocupado: apObj.Ocupado,
          idTipos: apObj.idTipos,
          EstadiaID: apObj.EstadiaID,
          HotelID: apObj.HotelID
        }).then(ap => callback(ap));
      },

      addApOnTipo(tid, qnt, callback=null){
        models.Tipos.update(
          {QntAp: qnt},
          {where: {id: tid}}
        ).then(() => callback())
      },

      reduceApOnTipo(tid, qnt, callback=null){
        models.Tipos.update(
          {QntAp: qnt},
          {where: {id: tid}}
        ).then(() => callback())
      },

      checkReservaData(entrada, saida, callback=null){
        models.Reserva.findOne({where: {[Op.or]: [{Saida: {[Op.gt]: entrada}}, {Entrada: {[Op.lt]: saida}}]}})
        .then(reservado => callback(reservado))
      },

      addReserva(reservaObj, callback=null){
        models.Reserva.create({
          NumPessoas: reservaObj.NumPessoas,
          TiposID: reservaObj.TiposID,
          HoteisID: reservaObj.HoteisID,
          UsuarioID: reservaObj.UsuarioID,
          Entrada: reservaObj.Entrada,
          Saida: reservaObj.Saida
        }).then(reserva => callback(reserva))
      }
    }
  }
}

export default backend
