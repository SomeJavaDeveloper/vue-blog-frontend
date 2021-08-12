// vue routing config file

import { createRouter, createWebHistory } from 'vue-router'

import Profile from '../views/Profile.vue'
import MainPage from "../views/MainPage";
import LoginPage from "../views/LoginPage";
import RegisterPage from "../views/RegisterPage";
import SubscriptionsPage from "../views/SubscriptionsPage";
import UsersPage from "../views/UsersPage";


const routes = [
  {
    path: '/',
    name: 'Main',
    component: MainPage
  },
  {
    path: '/tag/:tagContent',
    name: 'Tag',
    component: MainPage
  },
  {
    path: '/user/:username',
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
  },
  {
    path: '/subscriptions',
    name: 'Subscriptions',
    component: SubscriptionsPage
  },
  {
    path: '/users',
    name: 'Users',
    component: UsersPage
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
