<template>
  <div v-if=logged>
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
          <template v-for="(item, i) in items">
            <v-layout
              v-if="item.heading"
              :key="i"
              row
              align-center
            >
              <v-flex xs6>
                <v-subheader v-if="item.heading">
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
              v-else
              :key="i"
              @click=""
            >
              <v-list-tile-action>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="grey--text">
                  {{ item.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-list>
      </v-navigation-drawer>
      <v-toolbar color="amber" app absolute clipped-left>
        <v-toolbar-side-icon @click.native="drawer = !drawer"flat icon><v-icon>room_service</v-icon></v-toolbar-side-icon>
        <span class="title ml-3 mr-5">Hotel Bom&nbsp;<span class="font-weight-light">Sono</span></span>
        <v-text-field
          solo-inverted
          flat
          hide-details
          label="Search"
          prepend-inner-icon="search"
        ></v-text-field>
        <v-btn @click="checkIfLogged" flat icon><v-icon>undo</v-icon></v-btn>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-content>
        <router-view></router-view>
      </v-content>
    </v-app>
  </div>

  <div v-else-if="login">
    <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="amber">
                <v-toolbar-title>Login form</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-tooltip bottom>
                  <v-btn slot="activator" @click="checkIfLogged">
                    <v-icon large>code</v-icon>
                  </v-btn>
                  <span>Ir para menu inicial</span>
                </v-tooltip>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field prepend-icon="person" name="login" label="Login" type="text"></v-text-field>
                  <v-text-field id="password" prepend-icon="lock" name="password" label="Password" type="password"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="amber">Login</v-btn>
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
  export default {
    data: () => ({
      drawer: null,
      items: [
        { icon: 'lightbulb_outline', text: 'Notes' },
        { icon: 'touch_app', text: 'Reminders' },
        { divider: true },
        { icon: 'archive', text: 'Archive' },
        { icon: 'delete', text: 'Trash' },
        { divider: true },
        { icon: 'settings', text: 'Settings' },
        { icon: 'chat_bubble', text: 'Trash' },
        { icon: 'help', text: 'Help' },
        { icon: 'phonelink', text: 'App downloads' },
        { icon: 'keyboard', text: 'Keyboard shortcuts' }
      ],
      logged: false,
      login: true
    }),
    props: {
      source: String
    },
    methods: {
      checkIfLogged: function(){
        this.logged = !this.logged;
        this.login = !this.login;
        console.log(this.$session.id());
        console.log(this.login);
      }
    },
    mounted: function(){
      var sqlite3 = require('sqlite3').verbose();
      var db = new sqlite3.Database(':memory:');

      db.serialize(function() {
        db.run("CREATE TABLE lorem (info TEXT)");

        var stmt = db.prepare("INSERT INTO lorem VALUES (?)");
        for (var i = 0; i < 10; i++) {
            stmt.run("Ipsum " + i);
        }
        stmt.finalize();

        db.each("SELECT rowid AS id, info FROM lorem", function(err, row) {
            console.log(row.id + ": " + row.info);
        });
      });

      db.close();

      console.log(this.logged);
      this.$session.start();
    }
  }
</script>

<style lang="stylus">
  #keep
    .v-navigation-drawer__border
      display: none
</style>
