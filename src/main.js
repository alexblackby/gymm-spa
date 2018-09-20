import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './filters'
import './utils/elementUI'

Vue.config.productionTip = false

new Vue({
  el: '#app',
  store,
  router,
  components: {App},
  render: h => h(App)
}).$mount('#app')
