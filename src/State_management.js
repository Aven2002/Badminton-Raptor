import { createStore } from 'vuex';
import axios from 'axios';
import Cookies from 'js-cookie';

const store = createStore({
  state() {
    return {
      isAdmin: false,
    };
  },
  mutations: {
    setIsAdmin(state, value) {
      state.isAdmin = value;
    },
  },
  actions: {
    async fetchUserRole({ commit }) {
      try {
        const userID = Cookies.get('userID');
        if (!userID) {
          commit('setIsAdmin', false);
          return;
        }

        const response = await axios.get(`http://localhost:3000/api/account/${userID}/role`);
        commit('setIsAdmin', response.data.userRole === 'Admin');
      } catch (error) {
        console.error('Error fetching user role:', error);
        commit('setIsAdmin', false);
      }
    },
  },
  getters: {
    isAdmin(state) {
      return state.isAdmin;
    },
  },
});

export default store;
