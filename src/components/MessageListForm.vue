<!-- TEMPLATE FOR DISPLAYING MESSAGES + CREATION FORM -->

<template>
  <div class="main-container__center-container">
    <a class="main-container__new-post" href="#new-post-popup" v-show="profile">
      <picture><img src="https://storage.googleapis.com/vueblog-files-bucket/profile-logo.png" alt=""></picture>
      <a href="#new-post-popup">
        <button>
          <h1>new post</h1>
        </button>
      </a>
    </a>

    <div v-for="message in messages" :key="message.id" :id="message.id + 1" class="main-container__post">
        <div class="post_name">
          <div class="post_logo">
            <picture>
              <img src="https://storage.googleapis.com/vueblog-files-bucket/profile-logo.png" alt=""></picture>
          </div>
          <div class="post_profile_name">
            <h1>PROFILE NAME TODO</h1>
          </div>
          <div class="post_profile_nickname">
            <h2>{{ message.user.username }}</h2>
          </div>
          <div style="margin-left: 6px">
            {{ message.creationDate }}
          </div>
          <div style="margin-left: 6px">
            <i @click="deleteMessage(message)" class="fas fa-trash"></i>
          </div>
        </div>
        <div class="post_text">
          <p>{{ message.body }}</p>
        </div>
        <a :href="'#' + message.id">
          <picture><img :src="message.photoLink" alt=""></picture>
        </a>
        <div class="popup" :id="message.id">
          <div class="popup_body">
            <div class="popup_content">
              <a :href="'#' + message.id + 1" class="popup_close">
                <i class="fas fa-times"></i>
              </a>
              <div class="popup_img">
                <img :src="message.photoLink" alt="">
              </div>

            </div>
          </div>
        </div>
        <a class="post_tags">
          <a v-for="tag in message.tags" :key="tag">
            #{{ tag }}
          </a>
        </a>
      </div>
  </div>

  <div class="new-post-popup" id="new-post-popup">
    <div class="new-post-popup_body">
      <div class="new-post-popup_content">
        <div class="new-post-popup-header">
          <div class="new-post-popup-img">
            <img src="https://storage.googleapis.com/vueblog-files-bucket/profile-logo.png" alt="">
          </div>
          <div class="new-post-popup-name-and-nick">
            <h1>PROFILE NAME TODO</h1>
            <h2 v-if="profile">{{ profile.username }}</h2>
            <h2 v-else>No user (forbidden)</h2>
          </div>
        </div>
        <form @submit.prevent="handleForm" ref="uploadForm" v-show="profile">
          <div class="new-post-popup-text">
            <textarea type="text" v-model="body" name="body" placeholder="Type your post here" maxlength="400"/>
          </div>
          <div class="new-post-popup-tag">
            <input type="text" v-model="tempTag" @keyup="addTag" name="tags" placeholder="Type your tags here" maxlength="400"/>
            <a v-for="tag in tags" :key="tag" style="font-size: 16px">
              #{{ tag }}&nbsp;
            </a>
          </div>
          <div class="new-post-popup-file-and-send">
            <div class="new-post-popup-file">
              <input type="file" id="post-file" ref="uploadImage" multiple accept="image/*,video/*">
              <button type="button">
                <label for="post-file">
                  <h1>Add image</h1>
                </label>
              </button>
            </div>
            <div class="new-post-popup-send">
              <button type="submit">
                <h1>Send post</h1>
              </button>
            </div>
          </div>
        </form>

        <a href="#" class="new-post-popup_close" id="popup_close">
          <i class="fas fa-times"></i>
        </a>

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
        if (!this.tags.includes(this.tempTag) && this.tempTag.indexOf(' ') === -1) {
          this.tags.push(this.tempTag)
        }
        this.tempTag = ''
      }
    },
    // processing of created message
    async handleForm() {
      const message = {
        body: this.body,
        creationDate: null,
        tags: this.tags,
        photoLink: this.$refs.uploadImage.files[0] ? this.$refs.uploadImage.files[0].name : ''
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
      if (file)
        data.append("file", blobData);
      else
        data.append("file", new Blob([], {
          type: 'multipart/form-data'
        }));

      await axios({
        method: 'post',
        url: 'http://localhost:3000/api/message/add',
        data: data,
      })
          .then(data => {
            console.log('Successful adding message:', data)
            this.body = ''
            this.tags = []
          })
          .catch(error => {
            console.log('Error happened', error)
          })
      location.href = '/'
    },
    deleteMessage(message) {
      function getCookie(name) {
        if (!document.cookie) {
          return null;
        }

        const xsrfCookies = document.cookie.split(';')
            .map(c => c.trim())
            .filter(c => c.startsWith(name + '='));

        if (xsrfCookies.length === 0) {
          return null;
        }
        return decodeURIComponent(xsrfCookies[0].split('=')[1]);
      }
      const csrfToken = getCookie('XSRF-TOKEN')

      fetch("/api/message/" + message.id, {
        method: 'DELETE',
        headers: {
        'X-XSRF-TOKEN': csrfToken
        }
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
