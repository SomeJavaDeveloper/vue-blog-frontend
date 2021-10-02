<template>

  <input v-model="inputName" @change="updateList"/>
  <p>Subscribers</p>
  <div v-if="subscribers">
    <div v-for="subscriber in subscribers" :key="subscriber.id">
      <p>{{ subscriber.username }}</p>
      <br>
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
