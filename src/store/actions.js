import * as types from "./mutationTypes"
import api from '../api'
import auth from '../auth/load'
import utils from '../utils/utils'
import uuid4 from 'uuid/v4'
import router from '../router'

let actions = {
  startTrain({commit, state}) {
    if (state.currentTrain.id) {
      return
    }
    commit(types.START_TRAIN,
      {
        id: uuid4(),
        createTime: utils.timeInSeconds()
      })
  },
  startTrainer({commit}, title) {
    commit(types.START_TRAINER, {id: uuid4(), title: title, createTime: utils.timeInSeconds()})
  },
  deleteTrainerFromCurrentTrain({commit}, trainerId) {
    commit(types.DELETE_TRAINER_FROM_CURRENT_TRAIN, {trainerId})
  },
  finishCurrentTrainer({commit}) {
    commit(types.FINISH_CURRENT_TRAINER)
  },
  finishCurrentTrain({commit}) {
    commit(types.FINISH_CURRENT_TRAINER)
    commit(types.FINISH_CURRENT_TRAIN)
  },
  addSet({commit}, set) {
    set.key = uuid4()
    commit(types.ADD_CURRENT_TRAINER_SET, {set})
  },
  deleteSet({commit, state}, setNum) {
    commit(types.DELETE_CURRENT_TRAINER_SET, {setNum})
  },
  deleteTrain({commit}, {trainId}) {
    commit(types.DELETE_TRAIN, {trainId})
  },
  init() {
    auth.load().then(function() {
      api.init()
      api.getUserTrainsHistory()
      api.getAllTrainersList()
    })
  },
  trainHistoryLoadNext() {
    api.getUserTrainsHistory()
  },
  addToTrainHistory({commit}, {historyItems}) {
    commit(types.ADD_TO_TRAIN_HISTORY, {historyItems})
  },
  initAllTrainersList({commit}, {allTrainers}) {
    commit(types.INIT_ALL_TRAINERS_LIST, {allTrainers})
  },
  loadAutosavedTrain({commit}, trainData) {
    console.log(trainData)
    commit(types.SET_CURRENT_TRAIN, {trainData})
    router.push({name: 'currentTrain'})
  },
  apiError({commit}) {
    commit(types.SET_API_ERROR, {hasError: true})
  }
}

export default actions
