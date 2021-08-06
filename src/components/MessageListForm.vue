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
          <div style="margin-left: 6px" v-if="profile && profile.id === message.user.id">
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
<!--          <a @click="subTag(tag)" href="#" v-for="tag in message.tags" :key="tag">-->
<!--            #{{ tag.content }}-->
<!--          </a>-->
          <a @click="openTag(tag)" href="#" v-for="tag in message.tags" :key="tag">
            #{{ tag.content }}
          </a>
<!--          <router-link :to="{ name: 'Profile', params: { tag: this.tag.content }}">#{{ tag.content }}</router-link>-->
        </a>
      <h1 v-if="profile" style="margin-left: 30px; margin-top: 15px;">
        <a @click="like(message.id)" style="font-size: 20px" class="far fa-heart" v-if="!message.userLikes.includes(profile.id)"></a>
        <a @click="unlike(message.id)" style="font-size: 20px" v-else class="fas fa-heart"></a>
        <a @click="repost(message.id)" style="font-size: 20px; margin-left: 15px" class="far fa-flag"></a>
      </h1>
      </div>
    <h1 style="text-align: center" @click="fetchMessages">Show more</h1>
  </div>
  <div class="new-post-popup" id="new-post-popup">
    <div class="new-post-popup_body">
      <div class="new-post-popup_content">
        <div class="new-post-popup-header">
          <div>
            <img style="width: 80px; height: 80px" src="https://storage.googleapis.com/vueblog-files-bucket/profile-logo.png" alt="">
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
          <img style="max-height: 300px; border-radius: 50px; padding: 20px 20px 20px 20px; width: 100%; cursor: pointer;" v-if="url" :src="url" alt="">
          <div class="new-post-popup-file-and-send">
            <div class="new-post-popup-file">
              <input type="file" @change="onFileChange" id="post-file" ref="uploadImage" multiple accept="image/*,video/*">
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

        <a href="#" class="new-post-popup_close" id="popup_close" @click="clearData">
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
      body: '',
      tempTag: '',
      tags: [],
      profile: null,
      formData: null,
      url: null,
      pageNumber: 0
    }
  },
  computed: {
    messages: {
      get() {
        return this.$store.state.messages
      },
      set(messages) {
        this.$store.commit('updateMessages', messages)
      }
    }
  },
  mounted() {
    this.pageNumber = 0
    this.messages = []
    this.fetchMessages()

    fetch("/api/user")
        .then(response => response.json())
        .then(data => {
          this.profile = data
          this.$store.commit('updateProf', this.profile)
          console.log('Current profile username:', this.profile?.username)
        })
        .catch(error => {
          console.log('user getting error', error)
        })
  },
  methods: {
    fetchMessages() {
      let byTag = this.$store.state.byTag
      let toFindText = this.$store.state.toFindText
      console.log(byTag)
      console.log(toFindText)
      // get request for all message in database
      fetch("/api/message?filter=" + toFindText + "&bytag=" + byTag + "&page=" + this.pageNumber)
          .then(response => response.json())
          .then(data => {
            if (data.length === 0)
              console.log("That's all messages!") // todo Alert of insufficient messages
            console.log(data)
            this.messages = this.messages.concat(data.filter(item =>
                !JSON.stringify(this.messages).includes(JSON.stringify(item))
            ))
            this.$store.state.messages = this.messages
          })
          .catch(error => {
            console.log('messages getting', error)
          })
      this.pageNumber++
    },
    subTag(tag) {
      fetch("/api/tags?tag=" + tag.content)
          .then(response => response.json())
          .then(data => {
            console.log(data)
          })
          .catch(error => {
            // something bad happened during the request
            console.log(error)
          })
    },
    openTag(tag) {
      this.$router.push({ name: 'Tag', params: { tag: tag.content } })
    },
    unlike(id) {
      let res = this.messages.find(obj => {
        return obj.id === id
      })
      res.userLikes.splice(res, 1)
      fetch("/api/message/unlike/" + id)
          .then(response => response.text())
          .catch(error => {
            console.log('like', error)
          })
    },
    like(id) {
      let res = this.messages.find(obj => {
        return obj.id === id
      })
      res.userLikes.push(this.profile.id)
      fetch("/api/message/like/" + id)
          .then(response => response.text())
          .catch(error => {
            console.log('unlike', error)
          })
    },
    repost(id) {
      console.log(id)
    },
    clearData() {
      this.body = ''
      this.tags = []
      this.url = ''
    },
    onFileChange(e) {
      const file = e.target.files[0];
      this.url = URL.createObjectURL(file);
    },
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
    handleForm() {
      const message = {
        body: this.body,
        creationDate: null,
        tags: this.tags,
        photoLink: this.$refs.uploadImage.files[0] ? this.$refs.uploadImage.files[0].name : ''
      };
      console.log(message)

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

      axios({
        method: 'post',
        url: '/api/message/add',
        data: data,
      })
          .then(response => {
            console.log('Successful adding message:', data)
            this.body = ''
            this.tags = []
            if (response.status === 200)
              location.href = '/'
          })
          .catch(error => {
            console.log('Error happened', error)
          })
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
