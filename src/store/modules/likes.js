export default {
  actions: {
    updateLikes (context, likes) {
      context.commit('updateLikes', likes)
    }
  },
  mutations: {
    updateLikes (state, likes) {
      state.likes = likes
    }
  },
  state: {
    likes: []
  },
  getters: {
    categoryLikes (state) {
      const likes = {}
      state.likes.forEach((like) => {
        const cats = like.categories || []
        cats.forEach((cat) => {
          const count = likes[cat] || 0
          likes[cat] = (count + 1)
        })
      })
      return likes
    },
    allLikes (state) {
      return state.likes
    }
  }
}
