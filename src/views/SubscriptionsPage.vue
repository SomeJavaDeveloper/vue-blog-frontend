<template>

  <input v-model="inputName" @change="updateList"/>
  <p>Subscriptions</p>
  <div v-if="subscriptions">
    <div v-for="subscription in subscriptions" :key="subscription.id">
      <p>{{ subscription.username }}</p>
      <br>
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
