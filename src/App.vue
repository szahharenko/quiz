<template>
  <div id="app">
    <div class="header">
      <router-link :to="`/`"><img alt="Norris" class="logo" src="./assets/logo.jpg"></router-link>
      <h1>Quiz</h1>
    </div>
    <router-view/>
  </div>
</template>
<script>
import VueRouter from 'vue-router'
import Quiz from './components/Quiz.vue'

const router = new VueRouter({
  routes: [
    { path: '*', component: Quiz },
    { path: '/', component: Quiz }
    // { path: '/jokes/:category', component: NAMEIT }
  ]
})

export default {
  name: 'app',
  router: router
}
</script>
