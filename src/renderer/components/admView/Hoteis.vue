<template lang="html">
  <div class="">
    <v-container>
      <v-layout>
        <v-flex xs30>
          <v-card>
            <v-toolbar dark color="amber">
              <v-flex xs30 sm25>
                <v-toolbar-title> <h3>Lista de hoteis da franquia&nbsp</h3></v-toolbar-title>
              </v-flex>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-spacer></v-spacer>
            <v-card-text>
              <v-container>
                <v-flex xs12 sm12 v-for="item in items">
                  <v-card class="white--text back1">
                    <v-list-tile :to="item.go">
                      <v-flex xs12 sm7 class="text-xs-left">
                        <h3>{{item.nome}}</h3>
                      </v-flex>
                      <v-flex xs12 sm5 class="text-xs-right">
                        <v-icon v-for="i in item.estrelas" flat>star</v-icon>
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

    <v-container>
      <v-layout row wrap justify-center id="wrapper">
        <v-flex xs30 justify-center>
          <v-card>
            <v-toolbar dark color="amber">
              <v-toolbar-title> <h3>Adicionar Hotel</h3></v-toolbar-title>
              <v-btn icon @click="abreAdd" flat><v-icon >add</v-icon></v-btn>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-spacer></v-spacer>
            <v-card-text v-if="abre">
              <v-form ref="form">
                <v-layout row wrap>
                  <v-flex xs12 sm5>
                    <v-text-field v-model="nome_hotel"   label="Nome do hotel"  type="text"  required  ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm5>
                    <v-text-field v-model="endereco_hotel"   label="Endereço do hotel"  type="text"  required  ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm5>
                    <v-text-field v-model="estrelas_hotel"   label="Número de estrelas do hotel"  type="number"  required  ></v-text-field>
                  </v-flex>
                </v-layout>
              </v-form>
            </v-card-text>
            
            <v-card-actions v-if="abre">
              <v-spacer></v-spacer><v-spacer></v-spacer>
              <v-btn @click="submit" color="amber">Cadastrar</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  data: () => ({
    items: [],
    abre: false,
    nome_hotel: '',
    endereco_hotel: '',
    estrelas_hotel: 0
  }),
  methods: {
    getHoteis(){
      this.items = [];
      this.$backend.getAllHoteis(all_hoteis => {
        all_hoteis.forEach(hotelObj => {
          this.items.push({
            nome: hotelObj.Nome,
            estrelas: hotelObj.Estrelas,
            go: './ListaReservas'+hotelObj.id
          });
        });
      });
    },
    abreAdd(){
      this.abre = !this.abre;
    },
    submit(){
      this.$backend.addHotel({
        Nome: this.nome_hotel,
        Endereco: this.endereco_hotel,
        Estrelas: this.estrelas_hotel
      })
    },
  },
  
  mounted: function(){
    this.getHoteis();
  }
}
</script>

<style>
  .back1 {
    background-image: url(../../assets/bg.jpg);
    background-size: cover;
  }
</style>
