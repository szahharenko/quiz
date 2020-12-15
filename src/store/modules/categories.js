import axios from 'axios'
export default {
  actions: {
    async fetchCategories (context) {
      axios
        .get('https://api.chucknorris.io/jokes/categories')
        .then(response => {
          const data = [...response.data]
          context.commit('updateCategories', data)
        })
    }
  },
  mutations: {
    updateCategories (state, categories) {
      state.categories = categories
    }
  },
  state: {
    categories: []
  },
  getters: {
    allCategories (state) {
      return state.categories
    }
  }
}
