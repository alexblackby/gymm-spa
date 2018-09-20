<template>
  <div class="form history-item">
    <ContextMenu
      :items="[
              {title:'Удалить тренировку', event:'delete'},
            ]"
      @delete="deleteTrain"
      color-scheme="black"
    >
    </ContextMenu>
    <h2 class="form-header" @click="expanded=!expanded">
      {{ item.createTime | dateFormat('weekdayFullMonth') }}
    </h2>
    <div @click="expanded=!expanded">
      <div v-for="trainer in item.trainers" :key="trainer.createTime">
        {{ trainer.title }}
        <div v-if="expanded" class="history-item-sets">
          <TrainerSets :sets="trainer.sets" color-scheme="black-on-gray"></TrainerSets>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import TrainerSets from '../Commons/TrainerSets'
  import ContextMenu from '../Commons/ContextMenu.vue'

  export default {
    name: 'TrainHistoryItem',
    components: {TrainerSets, ContextMenu},
    props: ['item'],
    data() {
      return {
        expanded: false
      }
    },
    methods: {
      deleteTrain() {
        this.$store.dispatch("deleteTrain", {trainId: this.item.id})
      }
    }
  }
</script>

<style>
  .history-item {
    background: #eee;
    cursor: pointer;
    color: black;
  }

  .history-item-sets {
    padding-left: 20px;
    padding-top: 10px;
  }
</style>
