<template lang="html">
  <body class="bodyclass">
    <header class="clearfix headerclass">
      <div id="logo">
        <img src="../../../../static/logo.png">
      </div>
      <h1 class="h1class">NOTA FISCAL</h1>
      <div id="company" class="clearfix">
        <div>Bom Sono</div>
        <div>{{this.end_hotel}}</div>
        <div>(31) 96969-1313</div>
        <div><a class="aclass" href="mailto:gabriel.m.martins@ufv.br">hotel@bomsono.com.br</a></div>
      </div>
      <div id="project">
        <div><span>HOTEL</span> {{this.nome_hotel}}</div>
        <div><span>CLIENTE</span>{{this.nome_cliente}} </div>
      </div>
    </header>
    <main>
      <!--FAZER COM V-DATA-TABLE -->
      <table id="invoice">
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
          <!-- <tr v-for="i in all_consumo">
            <td class="service">{{i.servico}}</td>
            <td class="desc"></td>
            <td class="unit">{{i.preco}}</td>
            <td class="qty">1</td>
            <td class="total">{{i.preco}}</td>
          </tr> -->
          <tr>
            <td colspan="4" class="grand total">GRAND TOTAL</td>
            <td class="grand total">{{this.preco_total}}</td>
          </tr>
        </tbody>
      </table>
      <br>
      <v-flex v-for="i in all_consumo">{{i.preco}}</v-flex>
      <div id="notices">
        <div>NOTICE:</div>
        <div class="notice">A finance charge of 1.5% will be made on unpaid balances after 30 days.</div>
      </div>
    </main>
    <footer>
      Invoice was created on a computer and is valid without the signature and seal.
    </footer>
  </body>
</template>

<script>
export default {
  data: () => ({
    end_hotel: '',
    nome_hotel: '',
    nome_cliente: '',
    cliente_id: '',
    hotel_id: '',
    email_cliente: '',
    ap_id: '',
    all_consumo: [],
    preco_total: 0,
    entrada: '',
    saida: '',
    estadia_id: ''
  }),
  props: {
    rid: {
      default: -1
    }
  },
  mounted: function(){
    var table = document.getElementById("invoice");
    var index = 1;
    this.$backend.getAllConsumo(this.rid, all_consumo => {
      all_consumo.forEach(consumoObj => {
        this.all_consumo.push({
          preco: consumoObj.Preco
        })
      })
    })
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

#project div,
#company div {
  white-space: nowrap;
}
</style>
