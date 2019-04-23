import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'vue-ionicons/ionicons.css'
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css'
import ElementUI from 'element-ui'
import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'
import VueDataTables from 'vue-data-tables'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store/store'

Vue.component('v-select', vSelect)
locale.use(lang)
Vue.use(ElementUI)
Vue.use(VueDataTables)
Vue.use(require('vue-shortkey'))

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
