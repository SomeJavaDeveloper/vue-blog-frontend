<!-- MAIN PAGE OF APPLICATION (TODO) -->

<template>
  <div class="main-container">
    <div class="main-container__left-container">
      <div class="main-container__bg">

      </div>
      <div class="main-container__name">
        <picture>
          <img src="https://storage.googleapis.com/vueblog-files-bucket/profile-logo.png" alt=""></picture>
        <h2 v-if="profile">
          <router-link to="/user">{{ profile.username }}</router-link>
        </h2>
        <h2 v-else>No user</h2>
        <p>'Profession'</p>
      </div>
      <div class="main-container__following">
        <h2>following:</h2>
        <h3>189</h3>
      </div>
      <div class="main-container__followers">
        <h2>followers:</h2>
        <h3>765</h3>
      </div>
      <div class="main-container__exit-profile" v-if="profile" @click="logout">
        <h1>Logout</h1>
      </div>
      <router-link to="/login" v-else class="main-container__exit-profile">
        <h1>Login</h1>
      </router-link>
    </div>

    <MessageListForm></MessageListForm>

    <div class="main-container__right-container">
      <div class="trending">
        <h1>Trending now</h1>
      </div>
      <div class="trend">
        <p>trending in Ukraine</p>
        <h1>#Poland</h1>
        <h3>19922 folowers</h3>
      </div>
      <div class="trend">
        <p>trending in Ukraine</p>
        <h1>#Memes</h1>
        <h3>1187 folowers</h3>
      </div>
      <div class="trend">
        <p>trending in Ukraine</p>
        <h1>#Elon_Musk</h1>
        <h3>564 folowers</h3>
      </div>
      <div class="trend">
        <p>trending in Ukraine</p>
        <h1>#My_wife_is_alien</h1>
        <h3>7632 folowers</h3>
      </div>
      <div class="trend">
        <p>trending in Ukraine</p>
        <h1>#hypertension</h1>
        <h3>22873 folowers</h3>
      </div>
      <div class="show-more">
        <a href="">
          <h1>show more</h1>
        </a>
      </div>
    </div>


  </div>
</template>

<script>
import MessageListForm from "../components/MessageListForm";

export default {
  components: { MessageListForm },
  name: 'MainPage',
  data() {
    return {

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
}
</script>

<style>
</style>