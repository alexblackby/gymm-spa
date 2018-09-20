<template>
  <div>
    <div class="add-trainer-form form">
      <h1 class="form-header">Добавить упражнение</h1>

      <form @submit.prevent="onEnterTitle">
        <div class="enter-title">
          <el-input placeholder="Введите название упражнения..." v-model="title">
            <el-button slot="append" icon="el-icon-arrow-right" @click="onEnterTitle"></el-button>
          </el-input>
        </div>
      </form>

      <div class="trainer-form-autocompletes">
        <div v-for="autocompleteItem in autocompleteOwn"
             :key="autocompleteItem"
             @click="onSelectTitle(autocompleteItem)"
             class="own-trainers-item">
          {{ autocompleteItem | slice(35) }}
        </div>
        <div v-for="autocompleteItem in autocompleteAll"
             :key="autocompleteItem"
             @click="onSelectTitle(autocompleteItem)"
             class="own-trainers-item">
          {{ autocompleteItem | slice(35) }}
        </div>
        <div class="clear"></div>
      </div>

      <div class="own-trainers" v-if="ownTrainers.length>0">
        <div class="own-trainers-title">Ваши упражнения:</div>
        <div v-for="ownTrainerTitle in ownTrainers"
             :key="ownTrainerTitle"
             @click="onSelectTitle(ownTrainerTitle)"
             class="own-trainers-item">
          {{ ownTrainerTitle | slice(35) }}
        </div>
        <div class="clear"></div>
      </div>

    </div>

    <AlreadyDoneList></AlreadyDoneList>

  </div>
</template>


<script>
  import {mapState} from 'vuex'
  import _difference from 'lodash/difference'
  import AlreadyDoneList from './AlreadyDoneList.vue'

  export default {
    name: 'AddTrainerForm',
    components: {
      AlreadyDoneList
    },
    data() {
      return {
        title: '',
      }
    },
    computed: {
      ...mapState({
        ownTrainers: state => state.ownTrainers,
        allTrainers: state => _difference(state.allTrainers, state.ownTrainers)
      }),
      autocompleteOwn() {
        if (this.title.length < 1) {
          return []
        }
        let reg = new RegExp("(^|\\s)" + this.title, 'i')
        return this.ownTrainers.filter(item => item.match(reg))
      },
      autocompleteAll() {
        if (this.title.length < 1) {
          return []
        }
        let reg = new RegExp("(^|\\s)" + this.title, 'i')
        return this.allTrainers.filter(item => item.match(reg))
      }
    },
    methods: {
      onEnterTitle() {
        this.onSelectTitle(this.title)
      },
      onSelectTitle(title) {
        if(title==='') {
          return false
        }
        this.$store.dispatch("startTrainer", title ? title : this.title)
      }
    },
    filters: {
      slice: function (value, len) {
        let sliced = value.slice(0, len)
        if (sliced.length < value.length) {
          sliced += '...'
        }
        return sliced
      }
    }
  }
</script>


<style>
  .own-trainers {
    margin-top: 10px;
  }

  .own-trainers-title {
    padding: 10px 0 15px;
  }

  .own-trainers-item {
    float: left;
    border: 1px solid #82a9d6;
    color: #1584c7;
    padding: 5px 6px;
    margin: 0 12px 12px 0;
    font-size: 11px;
    cursor: pointer;
  }

  .enter-title {
    padding: 0 0 5px;
  }

  .trainer-form-autocompletes {
    padding-top: 5px;
  }
</style>
