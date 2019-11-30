import Vue from 'vue'
import Router from 'vue-router'
import Header from '../components/shared/Header.vue'
import Footer from '../components/shared/Footer.vue'
import Home from '../views/Home'
import Profiles from '../views/Profiles.vue'
import DrugsList from '../views/DrugsList.vue'
import OrderList from '../views/OrderList.vue'
import Login from '../components/Login.vue'
import Signup from '../components/signup/Signup.vue'
import DrugActions from "../views/DrugActions.vue"

Vue.use(Router)

export default new Router({
  mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    if (to.hash) {
      return {
        selector: to.hash
      }
    }
    return {
      x: 0,
      y: 0
    }
  },
  routes: [{
    path: '/',
    name: 'Home',
    components: {
      header: Header,
      main: Home,
      footer: Footer
    }
  },
  {
    path: '/profiles',
    name: 'Profiles',
    components: {
      header: Header,
      main: Profiles,
      footer: Footer
    }
  },
  {
    path: '/drugs-list',
    name: 'DrugsList',
    components: {
      header: Header,
      main: DrugsList,
      footer: Footer
    }
  },
  {
    path: '/drug-actions',
    name: 'DrugsList',
    components: {
      header: Header,
      main: DrugActions,
      footer: Footer
    }
  },
  {
    path: '/orders-list',
    name: 'OrderList',
    components: {
      header: Header,
      main: OrderList,
      footer: Footer
    }
  },
  {
    path: '/orders-list/pending',
    name: 'PendingOrderList',
    components: {
      header: Header,
      main: OrderList,
      footer: Footer
    }
  },
  {
    path: '/orders-list/active',
    name: 'ActiveOrderList',
    components: {
      header: Header,
      main: OrderList,
      footer: Footer
    }
  },
  {
    path: '/login',
    name: 'Login',
    components: {
      login: Login
    }
  },
  {
    path: '/signup',
    name: 'Signup',
    components: {
      signup: Signup
    }
  }
  ]
})
