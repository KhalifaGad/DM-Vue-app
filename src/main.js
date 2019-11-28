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
import vueResource from 'vue-resource'
import { apolloProvider } from './apolloConfig'
import VueHtmlToPaper from 'vue-html-to-paper';

export const eventBus = new Vue({
  methods: {
    closeOrderModal(){
      this.$emit('closeOrderModal', false)
    },
    closeProfileModal(){
      this.$emit('closeProfileModal', false)
    },
    closeDrugModal(){
      this.$emit('closeDrugModal', false)
    }
  }
})

const options = {
  name: '_blank',
  specs: [
    'fullscreen=yes',
    'titlebar=yes',
    'scrollbars=yes'
  ],
  styles: [
    '/src/assets/css/orderStyle.css'
  ]
}

Vue.use(VueHtmlToPaper, options);

Vue.component('v-select', vSelect)
locale.use(lang)
Vue.use(ElementUI)
Vue.use(VueDataTables)
Vue.use(require('vue-shortkey'))
Vue.use(vueResource)

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  store,
  router,
  apolloProvider,
  render: h => h(App)
})
