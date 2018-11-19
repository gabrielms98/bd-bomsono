<template>
  <div class="">
    <v-container>
      <v-layout>
        <v-flex xs30>
          <v-card>
            <v-toolbar dark color="amber">
              <v-flex xs30 sm25>
                <v-toolbar-title> <h3>Lista de Estadias</h3></v-toolbar-title>
              </v-flex>
              <v-flex>
                  <v-btn flat to="./HoteisAdm"><v-icon>undo</v-icon></v-btn>
              </v-flex>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-spacer></v-spacer>
            <v-card-text>
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
                    <td>{{props.item.nome_cliente}}</td>
                    <td>{{props.item.checkin}}</td>
                    <td>{{props.item.checkout}}</td>
                    <td>{{props.item.quarto}}</td>
                  </tr>
                </template>
                <template slot="pageText" slot-scope="item">
                  Mostrando {{item.pageStart}} - {{item.pageStop}}, de um total de {{item.itemsLength}}
                </template>
                <template slot="no-data">
                  <v-layout class="text-xs-center pa-3">
                    <v-flex xs12>
                      <p>
                        <b>Não há clientes hospedados ainda!</b><br />
                      </p>
                    </v-flex>
                  </v-layout>
                </template>
              </v-data-table>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  data: () => ({
    pagination: {
      sortBy: "name"
    },
    rowsppitems: [10,25,50, {text: "Tudo", value: -1}],
    selected: [],
    headers: [
      {
        text: "Cliente",
        value: "nome_cliente"
      },
      {
        text: "Check-in",
        value: "checkin"
      },
      {
        text: "Check-out",
        value: "checkout"
      },
      {
        text: "Quarto",
        value: "quarto"
      }
    ],
    items: [],
    cliente_nome: '',
    ap: ''
  }),
  props: {
    id: {
      default: '-1'
    }
  },
  methods: {
    allClientesHosp(){
      this.items = [];
      this.$backend.getAllClientesHosp(all_estadias => {
        all_estadias.forEach(estadiaObj => {
          console.log("clienteID: "+estadiaObj.ClienteID);
          this.$backend.getUsuario(estadiaObj.ClienteID, cliente => {
            console.log(cliente.Nome);
            this.cliente_nome = cliente.Nome;
            this.$backend.getAp(estadiaObj.ApartamentosID, apt => {
              this.ap = apt.NumeroAp;
              this.items.push({
                nome_cliente: this.cliente_nome,
                checkin: estadiaObj.Checkin,
                checkout: estadiaObj.Checkout,
                quarto: this.ap
              });
              console.log(this.items);
            });
          });
        })
      })
    }
  },
  mounted: function(){
    this.allClientesHosp();
  }

}
</script>

<style lang="css">
</style>
