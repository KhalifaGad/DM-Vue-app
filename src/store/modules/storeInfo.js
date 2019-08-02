/* eslint-disable no-multi-spaces */
/* eslint-disable key-spacing */
const state = {
  areas: ['Smouha', 'Sidi Gaber', 'Al Agmy', 'Kafr Abdo', 'Roushdy'],
  selectedArea: 'Pick area',
  cities: ['Alexandria', 'Cairo', 'Swiss', 'South Sinai', 'Mansoura'],
  selectedCity: 'Pick city',
  storeName: ''
}

const getters = {
  getAreas:        state => state.areas,
  getSelectedArea: state => state.selectedArea,
  getCities:       state => state.cities,
  getSelectedCity: state => state.selectedCity,
  getStoreName:    state => state.storeName
}

const mutations = {
  addSingleArea:   (state, area)      => { state.areas.push(area) },
  resetAreas:      (state, areas)     => { state.areas = areas },
  setSelectedArea: (state, area)      => { state.selectedArea = area },
  addSingleCity:   (state, city)      => { state.cities.push(city) },
  resetCities:     (state, cities)    => { state.cities = cities },
  setSelectedCity: (state, city)      => { state.selectedCity = city },
  setStoreName:    (state, storeName) => { state.storeName = storeName }
}

const actions = {
  addSingleArea:   ({ commit }, area)      => { commit('addSingleArea', area) },
  resetAreas:      ({ commit }, areas)     => { commit('resetAreas', areas) },
  setSelectedArea: ({ commit }, area)      => { commit('setSelectedArea', area) },
  addSingleCity:   ({ commit }, city)      => { commit('addSingleCity', city) },
  resetCities:     ({ commit }, cities)    => { commit('resetCities', cities) },
  setSelectedCity: ({ commit }, city)      => { commit('setSelectedCity', city) },
  setStoreName:    ({ commit }, storeName) => { commit('setStoreName', storeName) }
}

export default {
  state,
  getters,
  mutations,
  actions
}
