import Vue from 'vue'
import Vuex from 'vuex'
// import categories from './modules/categories'
import likes from './modules/likes'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    // categories,
    likes
  }
})

export default store
