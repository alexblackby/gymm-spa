<template>
  <div>
    <div class="current-train-header">
      <div class="current-train-date">
        {{ currentTrain.createTime | dateFormat('dayMonth') }}
      </div>
      <div class="current-train-stop" @click="onEndTrain">
        Завершить тренировку
      </div>
      <div class="clear"></div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    name: 'CurrentTrainHeader',
    computed: mapState({
      currentTrain: state => state.currentTrain
    }),
    data() {
      return {}
    },
    methods: {
      onEndTrain() {
        this.$store.dispatch("finishCurrentTrain")
        this.$router.push('/')
      }
    }
  }
</script>

<style scoped>
  .current-train-header {
    padding: 5px 0 15px;
  }

  .current-train-date {
    font-size: 18px;
    color: white;
    float: left;
  }

  .current-train-stop {
    font-size: 14px;
    color: #fabdbd;
    float: right;
    padding-top: 3px;
    cursor: pointer;
  }
</style>
