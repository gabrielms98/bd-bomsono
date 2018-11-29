<template>
  <div>
    <v-container>
      <v-layout row wrap justify-center id="wrapper">
        <v-flex  xs30 justify-center>
          <v-card>
            <v-toolbar dark color="amber">
              <v-toolbar-title> <h3>Consumo Serviços de quarto</h3></v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-spacer></v-spacer>
            <v-card-text>
              <v-form ref="form">
                <v-layout row wrap>
                  <v-flex xs12 sm2>
                    <v-text-field v-model="num_ap"   label="AP"  type="number"  required  ></v-text-field>
                  </v-flex>
                  &nbsp
                  <v-flex xs12 sm4>
                    <v-text-field v-model="funcionario"   label="Nome Funcionário"  type="text"  required  ></v-text-field>
                  </v-flex>
                  &nbsp
                  <v-flex xs12 sm4>
                    <v-text-field v-model="servico"   label="Serviço"  type="text"  required  ></v-text-field>
                  </v-flex>
                </v-layout>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-btn color="amber" @click="lancaConsumo">CADASTRAR</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>

    <v-container>
      <v-layout row wrap justify-center id="wrapper">
        <v-flex  xs30 justify-center>
          <v-card>
            <v-toolbar dark color="amber">
              <v-toolbar-title> <h3>Adicionar serviço ao catálogo</h3></v-toolbar-title>
              <v-btn flat @click="add = !add"><v-icon>add</v-icon></v-btn>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-spacer></v-spacer>
            <v-card-text v-if="add">
              <v-form ref="form">
                <v-layout row wrap>
                  <v-flex xs12 sm3>
                    <v-text-field v-model="c_nome"   label="Nome"  type="text"  required  ></v-text-field>
                  </v-flex>
                  &nbsp
                  <v-flex xs12 sm3>
                    <v-text-field v-model="c_preco"   label="Preço"  type="number"  required  ></v-text-field>
                  </v-flex>
                </v-layout>
              </v-form>
            </v-card-text>
            <v-card-actions v-if="add">
              <v-btn color="amber" @click="cadastrar">CADASTRAR</v-btn>
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
    add: false,
    c_nome: '',
    c_preco: '',
    num_ap: '',
    funcionario: '',
    servico: '',
    tipo: 'Lavanderia',
    preco: '',
    id_tipo: '',
    estadia_id: ''
  }),
  methods: {
    lancaConsumo(){
      this.$backend.getProduto(this.servico, this.tipo, prod => {
        this.preco = prod.Preco;
        this.id_tipo = prod.id;
        this.$backend.getAptNum(this.num_ap, apt => {
          this.estadia_id = apt.EstadiaID;
          this.$backend.addConsumo({
            Preco: this.preco,
            EstadiaID: this.estadia_id,
            TipoServicoID: this.id_tipo,
            FuncionarioID: this.$cookie.get('cookie_user_session')
          }, consumo => {
            if(consumo==null){return;}
            this.$backend.setValorTotal(this.estadia_id, this.preco, setval => { });
            remote.dialog.showMessageBox({type: 'warning', title: 'Consumo lançado!', message: 'O consumo foi lançado com sucesso!'});
            this.clear();
          })
        })
      })
    },
    clear(){
      this.$refs.form.reset();
    },
    cadastrar(){
      this.$backend.addProduto({
        Tipo: this.tipo,
        Nome: this.c_nome,
        Preco: this.c_preco
      }, prod => {
        remote.dialog.showMessageBox({type: 'warning', title: 'Serviço cadastrado!', message: 'O serviço foi cadastrado no banco de dados!'});
        this.clear();
      })
    }
  }
}
</script>

<style lang="css">
</style>
