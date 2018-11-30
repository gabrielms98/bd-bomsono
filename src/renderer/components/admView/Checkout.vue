<template>
  <div>
    <v-container v-if="invoice">
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
                  <v-btn color="amber" @click="geraNF">Gerar Nota Fiscal</v-btn>
                  <v-btn flat>Cancel</v-btn>

                </v-stepper-content>

                <v-stepper-step :complete="e6 > 3" step="3">Finalizar Checkout</v-stepper-step>

                <v-stepper-content step="3">

                  <v-btn color="amber" @click="finaliza">FINALIZAR</v-btn>
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

    <v-container v-else>
      <v-layout row wrap justify-center id="wrapper">
        <v-flex  xs26 justify-center>
          <v-card>
            <body class="bodyclass">
              <header class="clearfix headerclass">
                <div class="divclass" id="logo">
                  <img src="../../../../static/logo.png">
                </div>
                <h1 class="h1class">NOTA FISCAL</h1>
                <div  id="company" class="clearfix divclass">
                  <div class="divclass" >Bom Sono</div>
                  <div class="divclass" ></div>
                  <div class="divclass" >(31) 96969-1313</div>
                  <div class="divclass" ><a class="aclass" href="mailto:gabriel.m.martins@ufv.br">hotel@bomsono.com.br</a></div class="divclass" >
                </div>
                <div class="divclass"  id="project">
                  <div class="divclass" ><span>HOTEL</span> </div>
                  <div class="divclass" ><span>CLIENTE</span> </div >
                </div class="divclass" >
              </header>
              <main>
                <table id="BATATA">
                  <thead>
                    <tr>
                      <th class="service">SERVICE</th>
                      <th class="desc">DESCRIPTION</th>
                      <th>PRICE</th>
                      <th>QTY</th>
                      <th>TOTAL</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td colspan="4" class="grand total">GRAND TOTAL</td>
                      <td class="grand total">R$ {{this.grand_total}}</td>
                    </tr>
                  </tbody>
                </table>
                <div class="divclass"  id="notices">
                  <div class="divclass" >NOTICE:</div>
                  <div class="notice divclass">A finance charge of 1.5% will be made on unpaid balances after 30 days.</div>
                </div class="divclass" >

                <v-flex xs12 sm8>
                  <v-spacer></v-spacer> <v-spacer></v-spacer>
                  <br>
                  <v-btn color="amber">PAGAR</v-btn>
                  <v-btn flat @click="invoice = !invoice">Voltar</v-btn>
                </v-flex>
              </main>
            </body>
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
    valor_total_diarias: '',
    nome_cliente: '',
    cliente_id: '',
    estadia_id: '',
    valor_total_conta: '',
    dialog: false,
    invoice: true,
    grand_total: 0
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
        if(estadia==null){remote.dialog.showMessageBox({type: 'warning', title: 'Estadia não encontrada!', message: 'Não foi possivel encontrar uma estadia relacionada a esse cliente!'}); return;}
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
    geraNF(){
      var index = 0;
      this.$backend.getAllConsumo(this.estadia_id, all_consumo => {
        all_consumo.forEach(consumo => {
          if(consumo.TipoServicoID!=null){
            this.$backend.getTipoServico(consumo.TipoServicoID, tipo => {
              var table = document.getElementById("BATATA");
              var row = table.insertRow(1 );
              var servico = row.insertCell(0);
              var descricao = row.insertCell(1);
              var preco = row.insertCell(2);
              var qnt = row.insertCell(3);
              var total = row.insertCell(4);

              this.grand_total += consumo.Preco;

              servico.innerHTML = tipo.Nome;
              descricao.innerHTML = "DESCRIÇÃO";
              preco.innerHTML = consumo.Preco;
              qnt.innerHTML = "1";
              total.innerHTML = consumo.Preco;
            })
          } else {
            var table = document.getElementById("BATATA");
            var row = table.insertRow(1);
            var servico = row.insertCell(0);
            var descricao = row.insertCell(1);
            var preco = row.insertCell(2);
            var qnt = row.insertCell(3);
            var total = row.insertCell(4);

            this.grand_total += consumo.Preco;

            servico.innerHTML = "Restaurante";
            descricao.innerHTML = "DESCRIÇÃO";
            preco.innerHTML = consumo.Preco;
            qnt.innerHTML = "1";
            total.innerHTML = consumo.Preco;
          }
        })
      })
      this.e6 = 3;
      this.invoice = !this.invoice;
    },
    finaliza() {
      this.$backend.desocupaApt(this.estadia_id, apt => {
        this.$backend.desocupa2(this.estadia_id, ap => {
          this.$backend.getTipoid(apt, tipo => {
            var qnt = parseInt(tipo.QntAp) + parseInt(1);
            this.$backend.addApOnTipo(apt, qnt, addtipo => {
              remote.dialog.showMessageBox({type: 'warning', title: 'Check-out!', message: 'Check-out realizado com sucesso!'});
              this.e6 =1;
            })
          })
        })
      })
    }
  }
}
</script>

<style lang="css">
.clearfix:after {
  content: "";
  display: table;
  clear: both;
}

.aclass {
  color: #5D6975;
  text-decoration: underline;
}

.bodyclass {
  position: relative;
  width: 21cm;
  height: 29.7cm;
  margin: 0 auto;
  color: #001028;
  background: #FFFFFF;
  font-family: Arial, sans-serif;
  font-size: 12px;
  font-family: Arial;
}

.headerclass {
  padding: 10px 0;
  margin-bottom: 30px;
}

#logo {
  text-align: center;
  margin-bottom: 10px;
}

#logo img {
  width: 90px;
}

.h1class {
  border-top: 1px solid  #5D6975;
  border-bottom: 1px solid  #5D6975;
  color: #5D6975;
  font-size: 2.4em;
  line-height: 1.4em;
  font-weight: normal;
  text-align: center;
  margin: 0 0 20px 0;
  background: url(../../../../static/dimension.png);
}

#project {
  float: left;
}

#project span {
  color: #5D6975;
  text-align: right;
  width: 52px;
  margin-right: 10px;
  display: inline-block;
  font-size: 0.8em;
}

#company {
  float: right;
  text-align: right;
}

#project .divclass,
#company .divclass {
  white-space: nowrap;
}

table {
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  margin-bottom: 20px;
}

table tr:nth-child(2n-1) td {
  background: #F5F5F5;
}

table th,
table td {
  text-align: center;
}

table th {
  padding: 5px 20px;
  color: #5D6975;
  border-bottom: 1px solid #C1CED9;
  white-space: nowrap;
  font-weight: normal;
}

table .service,
table .desc {
  text-align: left;
}

table td {
  padding: 20px;
  text-align: center;
}

table td.service,
table td.desc {
  vertical-align: top;
}

table td.unit,
table td.qty,
table td.total {
  font-size: 1.2em;
}

table td.grand {
  border-top: 1px solid #5D6975;;
}

#notices .notice {
  color: #5D6975;
  font-size: 1.2em;
}

footer {
  color: #5D6975;
  width: 100%;
  height: 30px;
  position: absolute;
  bottom: 0;
  border-top: 1px solid #C1CED9;
  padding: 8px 0;
  text-align: center;
}

.v-stepper__step__step .primary{
  background-color: #FFC200 !important;
  border-color: #FFC200 !important;
}
</style>
