import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = {
  state: {
    currentSBComponent: 'MainMenu',
  },
  mutations: {
    setCurrentSBComponent: (state, newComponent) => (state.currentSBComponent = newComponent),
  },
  actions: {
    setCurrentSBComponent: ({ commit }, newComponent) => commit('setCurrentSBComponent', newComponent),
  },
  getters: {
    currentSBComponent: state => state.currentSBComponent,
  },
};

export default new Vuex.Store(store);
