<template>
  <div>
    <v-container>
      <v-layout row wrap justify-center id="wrapper">
        <v-flex  xs30 justify-center>
          <v-card>
            <v-toolbar dark color="amber">
              <v-toolbar-title> <h3>Lançar consumo do restaurante</h3></v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-spacer></v-spacer>
            <v-card-text>
              <v-form ref="form">
                <v-layout row wrap>
                  <v-flex xs12 sm5>
                    <v-text-field v-model="num_ap"   label="Numero do Apartamento"  type="number"  required  ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm5>
                    <v-text-field v-model="preco"   label="Preço"  type="number"  required  ></v-text-field>
                  </v-flex>
                </v-layout>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-btn color="amber" @click="addConsumo">CADASTRAR</v-btn>
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
    num_ap: '',
    preco: '',
    estadia_id: ''
  }),
  methods: {
    addConsumo(){
      this.$backend.getAptNum(this.num_ap, apt => {
        if(apt==null){return;}
        this.estadia_id = apt.EstadiaID;
        this.$backend.addConsumo({
          Preco: this.preco,
          EstadiaID: this.estadia_id,
          TipoServicoID: null,
          FuncionarioID: this.$cookie.get('cookie_user_session')
        }, consumo => {
          if(consumo==null){return;}
          console.log(this.preco)
          this.$backend.setValorTotal(this.estadia_id, this.preco, setval => { });
          remote.dialog.showMessageBox({type: 'warning', title: 'Consumo lançado!', message: 'O consumo do restaurante foi lançado com sucesso!'});
          this.clear();
          return;
        })
      })
    },
    clear(){
      this.$refs.form.reset();
    }
  }
}
</script>

<style lang="css">
</style>
