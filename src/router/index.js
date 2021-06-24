import { createRouter, createWebHistory } from 'vue-router'

import About from '../views/About.vue'
import MainPage from "../components/MainPage";

const routes = [
  {
    path: '/',
    name: 'Main',
    component: MainPage
  },
  {
    path: '/user',
    name: 'About',
    component: About
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
