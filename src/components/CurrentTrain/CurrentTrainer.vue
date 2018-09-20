<template>
  <div>
    <div class="set-form form">
      <h1 class="form-header">{{ currentTrainer.title }}</h1>

      Вес:
      <div class="set-form-slider">
        <el-slider
          v-model="weight"
          :min=0
          :max=150
          show-input>
        </el-slider>
      </div>

      Повторения:
      <div class="set-form-slider slider-green">
        <el-slider
          v-model="reps"
          :min=0
          :max=50
          show-input>
        </el-slider>
      </div>

      <transition
        name="sets-block-burst"
        enter-active-class="burst-enter-active"
        leave-active-class="burst-leave-active"
      >
        <div v-if="currentTrainer.sets.length>0" class="set-form-sets">
          <TrainerSets
            :sets="currentTrainer.sets"
            color-scheme="blue-and-green-on-white"
            allow-delete="true"
            @deleteSet="onDeleteSet"
          >
          </TrainerSets>
        </div>
      </transition>

      <div class="set-form-buttons">
        <el-button @click="onAddSet" size="small" type="primary">
          Добавить подход
        </el-button>
        <el-button @click="onEndTrainer" size="small" type="primary" plain>
          След. упражнение »
        </el-button>
      </div>
    </div>


    <div class="done-trainers">
      <h2>История этого упражнения:</h2>

      <div v-if="!hasHistoryForTrainer(currentTrainer.title)" class="light-text">
        Вы раньше не делали это упражнение.
      </div>

      <div>
        <div v-for="historyItem in getHistoryForTrainer(currentTrainer.title,5)">
          <div class="trainer-stats-title">{{ historyItem.createTime | dateFormat('weekdayFullMonth') }}</div>
          <div class="trainer-stats-sets">
            <TrainerSets :sets="historyItem.sets" color-scheme="white-on-transparent"></TrainerSets>
          </div>
        </div>
      </div>

    </div>



  </div>
</template>

<script>
  import {mapState, mapGetters} from 'vuex'
  import TrainerSets from '../Commons/TrainerSets'

  export default {
    name: 'TrainerSetsForm',
    data() {
      return {
        weight: 0,
        reps: 10,
        statsExpanded: false
      }
    },
    components: {TrainerSets},
    computed: mapState({
      currentTrainer: state => state.currentTrain.currentTrainer,
      ...mapGetters(['hasHistoryForTrainer', 'getHistoryForTrainer'])
    }),
    methods: {
      onAddSet() {
        if (this.reps > 0) {
          this.$store.dispatch('addSet', {weight: this.weight, reps: this.reps})
        }
      },
      onDeleteSet(num) {
        this.$store.dispatch('deleteSet', num)
      },
      onEndTrainer() {
        this.weight = 0
        this.reps = 0
        this.$store.dispatch("finishCurrentTrainer")
      }
    },
    created() {
      // при начале упражнения ставим значения веса и повторений как в предыдущий раз
      if (this.hasHistoryForTrainer(this.currentTrainer.title)) {
        let prevTrain = this.getHistoryForTrainer(this.currentTrainer.title, 1)
        if (prevTrain.length > 0 && prevTrain[0].sets && prevTrain[0].sets.length > 0) {
          this.weight = prevTrain[0].sets[0].weight
          this.reps = prevTrain[0].sets[0].reps
        }
      }
      // если тренировка была загружена (из localStorage например) - устанавливаем загруженные значения
      if (this.currentTrainer
        && this.currentTrainer.sets
        && this.currentTrainer.sets.length > 0) {
        let lastSet = this.currentTrainer.sets[this.currentTrainer.sets.length - 1]
        this.weight = lastSet.weight
        this.reps = lastSet.reps
      }
    }
  }
</script>

<style src="@/assets/trainerSetsForm.css">
</style>
