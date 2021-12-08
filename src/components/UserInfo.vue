<template>
  <div class="main-container__left-container" v-if="profile">
    <div class="main-container__bg">

    </div>
    <div class="main-container__name">
      <picture>
        <img :src="profile.photoLink" alt=""></picture>
      <h2>
        <router-link
          :to="{ name: 'Profile', params: { username: profile.username }}">
          {{ profile.username }}
        </router-link>
      </h2>
    </div>
    <div class="main-container__following">
      <h2>
        <router-link
          :to="{ name: 'SubscriptionsPage', params: { username: profile.username }}">
          following:
        </router-link>
      </h2>
      <h3>{{ profile.subscriptions.length }}</h3>
    </div>
    <div class="main-container__followers">
      <h2>
        <router-link
          :to="{ name: 'SubscribersPage', params: { username: profile.username }}">
          followers:
        </router-link>
      </h2>
      <h3>{{ profile.subscribers.length }}</h3>
    </div>
    <div class="main-container__exit-profile" v-if="profile" @click="logout">
      <h1>Logout</h1>
    </div>
    <router-link to="/login" v-else class="main-container__exit-profile">
      <h1>Login</h1>
    </router-link>
  </div>
  <div class="main-container__left-container-plug" v-else>
  </div>
</template>

<script>
export default {
  name: "UserInfo",
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
  }
}
</script>

<style scoped>

</style>
