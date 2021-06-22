<template>
  <h2>Main page of application</h2>
  <div v-for="message in messages" :key="message.id">
    {{ message }} <i @click="deleteMessage(message)" class="fas fa-trash"></i>
  </div>

  <form @submit.prevent="handleForm">
    <label>Body</label>
    <input type="text" v-model="body" name="body"/>

    <label>Tags</label>
    <input type="text" v-model="tempTag" @keyup="addTag" name="tags"/>
    <div v-for="tag in tags" :key="tag">
      {{ tag }}
    </div>

    <button>Submit message</button>
  </form>
</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
      msg: '',
      messages: [],
      body: '',
      tempTag: '',
      tags: []
    }
  },
  mounted() {
    fetch("/api/message")
    .then(response => response.json())
    .then(data => {
      this.messages = data
    })
  },
  methods: {
    addTag(e) {
      if (e.key === ' ' && this.tempTag) {
        this.tempTag = this.tempTag.substr(0, this.tempTag.length - 1)
        if (!this.tags.includes(this.tempTag)) {
          this.tags.push(this.tempTag)
        }
        this.tempTag = ''
      }
    },
    deleteMessage(message) {
      fetch("/api/message/" + message.id, {
        method: 'DELETE'
      })
      .then(response => response.text())
      .then(response => {
        console.log(response)
        this.messages.splice(this.messages.indexOf(message), 1)
      })
      .catch(error => {
        console.log('Error while deleting', error)
      })
    },
    handleForm() {
      const message = {
        body: this.body,
        creationDate: null,
        tags: this.tags
      };
      fetch("/api/message", {
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
        console.log('Success:', data)
        this.messages.push(data)
        this.body = ''
        this.tags = []
      })
      .catch(error => {
        console.log('Error happened', error)
      })
    }
  }
}
</script>