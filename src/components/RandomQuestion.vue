<template>
  <div class="questions">
    <div v-if="this.loading">
        LOADING...
    </div>
    <div v-else>
      <div v-if="this.session === false">
        <button @click="startGame()">Start</button>
      </div>
      <div v-else>
          <template v-for="q in question">
            <div v-bind:key="q.id">
              <h1>{{count}} {{ q.q }} - {{ session }}</h1>
              <div v-html="q.c"></div>
              <ul>
                <template v-for="a in q.a">
                  <li v-bind:key="a.id" @click="answerToggle(a.id)">
                    <div v-if="a.image">
                      <img :src="a.image">
                    </div>
                    <span>{{a.text}}</span>
                  </li>
                </template>
            </ul>
            </div>
          </template>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'

const API = 'https://dev.code-essence.eu/quiz/'

export default {
  name: 'questions',
  data () {
    return {
      session: false,
      loading: false,
      start: 0,
      end: 0,
      interval: 0,
      count: 0,
      question: []
    }
  },
  methods: {
    save (answer) {
      clearInterval(this.interval)
      this.loading = true
      this.end = new Date().getTime()
      const data = {
        a: 'a',
        s: this.session,
        question: this.question[0].id,
        answer: answer,
        start: this.start,
        end: this.end,
        diff: this.end - this.start,
        count: this.count
      }
      axios
        .post(API, data)
        .then(response => {
          this.load()
        })
    },
    load () {
      this.count = 20
      this.question = []
      const data = { a: 'q', s: this.session }
      axios
        .post(API, data)
        .then(response => {
          const data = response.data
          this.question.push(data.question)
          this.startTurn()
        })
    },
    getSession () {
      const savedSession = window.location.hash.replace('#/', '')
      return savedSession !== '' ? savedSession : false
    },
    setSession (session) {
      this.session = session
      window.location.hash = session
    },
    startGame () {
      const id = Math.random().toString(36).substr(2, 9)
      this.setSession(id)
      this.load()
    },
    startTurn () {
      this.loading = false
      this.start = new Date().getTime()
      this.interval = setInterval(() => {
        this.count--
        if (this.count === 0) this.save()
      }, 1000)
    },
    answerToggle (answer) {
      this.save(answer)
    }
  },
  mounted () {
    const session = this.getSession()
    if (session) {
      this.setSession(session)
      this.load()
    }
  }
}
</script>
<style scoped>
  .questions {user-select: none;text-align: center;margin-top: 30px}
  .questions h2 {text-transform: capitalize;display: inline-block;padding: 10px;color: #338b53;border-top: dashed 1px #797979;}
  .questions ul {list-style: none;margin-bottom: 20px;display: flex;flex-direction: row;}
  .questions ul li {padding: 20px;border: dashed 1px #777;position:relative;text-align:left;cursor:pointer;flex:1;}
  .questions ul li:hover {background-color:#52f88e;}
  .questions ul li img {max-width: 100px;height: auto;}
</style>
