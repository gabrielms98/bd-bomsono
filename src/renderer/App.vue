<template>
  <div v-if="cadastrar">
    <v-app id="inpire">
      <v-content>
        <v-container fluid fill-height>
          <v-layout row wrap justify-center id="wrapper">
            <v-flex xs10 justify-center>
              <v-card>
                <v-toolbar dark color="amber">
                  <v-toolbar-title> Cadastro de usuário</v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-btn @click="home" flat icon><v-icon>undo</v-icon></v-btn>
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
      </v-content>
    </v-app>
  </div>

  <div v-else-if="this.session">
    <v-app id="keep">
      <v-navigation-drawer
        v-model="drawer"
        fixed
        clipped
        class="grey lighten-4"
        app
      >
        <v-list
          dense
          class="grey lighten-4"
        >
          <template v-if="!adm" v-for="(item, i) in itemsCLIENTE">
            <v-layout
              v-if="item.heading"
              :key="i"
              row
              align-center
            >
              <v-flex xs6>
                <v-subheader v-if="item.heading ">
                  {{ item.heading }}
                </v-subheader>
              </v-flex>
              <v-flex xs6 class="text-xs-right">
                <v-btn small flat>edit</v-btn>
              </v-flex>
            </v-layout>
            <v-divider
              v-else-if="item.divider"
              :key="i"
              dark
              class="my-3"
            ></v-divider>
            <v-list-tile
              v-else-if="item.adm=true"
              :key="i"
              :to="item.to"
            >
              <v-list-tile-action>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content >
                <v-list-tile-title class="grey--text">
                  {{ item.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
          <template v-if="adm" v-for="(item, i) in itemsADM">
            <v-layout
              v-if="item.heading"
              :key="i"
              row
              align-center
            >
              <v-flex xs6>
                <v-subheader v-if="item.heading ">
                  {{ item.heading }}
                </v-subheader>
              </v-flex>
              <v-flex xs6 class="text-xs-right">
                <v-btn small flat>edit</v-btn>
              </v-flex>
            </v-layout>
            <v-divider
              v-else-if="item.divider"
              :key="i"
              dark
              class="my-3"
            ></v-divider>
            <v-list-tile
              v-else-if="item.adm=true"
              :key="i"
              :to="item.to"
            >
              <v-list-tile-action>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content >
                <v-list-tile-title class="grey--text">
                  {{ item.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
          <br></br>
          <v-flex xs8 class="text-xs-right">
            <v-btn class="grey--text" @click="Logout">LOGOUT</v-btn>
          </v-flex>
        </v-list>
      </v-navigation-drawer>
      <v-toolbar color="amber" app absolute clipped-left>
        <v-toolbar-side-icon @click.native="drawer = !drawer"flat icon><v-icon>menu</v-icon></v-toolbar-side-icon>
        <span class="title ml-3 mr-5">Hotel Bom&nbsp;<span class="font-weight-light">Sono</span></span>
        <v-text-field
          solo-inverted
          flat
          hide-details
          label="Search"
          prepend-inner-icon="search"
        ></v-text-field>
        <!--TIRAR ESSE BOTAO QUANDO TERMINAR O PROJETO-->
        <!-- <v-btn @click="Logout" flat icon><v-icon>undo</v-icon></v-btn> -->
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-content>
        <router-view></router-view>
      </v-content>
    </v-app>
  </div>

  <div v-else-if="!this.session">
    <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="amber">
                <v-toolbar-title>Login</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-tooltip bottom>
                  <!--TIRAR ESSE BOTAO QUANDO TERMINAR O PROJETO-->
                  <!-- <v-btn slot="activator" @click="Logout" flat>
                    <v-icon icon>undo</v-icon>
                  </v-btn> -->
                  <span>Ir para menu inicial</span>
                </v-tooltip>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field v-model="username" prepend-icon="person" name="login" label="Login" type="text"></v-text-field>
                  <v-text-field v-model="pwd" id="password" prepend-icon="lock" name="password" label="Password" type="password"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="amber" @click="register">Cadastrar</v-btn>
                <v-btn color="amber" @click="Login">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
  </div>

</template>



<script>
import { remote } from 'electron'
export default {
  data: () => ({
    drawer: null,
    itemsADM: [
      { icon: 'domain', text: 'Hotéis', to: '/' },
      { icon: 'hotel', text: 'Apartamentos', to: '/Apartamentos'},
      { divider: true },
      { icon: 'account_circle', text: 'Clientes', to: '' },
      { icon: 'attach_money', text: 'Contas', to: '' },
      { divider: true },
      { icon: 'restaurant', text: 'Restaurante', to: ''},
      { icon: 'local_laundry_service', text: 'Lavanderia', to: '' },
      { icon: 'room_service', text: 'Serviços de quarto', to: '' },
      { divider: true },
      { icon: 'person_add', text: 'Cadastrar funcionario', to: '/CadastroFuncionario'}
    ],
    itemsCLIENTE: [
      { icon: 'domain', text: 'Hotéis', to: '/' },
      { divider: true },
      { icon: 'attach_money', text: 'Contas', to: '' },
      { divider: true },
      { icon: 'restaurant', text: 'Restaurante', to: '' },
      { icon: 'local_laundry_service', text: 'Lavanderia', to: '' },
      { icon: 'room_service', text: 'Serviços de quarto', to: '' },
    ],
    logged: false,
    login: true,
    username: '',
    pwd: '',
    session: '',
    cadastrar: false,
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
    sair: '/'
  }),
  props: {
    source: String
  },
  methods: {
    Logout: function(){
      this.logged = !this.logged;
      this.login = !this.login;
      this.adm = false;
      this.$session.destroy();
      this.session = this.$session.exists();
      this.$cookie.delete('cookie_user_session');
      this.$cookie.delete('cookie_adm');
      console.log("logout adm: "+this.adm);
      console.log("session: "+this.session);
    },
    Login: function(){
      let result = this.$backend.checkLogin(this.username, this.pwd, (usuario) => {
        if(usuario==null){
          remote.dialog.showMessageBox({type: 'warning', title: 'Falha ao fazer login!', message: 'Certifique que login e senha estão corretos!'});
          return;
        }
        this.user_session_id = usuario.id;
        this.login = !this.login;
        this.logged = !this.logged;
        this.cadastrar = false;
        this.$session.start();
        this.session = this.$session.exists();
        this.admCheck(usuario.id);
      });
    },
    register: function(){
      console.log(this.$session.exists());
      this.cadastrar = true;
      this.session = this.$session.exists();
      this.login = !this.login;
    },
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
        adm: 0
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
    },
    home: function(){
      this.cadastrar = false;
      this.login = true;
    },
    admCheck: function(user_id){
      this.$backend.admCheck(user_id, (cliente) => {
        if(cliente==null){this.adm = false; return;}
        this.adm = true;
      });
    }
  },
  mounted: function(){
    this.$cookie.set('cookie_adm', this.adm , 1);
    this.$cookie.set('cookie_user_session', this.user_session_id, 1);
    this.session = this.$session.exists();
    this.adm = this.$cookie.get('cookie_adm')
    this.user_session_id = this.$cookie.get('cookie_user_session');
    console.log(this.$cookie.get('cookie_user_session'));
  }
}
</script>

<style lang="stylus">
  #keep
    .v-navigation-drawer__border
      display: none
</style>
