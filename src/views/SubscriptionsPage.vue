<template>

  <input v-model="inputName" @change="updateList"/>
  <p>Subscriptions</p>
  <div v-if="subscriptions">
    <div v-for="subscription in subscriptions" :key="subscription.id">
      <p>{{ subscription.username }}</p>
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
  name: "SubscriptionsPage",
  data() {
    return {
      users: [],
      subscriptions: [],
      inputName: '',
      ifSearched: false
    }
  },
  mounted() {
    fetch("/api/subscriptions/" + this.$route.params.username)
    .then(response => response.json())
    .then(data => {
      this.subscriptions = data
    })
    .catch(error => {
      console.log('subscriptions getting', error)
    })
    fetch("/api/users-except-current")
    .then(response => response.json())
    .then(data => {
      this.users = data
    })
    .catch(error => {
      console.log('users getting', error)
    })
  },
  methods: {
    updateList() {
      fetch("/api/subscriptions/" + this.$route.params.username + "/" + this.inputName)
      .then(response => response.json())
      .then(data => {
        this.subscriptions = data
      })
      .catch(error => {
        console.log('subscriptions getting', error)
      })

      fetch("/api/users-except-current/" + this.inputName)
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
