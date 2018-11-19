import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Inicio',
      component: require('@/components/Inicio.vue').default
    },
    {
      path: '/HoteisAdm',
      name: 'HoteisAdm',
      component: require('@/components/admView/Hoteis.vue').default
    },
    {
      path: '/HoteisCliente',
      name: 'HoteisCliente',
      component: require('@/components/clienteView/Hoteis.vue').default
    },
    {
      path: '/Apartamentos',
      name: 'Apartamentos',
      component: require('@/components/admView/Apartamentos.vue').default
    },
    {
      path: '/CadastroFuncionario',
      name: 'CadastroFuncionario',
      component: require('@/components/admView/CadastroFuncionario.vue').default
    },
    {
      path: '/addTiposApt',
      name: 'addTiposApt',
      component: require('@/components/admView/addTiposApt.vue').default
    },
    {
      path: '/Reserva:id',
      name: 'Reserva',
      component: require('@/components/clienteView/Reserva.vue').default,
      props: true
    },
    {
      path: '/ListaReservas:id',
      name: 'ListaReservas',
      component: require('@/components/admView/ReservasHotel.vue').default,
      props: true
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
