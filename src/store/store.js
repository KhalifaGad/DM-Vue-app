import Vue from 'vue'
import Vuex from 'vuex'
import signupClientInfo from './modules/personalInfo'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    signupClientInfo
  }
})
