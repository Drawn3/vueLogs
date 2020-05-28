import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    logsTask: [],
    searchingLogsTask: null,
  },
  mutations: {
    SET_LOGS: (state,data) => {
      state.logsTask = data
    },
    SET_SEARCHING_VALUE: (state, {searchVal, section}) =>{
      if(searchVal !== ''){
        return state.searchingLogsTask = state.logsTask.filter((item)=> item[section].indexOf(searchVal) !== -1)  
      }
    },
    SET_DEFAULT_LOGS: (state) =>{
      return state.searchingLogsTask = null
    }
  },
  actions: {
    async getLogsFromServer({commit}){
      try{
          const response = await axios({
            method: 'GET',
            url: 'http://docker.dev.ktotam.info:1505/SysLog?parameters={}',
            headers:{'accept': 'application/json'},
          });
          commit('SET_LOGS', response.data.RegisteredMessages)
          return  response.data.RegisteredMessages
      } catch (error) {
          console.error(error);
      }
    },
    searchingInfoLogs({commit}, searchObj){
      commit("SET_SEARCHING_VALUE", searchObj)
    },
    logsLengthAll({commit}, e){
      commit("SET_NEW_LENGTH_LOGS",e)
    },
    resetSearchLogs({commit}){
      commit("SET_DEFAULT_LOGS")
    }
  },
  getters:{
    logsTasker(state){
      return state.logsTask
    },
    logsTaskerAll(state){
      return state.logsTask.length
    },
    getFilteredLogs(state){
      return state.searchingLogsTask
    }
  },
  modules: {
  }
})
