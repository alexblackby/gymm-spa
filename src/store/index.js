import Vue from 'vue'
import Vuex from 'vuex'

import actions from './actions'
import mutations from './mutations'
import getters from './getters'
import apiSync from './plugins/apiSync'
import autosaveTrainToLocalStorage from './plugins/autosaveTrainToLocalStorage'
import * as defaults from './defaults'
import utils from './../utils/utils'

Vue.use(Vuex)

let state = {
  authData: {
    token: false,
    userId: false,
    userEmail: false
  },
  trainHistory: [],
  historyIsLoading: false,
  historyIsLoaded: false,
  historyIsLoadedFully: false,
  ownTrainers: [],
  allTrainers: [],
  currentTrain: utils.cloneObject(defaults.emptyTrain),
  apiError: false
}


export default new Vuex.Store(
  {
    state,
    getters,
    mutations,
    actions,
    plugins: [
      autosaveTrainToLocalStorage,
      apiSync
    ]
  }
)
