<!-- Test file for vue routing -->

<template>
  <div class="main-container">
    <div class="main-container__left-container">
      <div class="main-container__bg">

      </div>
      <div class="main-container__name">
        <picture>
          <img src="https://storage.googleapis.com/vueblog-files-bucket/profile-logo.png" alt=""></picture>
        <h2>
          <router-link
            :to="{ name: 'Profile',
             params: { username: this.$route.params.username }}">
            {{ this.$route.params.username }}</router-link>
        </h2>
        <p>'Profession'</p>
      </div>
      <div class="main-container__following">
        <h2>
          <router-link
            :to="{ name: 'SubscriptionsPage', params: { username: this.$route.params.username }}">
            following:
          </router-link>
        </h2>
        <h3>{{ this.subscriptionsCount }}</h3>
      </div>
      <div class="main-container__followers">
        <h2>
          <router-link
            :to="{ name: 'SubscribersPage', params: { username: this.$route.params.username }}">
            followers:
          </router-link>
        </h2>
        <h3>{{ this.subscribersCount }}</h3>
      </div>

      <div class="main-container__exit-profile"
           v-if="profile.username === this.$route.params.username" @click="logout">
        <h1>Logout</h1>
      </div>
      <div class="main-container__exit-profile" v-else>
        <a @click="subUser">
          <!--        subTag(tag)-->
          <button v-if="!isUserSubbed">
            Subscribe
          </button>
          <button v-else>
            Unsubscribe
          </button>
        </a>
      </div>
<!--      <router-link to="/login" v-else-if="isUserSubbed" class="main-container__exit-profile">-->
<!--        <h1>Login</h1>-->
<!--      </router-link>-->
<!--      <router-link to="/login" v-else class="main-container__exit-profile">-->
<!--        <h1>Login</h1>-->
<!--      </router-link>-->


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
      isUserSubbed: false,
      subscriptionsCount: 0,
      subscribersCount: 0
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
    this.initialize()
    console.log(this.$route.params.username + ' PROFILE')
  },
  methods: {
    //sending request for logout to backend
    initialize() {

      this.initializeSubs()

      fetch("/api/subscribers/" + this.$route.params.username + "?inputPattern=")
      .then(response => response.json())
      .then(data => {
        this.isUserSubbed = false
        data.forEach(user => {
          if (user.username === this.profile.username)
            this.isUserSubbed = true
        })
      })
      .catch(error => {
        console.log('subscribers', error)
      })

      this.initializeSubs()

    },
    initializeSubs() {
      fetch("/api/subscribers-count/" + this.$route.params.username)
      .then(response => response.json())
      .then(data => {
        this.subscribersCount = data
      })
      .catch(error => {
        console.log('subscribers', error)
      })

      fetch("/api/subscriptions-count/" + this.$route.params.username)
      .then(response => response.json())
      .then(data => {
        this.subscriptionsCount = data
      })
      .catch(error => {
        console.log('subscriptions', error)
      })
    },
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
    subUser() {
      fetch("/api/subscribe?username=" + this.$route.params.username)
      .then(response => response.json())
      .then(data => {
        this.profile = data
        this.isUserSubbed = !this.isUserSubbed;
      })
      .catch(error => {
        console.log(error)
      })
      this.initialize()
    },
  }
}
</script>

<style>
</style>
