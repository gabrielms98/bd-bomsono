<template>
  <div>
    <v-container>
      <v-layout row wrap justify-center id="wrapper">
        <v-flex xs30 justify-center>
          <v-card>
            <v-toolbar dark color="amber">
              <v-toolbar-title>
                <h3>Minha Reserva</h3>
              </v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-layout row wrap v-if="reserva">
                <v-flex xs12 sm6>
                  <v-card color="amber" class="white--text back1 text-xs-center" small ><v-icon>date</v-icon><h3>Entrada: {{this.entrada}}</h3></v-card>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-card color="amber" class="white--text back1 text-xs-center" small><v-icon>date</v-icon><h3>Saída: {{this.saida}}</h3></v-card>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-card color="amber" class="white--text back1 text-xs-center" small><v-icon>date</v-icon><h3>Hotel: {{this.nome_hotel}}</h3></v-card>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-card color="amber" class="white--text back1 text-xs-center" small><v-icon>date</v-icon><h3>Número de pessoas: {{this.num_pessoas}}</h3></v-card>
                </v-flex>
                <v-flex xs12 sm12>
                  <v-card color="amber" class="white--text back1 text-xs-center" small>
                    <h3>Diaria: {{this.diaria}}, Camas solteiro: {{this.solteiro}}, Camas Casal: {{this.casal}}, TV: {{this.tv}}, Frigobar: {{this.frig}}, Acessibilidade: {{this.access}} </h3>
                  </v-card>
                </v-flex>
              </v-layout>
              <v-layout v-else>
                <h3>Você ainda não possui uma reserva! <br> Acesse a pagina de Hoteis para fazer a sua agora mesmo! </h3>
              </v-layout>
            </v-card-text>
            <v-card-actions v-if="reserva">
              <v-btn class="white--text text-xs-center" color="amber" @click="cancelar">CANCELAR RESERVA</v-btn>
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
    user_id: '',
    reserva_id: '',
    reserva: false,
    entrada: '',
    saida: '',
    nome_hotel: '',
    num_pessoas: '',
    access: '',
    frig: '',
    tv: '',
    casal: '',
    solteiro: '',
    diaria: '',
    qnt: '',
    tipo_id: ''
  }),
  methods: {
    getReserva(){
      this.user_id = this.$cookie.get('cookie_user_session');
      this.$backend.getReserva(this.user_id, reservaObj => {
        if(reservaObj==null){this.reserva=false; return;}
        this.reserva=true;
        this.entrada = reservaObj.Entrada;
        this.saida = reservaObj.Saida;
        this.num_pessoas = reservaObj.NumPessoas;
        this.$backend.getHotelId(reservaObj.HoteisID, hotel => {
          this.nome_hotel = hotel.Nome;
          this.$backend.getTipoid(reservaObj.TiposID, tipo => {
            this.access = (tipo.Acessibilidade==true)? 'SIM' : 'NÃO';
            this.frig = (tipo.Frigobar==true)? 'SIM': 'NÃO';
            this.tv = (tipo.Televisao==true)? 'SIM': 'NÃO';
            this.casal = tipo.CamasCasal;
            this.solteiro = tipo.CamasSolteiro;
            this.diaria = tipo.PrecoDiaria;
            this.qnt = tipo.QntAp;
            this.reserva_id = reservaObj.id;
            this.tipo_id = tipo.id;
          })
        })
      });
    },
    cancelar(){
      remote.dialog.showMessageBox({type:'warning', title:'Você tem certeza?', message: 'Reservas canceladas fora do prazo de 2 dias de antecedencia podem ser cobradas!',
                                    buttons: ['Sim, eu tenho certeza.', 'Não! Eu não quero fazer isso!']}, (idx)=>{
                                      if(idx===0){
                                        this.$backend.deleteReserva(this.reserva_id, reserva => {
                                          this.qnt = this.qnt+1;
                                          this.$backend.addApOnTipo(this.tipo_id, this.qnt, tipo => {});
                                          remote.dialog.showMessageBox({type:'warning', title:'Reserva', message: 'Reserva cancelada com sucesso!'});
                                          this.$router.push('/');
                                        });
                                      };
                                    });
    }

  },
  mounted: function(){
    this.getReserva();
  }
}
</script>

<style lang="css">
</style>
