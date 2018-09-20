<template>
  <div>
    <CurrentTrainHeader></CurrentTrainHeader>

    <CurrentTrainer v-if="hasCurrentTrainer"></CurrentTrainer>
    <SelectTrainer v-else></SelectTrainer>
  </div>
</template>

<script>
  import CurrentTrainHeader from './CurrentTrainHeader.vue'
  import CurrentTrainer from './CurrentTrainer.vue'
  import SelectTrainer from './SelectTrainer.vue'
  import {mapState, mapGetters} from 'vuex'

  export default {
    name: 'CurrentTrain',
    components: {
      CurrentTrainHeader,
      CurrentTrainer,
      SelectTrainer
    },
    computed: mapState({
      currentTrain: state => state.currentTrain,
      ...mapGetters(['hasCurrentTrainer'])
    }),
    created: function () {
      this.$store.dispatch('startTrain')
    },
    data() {
      return {}
    },
  }
</script>

<style scoped>

</style>
