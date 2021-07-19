<template>

  <div v-if="subscribtions">
    <div v-for="subscription in subscribtions" :key="subscription.id">
      <p>{{ subscription.username }}</p>
      <br>
    </div>
  </div>

  <hr>

  <div v-for="user in users" :key="user.id">
    <p>{{ user.username }}</p>
    <br>
  </div>
</template>

<script>

export default {
  name: "SubscriptionsPage",
  data() {
    return {
      users: [],
      subscribtions: []
    }
  },
  mounted() {
    fetch("/api/users")
    .then(response => response.json())
    .then(data => {
      this.users = data
    })
    .catch(error => {
      console.log('messages getting', error)
    })
    fetch("/api/subscriptions")
    .then(response => response.json())
    .then(data => {
      this.subscribtions = data
    })
    .catch(error => {
      console.log('messages getting', error)
    })
  }
}
</script>

<style scoped>

</style>
