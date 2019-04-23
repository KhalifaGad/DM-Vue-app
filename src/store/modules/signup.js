const state = {
  fName: '',
  lName: '',
  phone: '',
  email: ''
}

const getters = {
  getFName: state => state.fName,
  getLName: state => state.lName,
  getPhone: state => state.phone,
  getEmail: state => state.email
}

const mutations = {
  setFName: (state, fName) => { state.fName = fName },
  setLName: (state, lName) => { state.lName = lName },
  setPhone: (state, phone) => { state.phone = phone },
  setEmail: (state, email) => { state.email = email }
}

const actions = {
  setFName: ({ commit }, fName) => commit('setFName', fName),
  setLName: ({ commit }, lName) => commit('setLName', lName),
  setPhone: ({ commit }, phone) => commit('setPhone', phone),
  setEmail: ({ commit }, email) => commit('setEmail', email)
}

export default {
  state,
  getters,
  mutations,
  actions
}
