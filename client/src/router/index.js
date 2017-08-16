import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Home from '@/components/Home'
import sumQuestions from '@/components/SumQuestions'
import detailQuestions from '@/components/DetailQuestions'

Vue.use(Router)

const routes = [
  {
    path: '/test',
    name: 'Hello',
    component: Hello
  },
  {
    path: '/',
    alias: '/home',
    component: Home,
    children: [
      { path: '', component: sumQuestions },
      { path: '/question/:id', props: true, component: detailQuestions }
    ]
  }
]

export default new Router({
  routes
})
