import * as defaults from "./defaults";
import * as types from "./mutationTypes"
import dataOps from '../utils/dataOps'
import utils from '../utils/utils'

let mutations = {

  [types.START_TRAIN](state, {id, createTime}) {
    state.currentTrain = utils.cloneObject(defaults.emptyTrain)
    state.currentTrain.id = id
    state.currentTrain.createTime = createTime
  },

  [types.START_TRAINER](state, {id, title, createTime}) {
    state.currentTrain.currentTrainer = utils.cloneObject(defaults.emptyTrainer)
    state.currentTrain.currentTrainer.id = id
    state.currentTrain.currentTrainer.title = title
    state.currentTrain.currentTrainer.createTime = createTime
  },

  [types.SET_CURRENT_TRAIN](state, {trainData}) {
    state.currentTrain = utils.cloneObject(trainData)
  },

  [types.ADD_CURRENT_TRAINER_SET](state, {set}) {
    state.currentTrain.currentTrainer.sets.push(set)
    state.currentTrain.currentTrainer.sets = dataOps.orderSets(state.currentTrain.currentTrainer.sets)
  },

  [types.DELETE_TRAINER_FROM_CURRENT_TRAIN](state, {trainerId}) {
    const index = state.currentTrain.trainers.findIndex(item => item.id === trainerId)
    state.currentTrain.trainers.splice(index, 1)
  },

  [types.DELETE_CURRENT_TRAINER_SET](state, {setNum}) {
    state.currentTrain.currentTrainer.sets.splice(setNum, 1)
    state.currentTrain.currentTrainer.sets = dataOps.orderSets(state.currentTrain.currentTrainer.sets)
  },

  [types.DELETE_TRAIN](state, {trainId}) {
    const index = state.trainHistory.findIndex(item => item.id === trainId)
    state.trainHistory.splice(index, 1)
  },

  [types.FINISH_CURRENT_TRAINER](state) {
    let ct = utils.cloneObject(state.currentTrain.currentTrainer)
    if (ct.id && ct.sets.length > 0) {
      state.currentTrain.trainers.push(ct)
    }
    state.currentTrain.currentTrainer = utils.cloneObject(defaults.emptyTrainer)
  },

  [types.FINISH_CURRENT_TRAIN](state) {
    if (state.currentTrain.trainers.length === 0) {
      state.currentTrain = utils.cloneObject(defaults.emptyTrain)
      return
    }
    let finishedTrain = dataOps.convertCurrentTrainForSaving(state.currentTrain)
    // try to find train with the same id in history and replace it
    let existingIndex = state.trainHistory.findIndex(item => item.id === finishedTrain.id)
    if (existingIndex !== -1) {
      state.trainHistory[existingIndex] = finishedTrain
    } else {
      state.trainHistory.unshift(finishedTrain)
    }
    state.currentTrain = utils.cloneObject(defaults.emptyTrain)
  },

  [types.INIT_ALL_TRAINERS_LIST](state, {allTrainers}) {
    state.allTrainers = dataOps.extractTrainerTitlesFromAllTrainers(allTrainers)
  },

  [types.ADD_TO_TRAIN_HISTORY](state, {historyItems}) {
    state.historyIsLoaded = true
    state.trainHistory = [...state.trainHistory, ...historyItems]
    state.ownTrainers = dataOps.extractTrainerTitlesFromHistory(state.trainHistory)
  },

  [types.SET_TRAIN_HISTORY_LOADING](state, {isLoading}) {
    state.historyIsLoading = isLoading
  },

  [types.SET_TRAIN_HISTORY_LOADED_FULLY](state) {
    state.historyIsLoadedFully = true
  },

  [types.MARK_CURRENT_TRAIN_SAVED](state, {isSaved}) {
    state.currentTrain.isSaved = isSaved
  },

  [types.SET_AUTH_DATA](state, {token, userId, userEmail}) {
    state.authData.token = token
    state.authData.userId = userId
    state.authData.userEmail = userEmail
  },

  [types.SET_API_ERROR](state, {hasError}) {
    state.apiError = hasError
  }
}

export default mutations
