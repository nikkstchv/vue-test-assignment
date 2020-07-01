import Vue from 'vue'
import Vuex from 'vuex'
import { emulateGetRequest, emulateDeleteRequest } from './request'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    items: [], // items from JSON
    errorFromServer: false, // error loading data from JSON
    loaded: false, // sets if JSON data loaded
    errorDeleting: false
  },
  mutations: {
    setitems(state, payload) {
      state.items = payload;
    },
    setError(state, payload) {
      state.errorFromServer = payload;
    },
    setLoaded(state, payload) {
      state.loaded = payload;
    },
    deleteitems(state, payload) {
      state.items.splice(payload, 1);
    },
    setDeletingError(state, payload) {
      state.errorDeleting = payload;
    }
  },
  actions: {
    getitems({ commit }) {
      emulateGetRequest()
        .then((success) => {
          commit('setitems', success);
          commit('setLoaded', true);
          commit('setError', false);
        })
        .catch(() => {
          commit('setError', true );
          commit('setLoaded', true);
        })
    },
    deleteitems({ commit, state }, payload) {
      emulateDeleteRequest()
        .then(() => {
          // if we want to delete several items
          if (toString.call(payload) === '[object Array]') {
            for (let i = 0; i < payload.length; i++) {
              for (let j = 0; j < state.items.length; j++) {
                if (state.items[j].id === payload[i].id) {
                  commit("deleteitems", j);
                }
              }
            }
          }
          // delete one product
          else if (toString.call(payload) === '[object Object]') {
            for (let j = 0; j < state.items.length; j++) {
              if (state.items[j].id === payload.id) {
                commit("deleteitems", j)
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
