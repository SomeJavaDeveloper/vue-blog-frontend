<!-- TEMPLATE FOR DISPLAYING MESSAGES + CREATION FORM -->

<template>
  <div class="main-container__center-container">
    <form @submit.prevent="handleForm" ref="uploadForm" v-show="profile" class="main-container__new-post">
      <picture>
        <img src="https://storage.googleapis.com/vueblog-files-bucket/profile-logo.png" alt=""></picture>

      <label>Body</label>
      <input type="text" v-model="body" name="body"/>
      <br/>
      <label>Tags</label>
      <input type="text" v-model="tempTag" @keyup="addTag" name="tags"/>
      <div v-for="tag in tags" :key="tag">
        {{ tag }}
      </div>
      <br/>
      <label>File</label>
      <input type="file" ref="uploadImage" class="form-control"/>

      <button>Submit message</button>
    </form>

    <div v-for="message in messages" :key="message.id" :id="message.id" class="main-container__post">
        <div class="post_name">
          <div class="post_logo">
            <picture>
              <img src="https://storage.googleapis.com/vueblog-files-bucket/profile-logo.png" alt=""></picture>
          </div>
          <div class="post_profile_name">
            <h1>PROFILE NAME TODO</h1>
          </div>
          <div class="post_profile_nickname">
            <h2>PROFILE NICKNAME TODO</h2>
          </div>
          <div class="post_profile_nickname">
            <i @click="deleteMessage(message)" class="fas fa-trash"></i>
          </div>
        </div>
        <div class="post_text">
          <p>{{ message }}</p>
        </div>
      </div>
  </div>

</template>

<script>
import axios from 'axios';

export default {
  name: 'MessageListForm',
  data() {
    return {
      messages: [],
      body: '',
      tempTag: '',
      tags: [],
      profile: null, // todo authorization
      formData: null
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
      const json = JSON.stringify(message);
      const blobJson = new Blob([json], {
        type: 'application/json'
      });

      const file = this.$refs.uploadImage.files[0];
      const blobData = new Blob([file], {
        type: 'multipart/form-data'
      });

      const data = new FormData();
      data.append("text", blobJson);
      data.append("file", blobData);
      axios({
        method: 'post',
        url: 'http://localhost:3000/api/message/add',
        data: data,
      })
          .then(data => {
            console.log('Successful adding message:', data)
            this.messages.push(data.data)
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
