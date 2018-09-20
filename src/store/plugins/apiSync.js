/*
Возможные состояния данных тренировки:

Начата новая тренировка
- ничего не сохраняем на сервере

Начато новое упражнение
- ничего не сохраняем на сервере

Добавлен сет в текущее упражнение
- проверяем сохранена ли тренировка и если нет - сохраняем сначала тренировку
- сохраняем упражнение (оно сохраняется вместе со всеми сетами сразу)

Удален сет из текущего упражнения
- проверяем остались ли в упражнении сеты после удаления этого сета - если нет то удаляем текущее упражнение с сервера
- (*) проверяем остались ли упражнения в тренировке, если нет - удаляем тренировку с сервера

Удалено упражнение из тренировки
- удаляем удаленное упражнение с сервера
- (*) проверяем остались ли упражнения в тренировке, если нет - удаляем тренировку с сервера

Тренировка завершена
- ничего не сохраняем на сервере (состояние на сервере и так уже синхронизировано)


(*) - указывает на выполнение одинаковой операции

*/


import api from "../../api";
import * as types from "../mutationTypes";


// если текущая тренировка еще не сохранена на сервере - сохраним ее на сервере
const checkCurrentTrainForCreate = function (currentTrain, store) {
  if (!currentTrain.id) {
    throw new Error('Ошибка синхронизации: не задан id текущей тренировки');
  }
  if (!currentTrain.isSaved) {
    api.putUserTrain({train: currentTrain})
    store.commit(types.MARK_CURRENT_TRAIN_SAVED, {isSaved: true})
  }
}


// если текущая тренировка пустая, но ранее была сохранена на сервере - удалим ее с сервера
const checkCurrentTrainForDelete = function (currentTrain, store) {
  if (!currentTrain.isSaved) {
    return
  }
  if (currentTrain.trainers.length === 0 && currentTrain.currentTrainer.sets.length === 0) {
    api.deleteUserTrain({trainId: currentTrain.id})
    store.commit(types.MARK_CURRENT_TRAIN_SAVED, {isSaved: false})
  }
}


const apiSync = store => {
  store.subscribe((mutation, state) => {

    switch (mutation.type) {
      case types.ADD_CURRENT_TRAINER_SET:
        checkCurrentTrainForCreate(state.currentTrain, store)
        api.putUserTrainer({
          trainId: state.currentTrain.id,
          trainer: state.currentTrain.currentTrainer
        })
        break

      case types.DELETE_CURRENT_TRAINER_SET:
        if (state.currentTrain.currentTrainer.sets.length > 0) {
          api.putUserTrainer({
            trainId: state.currentTrain.id,
            trainer: state.currentTrain.currentTrainer
          })
        } else {
          api.deleteUserTrainer({
            trainId: state.currentTrain.id,
            trainerId: state.currentTrain.currentTrainer.id
          })
          checkCurrentTrainForDelete(state.currentTrain, store)
        }
        break

      case types.DELETE_TRAINER_FROM_CURRENT_TRAIN:
        api.deleteUserTrainer({
          trainId: state.currentTrain.id,
          trainerId: mutation.payload.trainerId
        })
        checkCurrentTrainForDelete(state.currentTrain, store)
        break

      case types.DELETE_TRAIN:
        api.deleteUserTrain({
          trainId: mutation.payload.trainId
        })
        break
    }

  })
}

export default apiSync
