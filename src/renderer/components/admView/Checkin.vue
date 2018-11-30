<template>
  <div>
    <v-container>
      <v-layout row wrap justify-center id="wrapper">
        <v-flex xs30 justify-center>
          <v-card>
            <v-toolbar dark color="amber">
              <v-toolbar-title> <h3>Check-in</h3></v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-spacer></v-spacer>
            <v-card-text>
              <v-stepper v-model="e6" vertical >
                <v-stepper-step :complete="e6 > 1" step="1">
                  Nome do cliente
                </v-stepper-step>

                <v-stepper-content step="1">
                  <v-text-field label="Nome do cliente" v-model="nome_cliente" type="text"></v-text-field>
                  <v-btn color="amber" @click="getCliente">Continue</v-btn>
                  <v-btn flat>Cancel</v-btn>
                </v-stepper-content>

                <v-stepper-step :complete="e6 > 2" step="2">Selecione um apartamento</v-stepper-step>

                <v-stepper-content step="2">
                  <v-data-table
                  v-model="selected"
                  :headers="headers"
                  :items="items"
                  :pagination.sync="pagination"
                  item-key="id"
                  class="elevation-1"
                  rows-per-page-text="Linhas por página"
                  :rows-per-page-items="rowsppitems"
                  >
                    <template slot="items" slot-scope="props">
                      <tr>
                        <td></td>
                        <td></td>
                        <td>{{props.item.num_ap}}</td>
                        <td></td>
                        <td></td>
                        <td><v-btn small color="amber" @click="reservaApt(props.item.apt_id)"><v-icon>info</v-icon>RESERVAR</v-btn></td>
                        <td></td>
                      </tr>
                    </template>
                    <template slot="pageText" slot-scope="item">
                      Mostrando {{item.pageStart}} - {{item.pageStop}}, de um total de {{item.itemsLength}}
                    </template>
                    <template slot="no-data">
                      <v-layout class="text-xs-center pa-3">
                        <v-flex xs12>
                          <p>
                            <b>Não há tipos cadastrados!</b><br />
                          </p>
                        </v-flex>
                      </v-layout>
                    </template>
                  </v-data-table>
                  <v-btn color="amber" @click="e6 = 1">Continue</v-btn>
                  <v-btn flat>Cancel</v-btn>
                </v-stepper-content>

              </v-stepper>
            </v-card-text>
            <v-card-actions>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { remote } from 'electron'
export default {
  data: () => ({
    e6: 1,
    pagination: {
      sortBy: "name"
    },
    rowsppitems: [10,25,50, {text: "Tudo", value: -1}],
    selected: [],
    headers: [
      {
        text: "",
        value: ""
      },
      {
        text: "",
        value: ""
      },
      {
        text: "AP",
        value: "num_ap"
      },
      {
        text: " ",
        value: "actions"
      }

    ],
    items: [],
    nome_cliente: '',
    cliente_id: ''
  }),
  methods: {
    getCliente(){
      this.$backend.getCliente(this.nome_cliente, cliente => {
        if(cliente==null){remote.dialog.showMessageBox({type: 'warning', title: 'Não foi possivel localizar o cliente!', message: 'Verifique se o nome esta correto!'}); return;}
        this.cliente_id = cliente.id;
        this.e6 = 2;
        this.getReserva();
      })
    },
    getReserva(){
      this.$backend.getReserva(this.cliente_id, reserva => {
        if(reserva==null){console.log("nao achou essa reserva!");return;}
        this.$backend.getAllAptTipo(reserva.TiposID, all_apt => {
          if(all_apt==null){console.log("Não tem nenhum ap desse tipo");return;}
          all_apt.forEach(aptObj => {
            if(aptObj.Ocupado===false){
              this.items.push({
                num_ap: aptObj.NumeroAp,
                apt_id: aptObj.id,
                actions: " "
              })
            } else {
              console.log("Ap Ocupado");
            }
          })
        })
      })
    },
    reservaApt(aid){
      console.log("reservando...");
      this.$backend.reservaApt(aid, reservaAp => {
        if(reservaAp==null){console.log("deu bostta");remote.dialog.showMessageBox({type: '', title: '', message: ''});return;}
        this.$backend.getReserva(this.cliente_id, reserva => {
          if(reserva==null) {console.log("deu merda");remote.dialog.showMessageBox({type: '', title: '', message: ''}); return;}
          this.$backend.createEstadia({
            Checkin: reserva.Entrada,
            Checkout: reserva.Saida,
            ValorTotal: 0,
            ReservaID: reserva.id,
            ApartamentosID: aid,
            ClienteID: this.cliente_id
          }, estadia => {
            if(estadia==null){console.log("deu coco");remote.dialog.showMessageBox({type: '', title: '', message: ''});return;}
            this.$backend.setAptEstadia(aid, estadia.id, apt => { });
            remote.dialog.showMessageBox({type: 'warning', title: 'Check-in', message: 'Check-in realizado com sucesso!'});
            this.e6 = 1;
          })
        });
      })
    }
  }
}
</script>

<style lang="css">
</style>
