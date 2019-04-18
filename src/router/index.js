import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home'
import EditProfile from '../components/profile/EditProfile'
import UploadDrugs from '../components/drugs manegment/UploadDrugs'
import DrugsList from '../components/drugs manegment/DrugsList.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    scrollBehavior (to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition
      }
      if (to.hash) {
        return {selector: to.hash}
      }
      return {x: 0, y: 0}
    },
    routes: [
      {
        path: '/',
        name: 'Home',
        component: Home
      },
      {
        path: '/edit-profile',
        name: 'EditProfile',
        component: EditProfile
      },
      {
        path: '/upload-new',
        name: 'UploadDrugs',
        component: UploadDrugs
      },
      {
        path: '/drugs-list',
        name: 'DrugsList',
        component: DrugsList
      }
    ]
  })
  