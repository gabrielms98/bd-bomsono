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
             <v-card :color="item.cor" class="white--text" height="100" width="130">
               <v-btn flat>
                 <v-card-title primary-title>
                   <h4>&nbsp&nbsp&nbsp&nbsp&nbspAP</h4>
                   <div><h1>{{item.num}}</h1></div>
                 </v-card-title>
              </v-btn>
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
          this.items.push({
            num: aptObj.NumeroAp,
            ocupado: aptObj.Ocupado,
            cor: aptObj.Ocupado == 1? "red" : "green"
          });
        });
      });
    }
  },
  mounted: function(){
    this.getApt();
  }

}
</script>

<style lang="css">
</style>
