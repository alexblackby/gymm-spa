<template>
  <div>
    <div v-if="currentTrain.trainers.length > 0" class="done-trainers">
      <h2>Уже сделано сегодня:</h2>
      <div v-for="trainer in currentTrain.trainers" :key="trainer.createTime" class="done-trainers-row">
        {{ trainer.title }}
        <ContextMenu
          :items="[
              {title:'Удалить упражнение', event:'delete'},
            ]"
          color-scheme="white"
          @delete="onDeleteTrainer(trainer.id)"
        >
        </ContextMenu>
        <div class="done-trainers-sets">
          <TrainerSets :sets="trainer.sets" color-scheme="white-on-transparent"></TrainerSets>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import TrainerSets from '../Commons/TrainerSets.vue'
  import ContextMenu from '../Commons/ContextMenu.vue'
  import {mapState} from 'vuex'

  export default {
    name: 'AlreadyDoneList',
    components: {
      TrainerSets,
      ContextMenu
    },
    computed: mapState({
      currentTrain: state => state.currentTrain,
    }),
    data() {
      return {}
    },
    methods: {
      onDeleteTrainer(trainerId) {
        this.$store.dispatch("deleteTrainerFromCurrentTrain", trainerId)
      }
    }
  }
</script>

<style scoped>
  .done-trainers {
    color: white;
  }
  .done-trainers-sets {
    padding-left: 20px;
    padding-top: 10px;
  }
  .done-trainers-row {
    margin-bottom: 12px;
    font-size: 15px;
  }
</style>
