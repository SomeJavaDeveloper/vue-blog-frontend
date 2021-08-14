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
        <h3>{{ followingCount.length }}</h3>
      </div>
      <div class="main-container__followers">
        <h2>
          <router-link
            :to="{ name: 'SubscribersPage', params: { username: profile.username }}">
            followers:
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
    <div class="main-container__left-container-plug" v-else>
    </div>


    <div v-if="this.path.toString() === '/'">
      <MessageListForm></MessageListForm>
    </div>
    <div v-else>
<!--         -if="this.path.toString() === '/tag'"-->
      <TagPage></TagPage>
    </div>

    <div class="main-container__right-container">
      <div class="trending">
        <h1>Trending now</h1>
      </div>

      <router-link
        v-for="tag in tags.slice(0, 5)" :key="tag"
        :to="{ name: 'Tag', params: { tagContent: tag.content }}">
        <div class="trend">
          <h1>#{{ tag.content }}</h1>
          <h3>{{ tag.numberOfMessages }} followers</h3>
        </div>
      </router-link>

<!--      <a @click="openTagMain(tag)" href="#" v-for="tag in tags.slice(0, 5)" :key="tag.id">-->
<!--        <div class="trend">-->
<!--          <h1>#{{ tag.content }}</h1>-->
<!--          <h3>{{ tag.numberOfMessages }} followers</h3>-->
<!--        </div>-->
<!--      </a>-->
      <div class="show-more">
        <a href="">
          <h1>show more (todo)</h1>
        </a>
      </div>
    </div>


  </div>
</template>

<script>

import {useRoute} from 'vue-router';
import {computed} from 'vue';
import MessageListForm from "../components/MessageListForm";
import TagPage from "../components/TagPage";

export default {
  components: {TagPage, MessageListForm },
  name: 'MainPage',
  data() {
    return {
      tags: [],
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
    fetch("/api/tags/popular")
        .then(response => response.json())
        .then(data => {
          this.tags = data
        })
        .catch(error => {
          console.log('logout', error)
        })

    if(this.profile != null) {
      fetch("/api/subscriptions/" + this.profile.username)
      .then(response => response.json())
      .then(data => {
        this.followingCount = data
      })
      .catch(error => {
        console.log('subscriptions', error)
      })
      fetch("/api/subscribers/" + this.profile.username)
      .then(response => response.json())
      .then(data => {
        this.followersCount = data
      })
      .catch(error => {
        console.log('subscribers', error)
      })
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
    openTagMain(tag) {
      this.$router.push({ name: 'Tag', params: { tag: tag.content } })
    },
  }
}
</script>

<style>
</style>
