<template lang="html">
  <v-container>
  <v-layout row wrap justify-center id="wrapper">
    <v-flex xs30 justify-center>
      <v-card>
        <v-toolbar dark color="amber">
          <v-toolbar-title><h3> Apartamentos</h3></v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-spacer></v-spacer>
        <v-card-text>
          <v-container grid-list-md>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer><v-spacer></v-spacer>
          <!--EXEMPLO DE COMO VAI SER O CARD DE CADA AP-->
            <v-flex xs12 sm2 v-for="item in items" >
             <v-card :color="item.cor" class="white--text">
               <v-card-title primary-title>
                 <div class="headline">&nbspAP&nbsp</div>
                 <div><h1>{{item.num}}</h1></div>
               </v-card-title>
               <v-card-actions>
                 <v-btn flat dark router >SELECIONAR</v-btn>
               </v-card-actions>
             </v-card>
           </v-flex>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</v-container>
</template>

<script>
export default {
  data: () => ({
    items: []
  }),
  methods: {
    getApt(){
      this.items = [];
      this.$backend.getAllApt(all_apt => {
        all_apt.forEach(aptObj => {
          console.log(aptObj.id);
          console.log(aptObj.NumeroAp);
          this.items.push({
            num: aptObj.NumeroAp,
            ocupado: aptObj.Ocupado,
            cor: aptObj.Ocupado == 1? "red" : "green"
          });
        });
      });
      console.log(this.items);
    }
  },
  mounted: function(){
    this.getApt();
  }

}
</script>

<style lang="css">
</style>
