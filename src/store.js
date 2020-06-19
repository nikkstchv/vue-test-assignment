import Vue from 'vue'
import Vuex from 'vuex'
import { emulateGetRequest, emulateDeleteRequest } from './request'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [], // products from JSON
    errorFromServer: false, // error loading data from JSON
    loaded: false, // sets if JSON data loaded
    errorDeleting: false
  },
  mutations: {
    setProducts(state, payload) {
      state.products = payload;
    },
    setError(state, payload) {
      state.errorFromServer = payload;
    },
    setLoaded(state, payload) {
      state.loaded = payload;
    },
    deleteProducts(state, payload) {
      state.products.splice(payload, 1);
    },
    setDeletingError(state, payload) {
      state.errorDeleting = payload;
    }
  },
  actions: {
    getProducts({ commit }) {
      emulateGetRequest()
        .then((success) => {
          commit('setProducts', success);
          commit('setLoaded', true);
          commit('setError', false);
        })
        .catch(() => {
          commit('setError', true );
          commit('setLoaded', true);
        })
    },
    deleteProducts({ commit, state }, payload) {
      emulateDeleteRequest()
        .then(() => {
          // if we want to delete several products
          if (toString.call(payload) === '[object Array]') {
            for (let i = 0; i < payload.length; i++) {
              for (let j = 0; j < state.products.length; j++) {
                if (state.products[j].id === payload[i].id) {
                  commit("deleteProducts", j);
                }
              }
            }
          }
          // delete one product
          else if (toString.call(payload) === '[object Object]') {
            for (let j = 0; j < state.products.length; j++) {
              if (state.products[j].id === payload.id) {
                commit("deleteProducts", j)
              }
            }
          }
        })
        .catch(() => {
          commit("setDeletingError", true);
        });
    }
  }
})
