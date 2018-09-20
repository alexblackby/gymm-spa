import Vue from 'vue'
import VueRouter from 'vue-router'
import TrainHistory from '../components/TrainHistory/TrainHistory.vue'
import CurrentTrain from '../components/CurrentTrain/CurrentTrain.vue'
import Logout from '../components/Auth/Logout.vue'

Vue.use(VueRouter)

const routes = [
  {name: 'trainHistory', path: '/', component: TrainHistory},
  {name: 'currentTrain', path: '/current-train', component: CurrentTrain},
  {name: 'logout', path: '/logout', component: Logout}
]

const router = new VueRouter({
  routes
})

export default router
