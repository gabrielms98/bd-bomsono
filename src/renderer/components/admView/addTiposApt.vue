<template lang="html">
  <div>
    <v-container>
      <v-layout row wrap justify-center id="wrapper">
        <v-flex xs30 justify-center>
          <v-card>
            <v-toolbar dark color="amber">
              <v-toolbar-title> <h3>Cadastrar novo tipo de apartamento</h3></v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-spacer></v-spacer>
            <v-card-text>
              <v-container grid-list-md>
                <v-form ref="form">
                  <v-layout row wrap>
                    <v-flex xs12 sm4>
                      <v-text-field v-model="cadastro_diaria" prefix="R$" type="number" label="Preço Diária" required></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm4>
                      <v-text-field v-model="cadastro_casal" type="number" label="Quantidade camas de casal" required></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm4>
                      <v-text-field v-model="cadastro_solteiro" type="number" label="Quantidade camas de solteiro" required></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm4>
                      <v-checkbox label="Acessibilidade" v-model="cadastro_access"></v-checkbox>
                    </v-flex>
                    <v-flex xs12 sm4>
                      <v-checkbox label="Televisão" v-model="cadastro_televisao"></v-checkbox>
                    </v-flex>
                    <v-flex xs12 sm4>
                      <v-checkbox label="Frigobar" v-model="cadastro_frigobar"></v-checkbox>
                    </v-flex>
                  </v-layout>
                </v-form>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer><v-spacer></v-spacer>
              <v-btn @click="submit" color="amber">Cadastrar</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>

    <v-container>
      <v-layout row wrap justify-center id="wrapper">
        <v-flex xs30 justify-center>
          <v-card>
            <v-toolbar dark color="amber">
              <v-toolbar-title> <h3>Listar todos os tipos</h3></v-toolbar-title>
              <v-btn icon @click="abreLista" flat><v-icon>list</v-icon></v-btn>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-spacer></v-spacer>
            <v-card-text v-if="listar">
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
                    <td>{{props.item.tid}}</td>
                    <td>{{props.item.preco}}</td>
                    <td>{{props.item.casal}}</td>
                    <td>{{props.item.solteiro}}</td>
                    <td>{{props.item.access}}</td>
                    <td>{{props.item.tv}}</td>
                    <td>{{props.item.frigobar}}</td>
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
            </v-card-text>
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
    cadastro_diaria: '',
    cadastro_casal: '',
    cadastro_solteiro: '',
    cadastro_access: false,
    cadastro_televisao: false,
    cadastro_frigobar: false,
    listar: false,
    pagination: {
      sortBy: "name"
    },
    rowsppitems: [10,25,50, {text: "Tudo", value: -1}],
    selected: [],
    headers: [
      {
        text: "ID",
        align: "left",
        value: "tid"
      },
      {
        text: "Preço Diária",
        value: "preco"
      },
      {
        text: "Camas de casal",
        value: "casal"
      },
      {
        text: "Camas de solteiro",
        value: "solteiro"
      },
      {
        text: "Acessibilidade",
        value: "access"
      },
      {
        text: "Televisão",
        value: "tv"
      },
      {
        text: "Frigobar",
        value: "frigobar"
      }
    ],
    items: []
  }),

  methods: {
    submit(){
      this.$backend.addTipo({
        PrecoDiaria: this.cadastro_diaria,
        Acessibilidade: this.cadastro_access,
        CamasCasal: this.cadastro_casal,
        CamasSolteiro: this.cadastro_solteiro,
        Televisao: this.cadastro_televisao,
        Frigobar: this.cadastro_frigobar,
        QntAp: 0
      }, (created) => {
        if(created == null){remote.dialog.showMessageBox({type: 'warning', title: 'Falha ao criar tipo!', message: 'Verifique as informações e tente novamente'}); return;}
        remote.dialog.showMessageBox({type: 'info', title: 'Tipo criado com sucesso!', message: 'O tipo: id: ' + created.id + ', com ' + created.CamasCasal + ' camas de casal e ' + created.CamasSolteiro + ' camas de solteiro foi criado com sucesso!'});
        this.clear();
      });
    },
    clear(){
      this.$refs.form.reset();
    },
    allTipos(){
      console.log("Oi");
      this.items = [];
      this.$backend.getAllTipos(all_tipos => {
        all_tipos.forEach(tipoObj => {
          this.items.push({
            value: false,
            tid: tipoObj.id,
            preco: tipoObj.PrecoDiaria,
            casal: tipoObj.CamasCasal,
            solteiro: tipoObj.CamasSolteiro,
            access: tipoObj.Acessibilidade == 1? "SIM" : "NÃO",
            tv: tipoObj.Televisao == 1? "SIM" : "NÃO",
            frigobar: tipoObj.Frigobar == 1? "SIM" : "NÃO"
          });
        });
      });
      console.log(this.items);
    },
    abreLista(){
      this.listar = !this.listar;
      if(this.listar == true){this.allTipos();}
    }
  },

  mounted: function(){

  }
};
</script>

<style lang="css">
</style>
