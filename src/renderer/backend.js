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
        ).then((tipo) => callback(tipo))
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
      },

      addHotel(hotelObj, callback=null){
        models.Hotel.create({
          Nome: hotelObj.Nome,
          Endereco: hotelObj.Endereco,
          Estrelas: hotelObj.Estrelas
        }).then(hotel => callback(hotel))
      },

      getReservaTipo(tid, callback=null){
        models.Reserva.findAll({where: {TiposID: tid}})
        .then(reservas => callback(reservas))
      },

      getReserva(uid, callback=null){
        models.Reserva.findOne({where: {UsuarioID: uid}})
        .then(reserva => callback(reserva))
      },

      getHotelId(hid, callback=null){
        models.Hotel.findOne({where: {id: hid}})
        .then(hotel => callback(hotel))
      },

      getTipoid(tid, callback=null){
        models.Tipos.findOne({where: {id: tid}})
        .then(tipo => callback(tipo))
      },

      deleteReserva(rid, callback=null){
        models.Reserva.destroy({where: {id: rid}})
        .then(reserva => callback(reserva))
      },

      getCliente(nome, callback=null){
        models.Usuario.findOne({where: {Nome: nome}})
        .then(cliente => callback(cliente))
      },

      reservaApt(aid, callback=null){
        models.Apartamentos.update(
          {Ocupado: 1},
          {where: {id: aid}}
        ).then(reservado => callback(reservado))
      },

      createEstadia(estadiaObj, callback=null){
        models.Estadia.create({
          Checkin: estadiaObj.Checkin,
          Checkout: estadiaObj.Checkout,
          ValorTotal: estadiaObj.ValorTotal,
          ReservaID: estadiaObj.ReservaID,
          ApartamentosID: estadiaObj.ApartamentosID,
          ClienteID: estadiaObj.ClienteID
        }).then(estadia => callback(estadia))
      },

      getAllAptTipo(tid, callback=null){
        models.Apartamentos.findAll({where: {idTipos: tid}})
        .then(all_apt => callback(all_apt))
      },

      getEstadiaC(cid, callback=null){
        models.Estadia.findOne({where: {ClienteID: cid}})
        .then(estadia => callback(estadia))
      },

      getApt(aid, callback=null){
        models.Apartamentos.findOne({where: {id: aid}})
        .then(apt => callback(apt))
      },

      getReservaId(rid, callback=null){
        models.Reserva.findOne({where: {id: rid}})
        .then(reserva => callback(reserva))
      },

      getEstadiaR(rid, callback=null){
        models.Estadia.findOne({where: {ReservaID: rid}})
        .then(estadia => callback(estadia))
      },

      getAllConsumo(eid, callback=null){
        models.Consumo.findAll({where: {EstadiaID: eid}})
        .then(all_consumo => callback(all_consumo))
      },

      getTipoServico(tid, callback=null){
        models.TipoServico.findOne({where: {id: tid}})
        .then(tipo => callback(tipo))
      },

      addConsumo(consumo, callback=null){
        models.Consumo.create({
          Preco: consumo.Preco,
          EstadiaID: consumo.EstadiaID,
          TipoServicoID: consumo.TipoServicoID,
          FuncionarioID: consumo.FuncionarioID
        }).then(consumo => callback(consumo))
      },

      getProduto(nome, tipo, callback=null){
        models.TipoServico.findOne({where: {Nome: nome, Tipo: tipo}})
        .then(produto => callback(produto))
      },

      getAptNum(num, callback=null){
        models.Apartamentos.findOne({where: {NumeroAp: num}})
        .then(apt => callback(apt))
      },

      setAptEstadia(aid, eid, callback=null){
        models.Apartamentos.update(
          {EstadiaID: eid},
          {where: {id: aid}}
        ).then(apt => callback(apt))
      },

      addProduto(prod, callback=null){
        models.TipoServico.create({
          Tipo: prod.Tipo,
          Nome: prod.Nome,
          Preco: prod.Preco
        }).then(produto => callback(produto))
      },

      setValorTotal(eid, val, callback=null){
        models.Estadia.findOne({where: {id: eid}})
        .then(estadia => {
          let total=0;
          total += parseInt(val) + parseInt(estadia.ValorTotal);
          console.log(total);
          models.Estadia.update(
            {ValorTotal: total},
            {where: {id: eid}}
          ).then(val => callback(val))
        })
      },

      desocupaApt(eid, callback=null){
        models.Apartamentos.update(
          {Ocupado: 0},
          {where: {EstadiaID: eid}}
        ).then(apt => callback(apt))
      },
      
      desocupa2(eid, callback=null){
        models.Apartamentos.update(
          {EstadiaID: null},
          {where: {EstadiaID: eid}}
        ).then(apt => callback(apt))
      }
    }
  }
}

export default backend
