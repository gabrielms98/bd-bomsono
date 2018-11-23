<template lang="html">
  <div>
    <v-container>
      <v-layout row wrap justify-center id="wrapper">
        <v-flex xs30 justify-center>
          <v-card>
            <v-toolbar dark color="amber">
              <v-text-field  solo-inverted flat  hide-details  label="Nome Hotel"  prepend-inner-icon="search" v-model="nome_hotel"  @keyup.enter.native="getHotel"></v-text-field>
            </v-toolbar>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>

    <v-container>
      <v-layout row wrap justify-center id="wrapper">
        <v-flex xs30 justify-center>
          <v-card>
            <v-toolbar dark color="amber">
              <v-toolbar-title><h3> Apartamentos</h3></v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-spacer></v-spacer>
            <v-card-text v-if="hotel">
              <v-container grid-list-md>
                <v-layout row wrap>
                  <v-flex xs12 sm2 v-for="item in items" >
                    <v-card :color="item.cor" class="white--text" height="80" width="80">
                      <v-btn flat small class="white--text" fit>
                        <h4>&nbspAP<h1>{{item.num}}</h1></h4>
                      </v-btn>
                    </v-card>
                  </v-flex>
                </v-layout>
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
              <v-toolbar-title> <h3>Adicionar apartamento</h3></v-toolbar-title>
              <v-btn icon @click="abreAdd" flat><v-icon >add</v-icon></v-btn>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-spacer></v-spacer>
            <v-card-text v-if="abre">
              <v-form ref="form">
                <v-layout row wrap>
                  <v-flex xs12 sm5>
                    <v-text-field v-model="cadastro_numap"   label="Numero do Apartamento"  type="number"  required  ></v-text-field>
                  </v-flex>
                  &nbsp
                  <v-flex xs12 sm5>
                    <v-text-field v-model="cadastro_hotel"   label="Nome hotel"  type="text"  required  ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm5>
                    <v-text-field v-model="cadastro_casal"   label="Numero camas de casal"  type="number"  required  ></v-text-field>
                  </v-flex>
                  &nbsp
                  <v-flex xs12 sm5>
                    <v-text-field v-model="cadastro_solteiro"   label="Nome camas de solteiro"  type="number"  required  ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm4>
                    <v-checkbox label="Acessibilidade" v-model="cadastro_access"></v-checkbox>
                  </v-flex>
                  &nbsp
                  <v-flex xs12 sm4>
                    <v-checkbox label="Televisão" v-model="cadastro_tv"></v-checkbox>
                  </v-flex>
                  &nbsp
                  <v-flex xs12 sm3>
                    <v-checkbox label="Frigobar" v-model="cadastro_frigobar"></v-checkbox>
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
    hotel: false,
    hotel_id: '',
    nome_hotel: '',
    cadastro_frigobar: false,
    cadastro_tv: false,
    cadastro_access: false,
    cadastro_casal: '',
    cadastro_solteiro: '',
    cadastro_hotel: '',
    cadastro_numap: ''
  }),
  methods: {
    getApt(){
      this.items = [];
      this.$backend.getAllApt(this.hotel_id, all_apt => {
        all_apt.forEach(aptObj => {
          this.items.push({
            num: aptObj.NumeroAp,
            ocupado: aptObj.Ocupado,
            cor: aptObj.Ocupado == 1? "red" : "green"
          });
        });
      });
    },
    abreAdd(){
      this.abre = !this.abre;
    },
    submit(){
      this.$backend.getHotel(this.cadastro_hotel, hotel => {
        if(hotel == null){remote.dialog.showMessageBox({type: 'warning', title: 'hotel', message: ''}); this.clear(); return;}

        this.$backend.getTipo(this.cadastro_casal, this.cadastro_solteiro, this.cadastro_tv, this.cadastro_access, this.cadastro_frigobar, tipo => {
          if(tipo == null){remote.dialog.showMessageBox({type: 'warning', title: 'tipo', message: ''}); this.clear(); return;}
          this.$backend.addAp({
            NumeroAp: this.cadastro_numap,
            idTipos: tipo.id,
            EstadiaID: null,
            Ocupado: false,
            HotelID: hotel.id
          }, add => {
            if(add != null) {this.clear(); this.getApt(); this.$backend.addApOnTipo(tipo.id, tipo.QntAp+1);}
          });
        });
      });

    },
    clear(){
      this.$refs.form.reset();
    },

    getHotel(){
      this.$backend.getHotel(this.nome_hotel, hotelObj => {
        if(hotelObj==null){return;}
        this.hotel = !this.hotel;
        this.hotel_id = hotelObj.id;
        this.getApt();
      });
    }

  },
  mounted: function(){

  }

}
</script>

<style lang="css">
.v-btn {
  min-width: 0;
}
</style>
