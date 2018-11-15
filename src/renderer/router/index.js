import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hoteis',
      component: require('@/components/Hoteis.vue').default
    },
    {
      path: '/Apartamentos',
      name: 'Apartamentos',
      component: require('@/components/Apartamentos.vue').default
    },
    {
      path: '/CadastroFuncionario',
      name: 'CadastroFuncionario',
      component: require('@/components/CadastroFuncionario.vue').default
    },
    {
      path: '/addTiposApt',
      name: 'addTiposApt',
      component: require('@/components/addTiposApt.vue').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
