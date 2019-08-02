import Vue from 'vue'
import Vuex from 'vuex'
import signupClientInfo from './modules/personalInfo'
import signupStoreInfo from './modules/storeInfo'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    signupClientInfo,
    signupStoreInfo
  }
})
