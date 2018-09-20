import rest from '../utils/rest'
import apiQueue from '../utils/apiQueue'
import apiRoutes from './apiRoutes'
import store from '../store'
import auth from '../auth'
import * as types from '../store/mutationTypes'

let api = {}

api.init = function () {
  apiQueue.start()
  apiQueue.setAuthHeader(auth.getAuthHeader())
  rest.setAuthHeader(auth.getAuthHeader())
}

api.error = function () {
  store.dispatch('apiError')
}


api.putUserTrain = function ({train}) {
  const url = apiRoutes.path(apiRoutes.routes.userTrain, {userId: auth.getUserId(), trainId: train.id})
  const data = {createTime: train.createTime}
  apiQueue.add(url, 'PUT', data)
    .catch(api.error)
}

api.deleteUserTrain = function ({trainId}) {
  const url = apiRoutes.path(apiRoutes.routes.userTrain, {userId: auth.getUserId(), trainId: trainId})
  apiQueue.add(url, 'DELETE')
    .catch(api.error)
}

api.putUserTrainer = function ({trainId, trainer}) {
  const url = apiRoutes.path(apiRoutes.routes.userTrainer, {trainId: trainId, trainerId: trainer.id})
  apiQueue.add(url, 'PUT', trainer)
    .catch(api.error)
}

api.deleteUserTrainer = function ({trainId, trainerId}) {
  const url = apiRoutes.path(apiRoutes.routes.userTrainer, {trainId, trainerId})
  apiQueue.add(url, 'DELETE')
    .catch(api.error)
}


api.getUserTrainsHistory = function () {
  if (store.getters.historyIsLoading || store.getters.historyIsLoadedFully) {
    return
  }
  store.commit(types.SET_TRAIN_HISTORY_LOADING, {isLoading: true})

  const limit = 20
  const fromTime = store.getters.getTrainHistoryLastCreateTime

  let url = apiRoutes.path(apiRoutes.routes.userTrains, {userId: auth.getUserId()})
  url += '?limit=' + limit
  if (fromTime > 0) {
    url += '&fromTime=' + fromTime
  }

  rest.load(url)
    .then(responseData => {
      store.commit(types.SET_TRAIN_HISTORY_LOADING, {isLoading: false})
      store.dispatch("addToTrainHistory", {historyItems: responseData})
      if (responseData.length < limit) {
        store.commit(types.SET_TRAIN_HISTORY_LOADED_FULLY)
      }
    })
    .catch(error => {
      store.commit(types.SET_TRAIN_HISTORY_LOADING, {isLoading: false})
      store.dispatch('apiError')
    })
}


api.getAllTrainersList = function () {
  const url = apiRoutes.path(apiRoutes.routes.trainers)
  rest.loadAllPages(url)
    .then(responseData => store.dispatch("initAllTrainersList", {allTrainers: responseData}))
    .catch(error => store.dispatch('apiError'))
}

export default api
