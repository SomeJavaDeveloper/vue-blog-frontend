<template>

  <input v-model="inputName" @change="updateList" class="username-input"/>

  <div v-for="subscription in subscriptions" :key="subscription.id" class="user-container__user-box">
    <div class="post_name">
      <div class="post_logo">
        <picture>
          <img src="https://storage.googleapis.com/vueblog-files-bucket/profile-logo.png" alt=""></picture>
      </div>
      <div>
        <router-link :to="{ name: 'Profile', params: {
            username: subscription.username
          }}">
          <h1>
            {{ subscription.username }}
          </h1>
        </router-link>
      </div>
    </div>
  </div>

</template>

<script>

export default {
  name: "SubscriptionsPage",
  data() {
    return {
      subscriptions: [],
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
    fetch("/api/subscriptions/" + this.$route.params.username + "?inputPattern=")
    .then(response => response.json())
    .then(data => {
      this.subscriptions = data
    })
    .catch(error => {
      console.log('subscriptions getting', error)
    })
  },
  methods: {
    updateList() {
      fetch("/api/subscriptions/" + this.$route.params.username + "?inputPattern=" + this.inputName)
      .then(response => response.json())
      .then(data => {
        this.subscriptions = data
      })
      .catch(error => {
        console.log('subscriptions getting', error)
      })
    }
  }
}
</script>

<style scoped>

</style>
