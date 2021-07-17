// vue routing config file

import { createRouter, createWebHistory } from 'vue-router'

import Profile from '../views/Profile.vue'
import MainPage from "../views/MainPage";
import LoginPage from "../views/LoginPage";
import RegisterPage from "../views/RegisterPage";

const routes = [
  {
    path: '/',
    name: 'Main',
    component: MainPage
  },
  {
    path: '/user',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage,

  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterPage
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
