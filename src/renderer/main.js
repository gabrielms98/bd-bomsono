import Vue from 'vue'
import axios from 'axios'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import VueSession from 'vue-session'
import backend from './backend'
import 'vuetify/dist/vuetify.min.css'

var VueCookie = require('vue-cookie');
Vue.use(VueCookie);


import App from './App'
import router from './router'
import store from './store'

Vue.use(backend)
Vue.use(VueSession, {
  persist: true
})
Vue.use(Vuetify, {
  theme: {
    primary: '#FFC200'
  }
})

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false;

/* eslint-disable no-new */
(function ignition(){
  if(backend.install.synced){
    new Vue({
      components: { App },
      router,
      store,
      template: '<App/>'
    }).$mount('#app')
  }
  else setTimeout(ignition, 5);
})();
