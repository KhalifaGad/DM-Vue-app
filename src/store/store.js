import Vue from 'vue'
import Vuex from 'vuex'
import signupClientInfo from './modules/signup'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    signupClientInfo
  }
})
