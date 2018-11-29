<template>
  <div>
    <v-container>
      <v-layout row wrap justify-center id="wrapper">
        <v-flex  xs30 justify-center>
          <v-card>
            <v-toolbar dark color="amber">
              <v-toolbar-title> <h3>Check-out</h3></v-toolbar-title>
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

                <v-stepper-step :complete="e6 > 2" step="2">Conta</v-stepper-step>

                <v-stepper-content step="2">
                    <v-flex xs12 sm5>
                      <h3>Diarias: R${{this.valor_total_diarias}}</h3>
                    </v-flex>
                    <v-flex xs12 sm5>
                      <h3>Valor Total da Conta: R${{this.valor_total_conta}}</h3>
                    </v-flex>
                  <v-btn color="amber" @click="pagamento">Gerar Nota Fiscal</v-btn>
                  <v-btn flat>Cancel</v-btn>
                  <v-dialog v-model="dialog">
                    <invoice :rid="estadia_id" ></invoice>
                  </v-dialog>
                </v-stepper-content>

                <v-stepper-step :complete="e6 > 3" step="3">Pagamento</v-stepper-step>

                <v-stepper-content step="3">
                  <v-btn color="amber" @click="pago">PAGAR</v-btn>
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
import invoice from './invoice'
export default {
  components: {invoice},
  data: () => ({
    e6: 1,
    valor_total_diarias: '',
    nome_cliente: '',
    cliente_id: '',
    estadia_id: '',
    valor_total_conta: '',
    dialog: false
  }),
  methods: {
    numeroDias(firstDate, secondDate){
      var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds

      var diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));

      return diffDays;
    },
    valorDiarias(){
      console.log(this.cliente_id);
      this.$backend.getEstadiaC(this.cliente_id, estadia => {
        console.log(estadia);
        if(estadia==null){remote.dialog.showMessageBox({type: 'warning', title: 'asda', message: 'asdadsad'}); return;}
        const [a1, m1, d1] = estadia.Checkin.split('-');
        const [a2, m2, d2] = estadia.Checkout.split('-');
        this.valor_total_conta = estadia.ValorTotal;
        this.estadia_id = estadia.id;
        let entrada = new Date(a1, m1, d1);
        let saida = new Date(a2, m2, d2);
        let dias = this.numeroDias(entrada, saida);
        this.$backend.getApt(estadia.ApartamentosID, apt => {
          if(apt==null){return;}
          this.$backend.getTipoid(apt.idTipos, tipo => {
            if(tipo==null){return;}
            this.valor_total_diarias = dias * tipo.PrecoDiaria;
          })
        })
      })
    },
    getCliente(){
      this.$backend.getCliente(this.nome_cliente, cliente => {
        if(cliente==null){remote.dialog.showMessageBox({type: 'warning', title: 'Não foi possivel localizar o cliente!', message: 'Verifique se o nome esta correto!'}); return;}
        this.cliente_id = cliente.id;
        this.valorDiarias();
        this.e6 = 2;
      })
    },
    pagamento(){
      this.dialog = !this.dialog;
      this.e6 = 3;
    },

    pago(){
      //EXCLUIR A RESERVA
    }
  }
}
</script>

<style lang="css">

</style>
