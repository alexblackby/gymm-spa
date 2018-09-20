<template>
  <div>
    <div class="app-header">
      <div class="app-header-logo">gymm</div>
      <UserMenu></UserMenu>
      <div class="clear"></div>
    </div>

    <div class="form">
      <h1 class="form-header">{{ dateNow | dateFormat('weekdayFullMonth') }}</h1>
      <div>
        <el-button @click="startTrain" type="primary">Начать тренировку</el-button>
      </div>
    </div>

    <h1>История тренировок:</h1>
    <div class="white-text">
      <div v-if="historyIsLoaded">
        <div v-if="historyItems.length===0" class="light-text">
          Здесь будет отображаться история ваших тренировок.
        </div>
        <div v-else>
          <transition-group
            name="history-items-leave"
            leave-active-class="burst-leave-active"
            tag="div"
          >
            <TrainHistoryItem
              v-for="item in historyItems"
              :key="item.id"
              :item="item">
            </TrainHistoryItem>
          </transition-group>
        </div>
      </div>
    </div>

    <div v-if="historyIsLoading" class="history-loading white-text">
      История загружается...
    </div>

  </div>
</template>

<script>
  import TrainHistoryItem from './TrainHistoryItem.vue'
  import {mapState} from 'vuex'
  import utils from '../../utils/utils'
  import UserMenu from "../Commons/UserMenu";

  export default {
    name: 'TrainHistory',
    components: {
      UserMenu,
      TrainHistoryItem
    },
    computed: mapState({
      historyItems: state => state.trainHistory,
      historyIsLoaded: state => state.historyIsLoaded,
      historyIsLoading: state => state.historyIsLoading
    }),
    data() {
      return {
        dateNow: utils.timeInSeconds()
      }
    },
    methods: {
      startTrain() {
        this.$router.push({name: 'currentTrain'})
      },
      checkPageBottom() {
        const pixelsFromBottom = 1000
        const bottomOfWindow = document.documentElement.scrollTop + window.innerHeight >= document.documentElement.offsetHeight - pixelsFromBottom
        if(bottomOfWindow) {
          this.$store.dispatch('trainHistoryLoadNext')
        }
      }
    },
    mounted() {
      this.scrollInterval = window.setInterval(this.checkPageBottom, 200)
    },
    beforeDestroy() {
      window.clearInterval(this.scrollInterval)
    }
  }
</script>

<style>
  .app-header-logo {
    float: left;
    color: rgba(255, 255, 255, 0.9);
    font-size: 24px;
    line-height: 24px;
    text-decoration: none;
    font-family: 'Asap', sans-serif;
    font-weight: 400;
    margin: 0px 5px 12px;
  }

  .history-loading {
    padding-bottom:20px;
  }
</style>
