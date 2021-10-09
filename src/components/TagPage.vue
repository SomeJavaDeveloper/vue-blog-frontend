<template>
  <div class="main-container__center-container">
    <div class="main-container__new-post" v-show="profile">
      <picture><img src="https://storage.googleapis.com/vueblog-files-bucket/profile-logo.png" alt=""></picture>
      <h1 id="tagInHat">#{{ $route.params.tagContent }}</h1>
      <a @click="subTag">
<!--        subTag(tag)-->
        <button v-if="!isUserSubbed">
          Subscribe
        </button>
        <button v-else>
          Unsubscribe
        </button>
      </a>

<!--      <h1 id="tagInHat">#{{ tag }}</h1>-->
<!--      <a @click="subTag">-->
<!--        <button v-if="!isUserSubbed">-->
<!--          Subscribe-->
<!--        </button>-->
<!--        <button v-else>-->
<!--          Unsubscribe-->
<!--        </button>-->
<!--      </a>-->
    </div>
    <div v-if="messages != null">
      <div v-for="message in messages" :key="message.id" :id="message.id + 1" class="main-container__post">
        <div class="post_name">
          <div class="post_logo">
            <picture>
              <img src="https://storage.googleapis.com/vueblog-files-bucket/profile-logo.png" alt=""></picture>
          </div>
          <div class="post_profile_name">
            <router-link
              :to="{ name: 'Profile', params: { username: message.user.username }}">
              <h1>{{ message.user.username }}</h1>
            </router-link>
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
          <router-link
            v-for="tag in message.tags" :key="tag"
            :to="{ name: 'Tag', params: { tagContent: tag.content }}"
            @click="initialize">
            #{{ tag.content }}
          </router-link>
          <!--          <router-link :to="{ name: 'Profile', params: { tag: this.tag.content }}">#{{ tag.content }}</router-link>-->
        </a>
        <h1 v-if="profile" style="margin-left: 30px; margin-top: 15px;" class="share">
          <a @click="like(message.id)" style="font-size: 20px" class="far fa-heart" v-if="!message.userLikes.includes(profile.id)"></a>
          <a @click="unlike(message.id)" style="font-size: 20px" v-else class="fas fa-heart"></a>
          <a @click="repost(message.id)" style="font-size: 20px; margin-left: 15px" class="far fa-flag"></a>
        </h1>
      </div>
    </div>
  </div>
</template>

<script>
// import axios from "axios";
//import router from "../router";
export default {
  name: "TagPage",
  data() {
    return {
      profile: null,
      tag: null,
      tagObject: null,
      messages: [],
      isUserSubbed: false
    }
  },
  mounted() {
    this.initialize()
  },
  methods: {
    initialize() {
      this.fetchTagsAndMessages(this.$route.params.tagContent)
      fetch("/api/user")
          .then(response => response.json())
          .then(data => {
            this.profile = data
            this.$store.commit('updateProf', this.profile)
            this.isUserSubbed = false
            this.profile.subTags.forEach(tag => {
              if (tag.content === this.$route.params.tagContent)
                this.isUserSubbed = true
            })
            console.log('Current profile username:', this.profile)
          })
          .catch(error => {
            console.log('user getting error', error)
          })
    },
    fetchTagsAndMessages() {
      fetch("/api/tags/" + this.$route.params.tagContent)
      .then(response => response.json())
      .then(data => {
        this.tag = data
        console.log('current tag', this.tag)
        console.log('tagC', this.tag)
      })
      .catch(error => {
        console.log('tag getting error', error)
      })
      this.messages = null
      fetch("/api/tags/messages/" + this.$route.params.tagContent) // вот тут проблемка
      .then(response => response.json())
      .then(data => {
        this.messages = data
        console.log('messages', this.messages)
      })
      .catch(error => {
        console.log('messages getting', error)
      })
    },
    subTag() {
      fetch("/api/tags?tag=" + this.$route.params.tagContent)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        this.profile = data
        this.isUserSubbed = false
        this.profile.subTags.forEach(tag => {
          if (tag.content === this.$route.params.tagContent)
            this.isUserSubbed = true
        })
      })
      .catch(error => {
// something bad happened during the request
        console.log(error)
      })
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
    openTag(tag) {
      this.tag = tag.content
      // fetch("/api/tags/tag-to-open/" + tag.content)
      // .then(response => response.text())
      // .catch(error => {
      //   console.log('add tag to open', error)
      // })
      //
      // fetch("/api/tags/tag-to-open")
      // .then(response => response.json())
      // .then(data => {
      //   this.tagObject = data
      //   this.tag = this.tagObject.content
      //   // console.log(data)
      //   console.log(this.tagObject)
      // })
      this.fillMessages()
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
<style scoped>
</style>

