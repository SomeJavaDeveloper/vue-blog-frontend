// vue routing config file

import { createRouter, createWebHistory } from 'vue-router'

import Profile from '../views/Profile.vue'
import MainPage from "../views/MainPage";
import LoginPage from "../views/LoginPage";
import RegisterPage from "../views/RegisterPage";
import SubscriptionsPage from "../views/SubscriptionsPage";
import SubscribersPage from "../views/SubscribersPage";
import UsersPage from "../views/UsersPage";
import TagPage from "../views/TagPage";
import TagsListPage from "../views/TagsListPage";


const routes = [
  {
    path: '/',
    name: 'Main',
    component: MainPage
  },
  {
    path: '/tags',
    name: 'Tags',
    component: TagsListPage
  },
  {
    path: '/tag/:tagContent',
    name: 'Tag',
    component: TagPage
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
    path: '/subscriptions/:username',
    name: 'SubscriptionsPage',
    component: SubscriptionsPage
  },
  {
    path: '/subscribers/:username',
    name: 'SubscribersPage',
    component: SubscribersPage
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
