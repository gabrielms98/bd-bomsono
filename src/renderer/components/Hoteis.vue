<template lang="html">
  <div class="">
    <v-container>
      <v-layout>
        <v-flex xs30>
          <v-card>
            <v-toolbar dark color="amber">
              <v-toolbar-title> <h3>Lista da hoteis da franquia</h3></v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-spacer></v-spacer>
            <v-card-text>
              <v-container>
                <v-flex xs12 sm12 v-for="item in items">
                  <v-card class="white--text back1">
                    <v-list-tile>
                      <v-flex xs12 sm7 class="text-xs-left">
                        <h3>{{item.nome}}</h3>
                      </v-flex>
                      <v-flex xs12 sm5 class="text-xs-right">
                        <v-icon v-for="i in item.estrelas">star</v-icon>
                      </v-flex>
                    </v-list-tile>
                  </v-card>
                  <br>
                </v-flex>
              </v-container>
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
    items: []
  }),
  methods: {
    getApt(){
      this.items = [];
      this.$backend.getAllHoteis(all_hoteis => {
        all_hoteis.forEach(hotelObj => {
          console.log(hotelObj.Nome);
          this.items.push({
            nome: hotelObj.Nome,
            estrelas: hotelObj.Estrelas
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

<style>
  .back1 {
    background-image: url(../assets/bg.jpg);
    background-size: cover;
  }
</style>
