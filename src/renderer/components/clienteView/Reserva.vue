<template>
  <div v-if="!busca">
    <v-container>
      <v-layout>
        <v-flex xs30>
          <v-card>
            <v-toolbar dark color="amber">
              <v-toolbar-title> <h3>Reserva de quarto &nbsp</h3></v-toolbar-title>
              <v-btn flat to="./HoteisCliente"><v-icon>undo</v-icon></v-btn>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-spacer></v-spacer>
            <v-card-text>
              <v-container grid-list-md>
                <v-form ref="form">
                  <v-layout row wrap>
                    <v-flex xs12 sm5>
                      <v-menu
                        ref="menu"
                        :close-on-content-click="false"
                        v-model="menu1"
                        :nudge-right="40"
                        lazy
                        transition="scale-transition"
                        offset-y
                        full-width
                        max-width="290px"
                        min-width="290px"
                      >
                        <v-text-field
                          slot="activator"
                          v-model="dateFormatted"
                          label="dd/mm/aaaa"
                          persistent-hint
                          prepend-icon="event"
                          @blur="date = parseDate(dateFormatted)"
                        ></v-text-field>
                        <v-date-picker v-model="date" no-title @input="menu1 = false"></v-date-picker>
                      </v-menu>
                    </v-flex>
                    <v-flex xs12 sm5>
                      <v-menu
                        ref="menu"
                        :close-on-content-click="false"
                        v-model="menu2"
                        :nudge-right="40"
                        lazy
                        transition="scale-transition"
                        offset-y
                        full-width
                        max-width="290px"
                        min-width="290px"
                      >
                        <v-text-field
                          slot="activator"
                          v-model="dateFormatted2"
                          label="dd/mm/aaaa"
                          persistent-hint
                          prepend-icon="event"
                          @blur="date2 = parseDate(dateFormatted2)"
                        ></v-text-field>
                        <v-date-picker v-model="date2" no-title @input="menu2 = false"></v-date-picker>
                      </v-menu>
                    </v-flex>
                    <v-flex xs12 sm4>
                      <v-checkbox label="Frigobar" v-model="frigobar"></v-checkbox>
                    </v-flex>
                    <v-flex xs12 sm4>
                      <v-checkbox label="Televisão" v-model="tv"></v-checkbox>
                    </v-flex>
                    <v-flex xs12 sm4>
                      <v-checkbox label="Acessibilidade" v-model="access"></v-checkbox>
                    </v-flex>
                    <v-flex xs12 sm4>
                      <v-text-field label="Número camas de casal" v-model="casal" type="number" required></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm4>
                      <v-text-field label="Número camas de solteiro" v-model="solteiro" type="number" required></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm4>
                      <v-text-field label="Número de pessoas" v-model="num_pessoas" type="number" required></v-text-field>
                    </v-flex>
                  </v-layout>
                </v-form>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer><v-spacer></v-spacer>
              <v-btn @click="buscar" color="amber">BUSCAR</v-btn>
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
  data: vm => ({
    date: new Date().toISOString().substr(0, 10),
    date2: new Date().toISOString().substr(0, 10),
    dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
    dateFormatted2: vm.formatDate(new Date().toISOString().substr(0, 10)),
    menu1: false,
    menu2: false,
    frigobar: false,
    tv: false,
    access: false,
    busca: false,
    casal: '',
    solteiro: '',
    num_pessoas: ''
  }),
  computed: {
    computedDateFormatted () {
      return this.formatDate(this.date)
    }
  },
  watch: {
    date (val) {
      this.dateFormatted = this.formatDate(this.date)
    }
  },
  props: {
    id: {
      default: '-1'
    }
  },
  methods: {
    buscar(){
      this.busca = !this.busca;
    },
    formatDate (date) {
      if (!date) return null

      const [year, month, day] = date.split('-')
      return `${day}/${month}/${year}`
    },
    parseDate (date) {
      if (!date) return null

      const [month, day, year] = date.split('/')
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    },
    buscar(){
      this.$backend.getTipo(this.casal, this.solteiro, this.tv, this.access, this.frigobar, tipo => {
        if(tipo==null){remote.dialog.showMessageBox({type: 'warning', title: 'Erro ao fazer a reserva', message: 'Não existe quarto que atenda a suas especificações!1'});return;}
        else if(tipo.QntAp > 0){
          this.$backend.addReserva({
            NumPessoas: this.num_pessoas,
            TiposID: tipo.id,
            HoteisID: this.id,
            UsuarioID: this.$cookie.get('cookie_user_session'),
            Entrada: this.date,
            Saida: this.date2
          }, reserva => {
            // if(reserva==null){}
            this.$backend.reduceApOnTipo(tipo.id, tipo.QntAp-1);
            remote.dialog.showMessageBox({type: 'warning', title: 'Sucesso', message: 'Reserva realiza com sucesso!1'});
            return;
          });
        }
        else{
          let data = 0;
          let count=0;
          let maior_data= new Date();
          this.$backend.getReservaTipo(tipo.id, all_reservas => {
            all_reservas.forEach(reserva => {
              count++;
              console.log(reserva.Saida);
              if(maior_data < reserva.Saida) {maior_data = reserva.Saida}
              if(count == all_reservas.length){
                if(maior_data < this.date){
                  this.$backend.addReserva({
                    NumPessoas: this.num_pessoas,
                    TiposID: tipo.id,
                    HoteisID: this.id,
                    UsuarioID: this.$cookie.get('cookie_user_session'),
                    Entrada: this.date,
                    Saida: this.date2
                  }, reserva => {
                    if(reserva==null){return;}
                    remote.dialog.showMessageBox({type: 'warning', title: 'Sucesso', message: 'Reserva realiza com sucesso!2'});
                    return;
                  });
                }
                else {
                  remote.dialog.showMessageBox({type: 'warning', title: 'Erro ao fazer a reserva', message: 'Não ha quarto disponivel que atenda a suas especificações!1'});
                  return;
                }
              }
            });
          });
        }
      });
    }
  }
}
</script>

<style lang="css">
</style>
