import Vue from 'vue'
import Vuex from 'vuex'
import event from '@/store/modules/event'
import * as user from '@/store/modules/user'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    categories: [
      'sustainability',
      'nature',
      'animal welfare',
      'housing',
      'education',
      'food',
      'community'
    ]
  },
  mutations: {},
  actions: {},
  getters: {},
  modules: {
    user,
    event
  }
})
