<template>

  <input v-model="inputName" @change="updateList" class="username-input"/>

  <div v-for="subscriber in subscribers" :key="subscriber.id" class="user-container__user-box">
    <div class="post_name">
      <div class="post_logo">
        <picture>
          <img src="https://storage.googleapis.com/vueblog-files-bucket/profile-logo.png" alt=""></picture>
      </div>
      <div>
        <router-link :to="{ name: 'Profile', params: {
            username: subscriber.username
          }}">
          <h1>
            {{ subscriber.username }}
          </h1>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "SubscribersPage",
  data() {
    return {
      subscribers: [],
      inputName: ''
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
    fetch("/api/subscribers/" + this.$route.params.username  + "?inputPattern=")
    .then(response => response.json())
    .then(data => {
      this.subscribers = data
    })
    .catch(error => {
      console.log('subscribers getting', error)
    })
  },
  methods: {
    updateList() {
      fetch("/api/subscribers/" + this.$route.params.username + "?inputPattern=" + this.inputName)
      .then(response => response.json())
      .then(data => {
        this.subscribers = data
      })
      .catch(error => {
        console.log('subscribers getting', error)
      })
    }
  }
}
</script>

<style scoped>

</style>
