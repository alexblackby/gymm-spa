<template>
  <div id="app">
    <div v-if="authLoaded">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import {mapState, mapGetters} from 'vuex'

  export default {
    name: 'App',
    computed: mapState({
      ...mapGetters(['authLoaded'])
    }),
    created() {
      this.$store.dispatch('init')
    }
  }
</script>

<style src="@/assets/app.css">
</style>
