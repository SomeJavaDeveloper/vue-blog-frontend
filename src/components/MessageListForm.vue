<!-- TEMPLATE FOR DISPLAYING MESSAGES + CREATION FORM -->

<template>
<!--  form for adding new message -->
  <form @submit.prevent="handleForm" v-show="profile">
    <label>Body</label>
    <input type="text" v-model="body" name="body"/>

    <label>Tags</label>
    <input type="text" v-model="tempTag" @keyup="addTag" name="tags"/>
    <div v-for="tag in tags" :key="tag">
      {{ tag }}
    </div>

    <button>Submit message</button>
  </form>
<!-- display of all existing messages -->
  <div v-for="message in messages" :key="message.id">
    {{ message }} <i @click="deleteMessage(message)" class="fas fa-trash"></i>
  </div>

</template>

<script>

export default {
  name: 'MessageListForm',
  data() {
    return {
      messages: [],
      body: '',
      tempTag: '',
      tags: [],
      profile: null // todo authorization
    }
  },
  mounted() {
    // get request for all message in database
    fetch("/api/message")
        .then(response => response.json())
        .then(data => {
          this.messages = data
        })
    .catch(error => {
      console.log('messages getting', error)
    })

    // todo for user authorization (now it's probably getting user data from backend)
    fetch("/api/user")
        .then(response => response.json())
        .then(data => {
          this.profile = data
          this.$store.commit('updateProf', this.profile)
          console.log('Current profile username:', this.profile.username)
        })
        .catch(error => {
          console.log('user getting error', error)
        })
  },
  methods: {
    // tag processing of message (only for vue)
    addTag(e) {
      if (e.key === ' ' && this.tempTag) {
        this.tempTag = this.tempTag.substr(0, this.tempTag.length - 1)
        if (!this.tags.includes(this.tempTag)) {
          this.tags.push(this.tempTag)
        }
        this.tempTag = ''
      }
    },
    // processing of created message
    handleForm() {
      const message = {
        body: this.body,
        creationDate: null,
        tags: this.tags
      };
      // send json format of message to backend
      fetch("/api/message/add", {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(message),
      })
          .then(response => response.json())
          .then(data => {
            console.log('Successful adding message:', data)
            this.messages.push(data)
            this.body = ''
            this.tags = []
          })
          .catch(error => {
            console.log('Error happened', error)
          })
    },
    deleteMessage(message) {
      fetch("/api/message/" + message.id, {
        method: 'DELETE'
      })
          .then(response => response.text())
          .then(response => {
            console.log('Successful delete', response)
            this.messages.splice(this.messages.indexOf(message), 1)
          })
          .catch(error => {
            console.log('Error while deleting', error)
          })
    }
  }
}
</script>

<style>

</style>