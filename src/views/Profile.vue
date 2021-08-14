<!-- Test file for vue routing -->

<template>
  <div class="main-container">
    <div class="main-container__left-container">
      <div class="main-container__bg">

      </div>
      <div class="main-container__name">
        <picture>
          <img src="https://storage.googleapis.com/vueblog-files-bucket/profile-logo.png" alt=""></picture>
        <h2 v-if="profile">
          <router-link to="/user">{{ this.$route.params.username }}</router-link>
        </h2>
        <h2 v-else>No user</h2>
        <p>'Profession'</p>
      </div>
      <div class="main-container__following">
        <h2>
          <router-link
            :to="{ name: 'SubscriptionsPage', params: { username: this.$route.params.username }}">
            following:
          </router-link>
        </h2>
        <h3>{{ followingCount.length }}</h3>
      </div>
      <div class="main-container__followers">
        <h2>
          <router-link
            :to="{ name: 'SubscribersPage', params: { username: this.$route.params.username }}">
            followers
          </router-link>
        </h2>
        <h3>{{ followersCount.length }}</h3>
      </div>
      <div class="main-container__exit-profile" v-if="profile" @click="logout">
        <h1>Logout</h1>
      </div>
      <router-link to="/login" v-else class="main-container__exit-profile">
        <h1>Login</h1>
      </router-link>
    </div>

    <ProfileMessages></ProfileMessages>

<!--    Тут будет лента-->


  </div>
</template>

<script>

import ProfileMessages from "../components/ProfileMessages";
import {useRoute} from 'vue-router';
import {computed} from 'vue';

export default {
  components: {ProfileMessages},
  name: 'Profile',
  data() {
    return {
      route: useRoute(),
      path: computed(() =>this.route.path),
      followingCount: [],
      followersCount: []
    }
  },
  computed: {
    profile: {
      get() {
        return this.$store.state.userProf
      },
      set(profile) {
        this.$store.commit('updateProf', profile)
      }
    }
  },
  mounted() {
    fetch("/api/subscriptions/" + this.$route.params.username)
    .then(response => response.json())
    .then(data => {
      this.followingCount = data
    })
    .catch(error => {
      console.log('subscriptions', error)
    })
    fetch("/api/subscribers/" + this.$route.params.username)
    .then(response => response.json())
    .then(data => {
      this.followersCount = data
    })
    .catch(error => {
      console.log('subscribers', error)
    })
  },
  methods: {
    //sending request for logout to backend
    logout() {
      fetch("/api/logout", {
        method: 'GET',
        mode: 'cors',
        //не нужно
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      })
      .then(response => response.json())
      .then(data => {
        console.log('data', data)
      })
      .catch(error => {
        console.log('logout', error)
      })
      location.href = '/'
    },
    openTagMain(tag) {
      this.$router.push({ name: 'Tag', params: { tag: tag.content } })
    },
  }
}
</script>

<style>
</style>
