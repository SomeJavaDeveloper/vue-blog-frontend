<template>

  <input v-model="inputName" @change="updateList"/>
  <p>Subscribers</p>
  <div v-if="subscribers">
    <div v-for="subscriber in subscribers" :key="subscriber.id">
      <p>{{ subscriber.username }}</p>
      <br>
    </div>
  </div>

  <div v-if="ifSearched">
    <hr>
    <p>Other users</p>
    <div v-for="user in users" :key="user.id">
      <p>{{ user.username }}</p>
      <br>
    </div>
  </div>
</template>

<script>

export default {
  name: "SubscribersPage",
  data() {
    return {
      users: [],
      subscribers: [],
      inputName: '',
      ifSearched: false
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
    // fetch("/api/users-other-subscribers")
    // .then(response => response.json())
    // .then(data => {
    //   this.users = data
    // })
    // .catch(error => {
    //   console.log('users getting', error)
    // })
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

      fetch("/api/users-other-subscribers?inputPattern=" + this.inputName)
      .then(response => response.json())
      .then(data => {
        this.users = data
      })
      .catch(error => {
        console.log('users getting', error)
      })
      this.ifSearched = this.inputName !== '';
    }
  }
}
</script>

<style scoped>

</style>
