import Vue from 'vue'
import VueRouter from 'vue-router'
import SignUp from '../views/SignUp.vue'
import Login from '../views/Login.vue'
import Todo from '../views/Todo.vue'
import Labels from '../views/Labels.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Todo
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignUp
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/todo',
    name: 'todo',
    component: Todo
  },
  {
    path: '/labels',
    name: 'labels',
    component: Labels
  },
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
