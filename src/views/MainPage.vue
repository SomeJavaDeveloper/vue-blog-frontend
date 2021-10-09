<!-- MAIN PAGE OF APPLICATION (TODO) -->

<template>
  <div class="main-container">

    <div class="main-container__left-container" v-if="profile">
      <div class="main-container__bg">

      </div>
      <div class="main-container__name">
        <picture>
          <img src="https://storage.googleapis.com/vueblog-files-bucket/profile-logo.png" alt=""></picture>
        <h2>
          <router-link
            :to="{ name: 'Profile', params: { username: profile.username }}">
            {{ profile.username }}
          </router-link>
        </h2>
        <p>'Profession'</p>
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


    <div v-if="this.path.toString() === '/'">
      <MessageListForm></MessageListForm>
    </div>
    <div v-else>
      <TagPage></TagPage>
    </div>

    <TagBox></TagBox>

  </div>
</template>

<script>

import {useRoute} from 'vue-router';
import {computed} from 'vue';
import MessageListForm from "../components/MessageListForm";
import TagPage from "../components/TagPage";
import TagBox from "../components/TagBox";

export default {
  components: {TagPage, MessageListForm, TagBox },
  name: 'MainPage',
  data() {
    return {
      tags: [],
      route: useRoute(),
      path: computed(() =>this.route.path)
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
    },
    // followingCount: function () {
    //   fetch("/api/subscriptions-count/" + this.profile.username)
    //   .then(response => response.json())
    //   .then(data => {
    //     return  data
    //   })
    //   .catch(error => {
    //     console.log('subscriptions', error)
    //   })
    // },
    // followersCount: function () {
    //   return this.message.split('').reverse().join('')
    // }
  },
  // mounted() {
  //   fetch("/api/tags/popular")
  //   .then(response => response.json())
  //   .then(data => {
  //     console.log(data)
  //     this.tags = data
  //   })
  //   .catch(error => {
  //     console.log('logout', error)
  //   })
  // },
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
