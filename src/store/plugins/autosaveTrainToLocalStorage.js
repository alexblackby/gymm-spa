/*
Автосохранение текущей тренировки в localStorage - на случай обновления вкладки.
Сохраненная тренировка считается валидной только в пределах lsExpires-секунд, иначе игнорируется
*/

import ls from 'local-storage'
import utils from '../../utils/utils'


const lsKey = 'currentTrain'
const lsExpires = 3600
const autosaveTrainToLocalStorage = store => {
  let savedTrain = ls.get(lsKey)
  if (savedTrain) {
    if (savedTrain.createTime > (utils.timeInSeconds() - lsExpires)
      && (savedTrain.trainers.length > 0 || savedTrain.currentTrainer.sets.length > 0)) {
      store.dispatch('loadAutosavedTrain', savedTrain)
    }
    ls.remove(lsKey)
  }
  store.subscribe((mutation, state) => {
    if (state.currentTrain.id) {
      ls.set(lsKey, state.currentTrain)
    } else {
      ls.remove(lsKey)
    }
  })
}

export default autosaveTrainToLocalStorage
