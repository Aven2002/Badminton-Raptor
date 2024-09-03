import { createStore } from 'vuex';
import axios from 'axios';
import Cookies from 'js-cookie';

export default createStore({
  state() {
    return {
      userID: Cookies.get('userID') === 'null' ? null : Cookies.get('userID'),
      userRole: Cookies.get('userRole') || 'Visitor',
    };
  },
  getters: {
    isAdmin(state) {
      return state.userRole === 'Admin';
    },
    userID(state) {
      return state.userID;
    },
    userRole(state) {
      return state.userRole;
    }
  },
  mutations: {
    SET_USER_ID(state, userID) {
      state.userID = userID;
      Cookies.set('userID', userID, { expires: 7 }); // Set cookie for 7 days
    },
    SET_USER_ROLE(state, userRole) {
      state.userRole = userRole;
      Cookies.set('userRole', userRole, { expires: 7 }); // Set cookie for 7 days
    }
  },
  actions: {
    async fetchUserRole({ state, commit }) {
      if (state.userID === null) { // Check if userID is null 
        console.error('No userID found.');
        return;
      }
      try {
        const response = await axios.get(`http://localhost:3000/api/account/${state.userID}/role`);
        commit('SET_USER_ROLE', response.data.userRole);
      } catch (error) {
        console.error('Error fetching user role:', error);
      }
    },
    setUserID({ commit }, userID) {
      commit('SET_USER_ID', userID);
      if (userID) {
        this.dispatch('fetchUserRole'); // Fetch role when userID is set
      }
    },
    setUserRole({ commit }, userRole) {
      commit('SET_USER_ROLE', userRole);
    }
  }
});
