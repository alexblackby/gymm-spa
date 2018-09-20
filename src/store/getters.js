let getters = {
  getTrainHistoryLastCreateTime: (state) => {
    const len = state.trainHistory.length
    if (len === 0) {
      return 0
    }
    return state.trainHistory[len - 1].createTime
  },
  hasCurrentTrainer: (state) => !!state.currentTrain.currentTrainer.id,
  hasHistoryForTrainer: (state) => (trainerTitle) =>
    state.trainHistory.some(
      item => item.trainers.some(
        subitem => subitem.title === trainerTitle
      )
    ),
  getHistoryForTrainer: (state) => (trainerTitle, maxItems = 3) => {
    let results = []
    for (let train of state.trainHistory) {
      let items = train.trainers.filter(
        subitem => subitem.title === trainerTitle
      )
      if (items.length > 0) {
        results.push(items[0])
      }
      if (results.length === maxItems) break
    }
    return results
  },
  authLoaded: (state) => !!state.authData.token,
  historyIsLoading: (state) => state.historyIsLoading,
  historyIsLoadedFully: (state) => state.historyIsLoadedFully
}

export default getters
