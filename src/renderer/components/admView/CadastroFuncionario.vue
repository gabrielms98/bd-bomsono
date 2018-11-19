<template>
  <v-container>
    <v-layout row wrap justify-center id="wrapper">
      <v-flex xs30 justify-center>
        <v-card>
          <v-toolbar dark color="amber">
            <v-toolbar-title> <h3>Cadastro de funcionario</h3></v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-spacer></v-spacer>
          <v-card-text>
            <v-container grid-list-md>
              <v-form ref="form">
                <v-layout row wrap>
                  <v-flex xs12 sm6>
                    <v-text-field v-model="cadastro_user"   label="Usuario"  type="text"  required  ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6>
                    <v-text-field  v-model="cadastro_senha"    label="Senha"  type="password"  required  ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6>
                    <v-text-field  v-model="cadastro_email"  :rules="emailRules"  label="E-mail"  type="text"  required  ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6>
                    <v-text-field  v-model="cadastro_name"  :rules="nameRules"  :counter="40" label="Nome"  type="text"  required></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6>
                    <v-text-field  v-model="cadastro_rua"    label="Rua"  type="text"  required  ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6>
                    <v-text-field  v-model="cadastro_num"    label="Numero"  type="text"  required  ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6>
                    <v-text-field  v-model="cadastro_bairro"    label="Bairro"  type="text"  required  ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6>
                    <v-text-field  v-model="cadastro_cidade"    label="Cidade"  type="text"  required  ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6>
                    <v-text-field  v-model="cadastro_estado"    label="Estado"  type="text"  required  ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6>
                    <v-text-field  v-model="cadastro_cep"    label="CEP"  type="number"  required  ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6>
                    <v-text-field  v-model="cadastro_pais"    label="Nacionalidade"  type="text"  required  ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6>
                    <v-text-field  v-model="cadastro_telefone"    label="Telefone"  type="number"  required  ></v-text-field>
                  </v-flex>
                </v-layout>
              </v-form>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer><v-spacer></v-spacer>
            <v-btn :disabled="!valid" @click="submit">Cadastrar</v-btn>
            <v-btn @click="clear">clear</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    valid: true,
    nameRules: [
      v => !!v || 'Name is required',
      v => v.length <= 40 || 'Name must be less than 40 characters'
    ],
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+/.test(v) || 'E-mail must be valid'
    ],
    cadastro_user: '',
    cadastro_senha: '',
    cadastro_email: '',
    cadastro_name: '',
    cadastro_rua: '',
    cadastro_num: '',
    cadastro_bairro: '',
    cadastro_cidade: '',
    cadastro_estado: '',
    cadastro_cep: '',
    cadastro_pais: '',
    cadastro_telefone: '',
    user_session_id: '',
    adm: false,
    checkbox: false
  }),
  methods: {
    submit: function(){
      this.$backend.addCliente({
        Nome: this.cadastro_name,
        Num: this.cadastro_num,
        Rua: this.cadastro_rua,
        Bairro: this.cadastro_bairro,
        Cidade: this.cadastro_cidade,
        Estado: this.cadastro_estado,
        cep: this.cadastro_cep,
        Nacionalidade: this.cadastro_pais,
        Email: this.cadastro_email,
        Telefone: this.cadastro_telefone,
        Senha: this.cadastro_senha,
        usuario: this.cadastro_user,
        adm: 1
      }, (created) => {
        this.user_session_id = created.id;
        console.log(created.id);
      });
      this.cadastrar = false;
      this.login = true;
      this.clear();
    },
    clear: function(){
      this.$refs.form.reset();
    }
  }


}
</script>

<style lang="css">
</style>
