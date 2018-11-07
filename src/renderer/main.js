import Vue from 'vue'
import axios from 'axios'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import VueSession from 'vue-session'


import App from './App'
import router from './router'
import store from './store'

Vue.use(VueSession)
Vue.use(Vuetify, {
<<<<<<< HEAD
    iconfont: 'mdi'
=======
  iconfont: 'mdi'
>>>>>>> b4b9e44aa8dea9b41b2025d09bbcb9c284196dad
})

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
